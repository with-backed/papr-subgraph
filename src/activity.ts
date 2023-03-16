import { Address, BigInt, dataSource, ethereum } from "@graphprotocol/graph-ts";
import {
  Activity,
  ActivityAddedCollateral,
  PaprController,
} from "../generated/schema";
import {
  AddCollateral as AddCollateralEvent,
  IncreaseDebt as IncreaseDebtEvent,
} from "../generated/SlyFox/PaprController";
import { Pool as PoolABI } from "../generated/templates/Pool/Pool";
import { Swap as SwapEvent } from "../generated/templates/Pool/Pool";
import {
  generateVaultId,
  loadOrCreateERC20Token,
  loadOrCreateERC721Token,
} from "./utils";

class TokenAmounts {
  amountIn: BigInt | null;
  amountOut: BigInt | null;
  tokenIn: Address;
  tokenOut: Address;
}

function getTokenAmountsForSwap(
  amount0: BigInt,
  amount1: BigInt,
  poolAddress: Address
): TokenAmounts {
  const pool = PoolABI.bind(poolAddress);

  let amountIn: BigInt | null = null;
  let amountOut: BigInt | null = null;
  let tokenIn: Address;
  let tokenOut: Address;

  if (amount0.lt(BigInt.fromI32(0))) {
    amountIn = amount1;
    amountOut = amount0;
    tokenIn = pool.token1();
    tokenOut = pool.token0();
  } else {
    amountIn = amount0;
    amountOut = amount1;
    tokenIn = pool.token0();
    tokenOut = pool.token1();
  }
  return {
    amountIn,
    amountOut,
    tokenIn,
    tokenOut,
  };
}

export function handleSwapActivityEntity(event: SwapEvent): void {
  const context = dataSource.context();
  const controller = context.getString("controller");
  if (!controller) return;

  let activity = Activity.load(event.transaction.hash.toHex());

  if (!activity) {
    activity = initializeActivityEntity("SWAP", event, controller);
  } else {
    // add collateral event already exists, and user is doing a mint + swap
    // this entity will be updated with the swap details and re-typed to a ADD_COLLATERAL_INCREASE_DEBT_SWAP
    activity.type = "ADD_COLLATERAL_INCREASE_DEBT_SWAP";
  }

  activity.sqrtPricePool = event.params.sqrtPriceX96;

  const tokenAmounts = getTokenAmountsForSwap(
    event.params.amount0,
    event.params.amount1,
    event.params._event.address
  );
  activity.amountIn = tokenAmounts.amountIn;
  activity.amountOut = tokenAmounts.amountOut;

  const tokenInER20 = loadOrCreateERC20Token(tokenAmounts.tokenIn);
  const tokenOutERC20 = loadOrCreateERC20Token(tokenAmounts.tokenOut);
  if (tokenInER20) activity.tokenIn = tokenInER20.id;
  if (tokenOutERC20) activity.tokenOut = tokenOutERC20.id;

  activity.save();
}

export function handleAddCollateralActivityEntity(
  event: AddCollateralEvent,
  controllerId: string
): void {
  const token = loadOrCreateERC721Token(event.params.collateralAddress);
  if (!token) return;

  let activity = Activity.load(event.transaction.hash.toHex());
  if (!activity) {
    activity = new Activity(event.transaction.hash.toHex());
    activity = initializeActivityEntity("ADD_COLLATERAL", event, controllerId);
    activity.vault = generateVaultId(
      event.params._event.address,
      event.params.account,
      token
    );
  }

  const activityAddedCollateral = new ActivityAddedCollateral(
    generateActivityCollateralId(
      activity,
      token.id,
      event.params.tokenId.toString()
    )
  );
  activityAddedCollateral.activity = activity.id;
  activityAddedCollateral.collateral = token.id;
  activityAddedCollateral.tokenId = event.params.tokenId;
  activityAddedCollateral.save();

  activity.save();
}

export function handleIncreaseDebtActivity(
  event: IncreaseDebtEvent,
  controllerId: string
): void {
  const token = loadOrCreateERC721Token(event.params.collateralAddress);
  if (!token) return;

  let activity = Activity.load(event.transaction.hash.toHex());
  if (!activity) {
    activity = initializeActivityEntity("INCREASE_DEBT", event, controllerId);
    activity.vault = generateVaultId(
      event.params._event.address,
      event.params.account,
      token
    );
  } else {
    if (activity.type == "ADD_COLLATERAL") {
      // swap always comes after add collateral, so if previous type is add collateral, then this is a mint only
      activity.type = "ADD_COLLATERAL_INCREASE_DEBT";
    } else if (activity.type == "SWAP") {
      // swap always comes after add collateral, so if previous type is swap, then this is a mint + swap
      activity.type = "ADD_COLLATERAL_INCREASE_DEBT_SWAP";
    }
  }

  activity.amountBorrowedOrRepaid = event.params.amount;
  activity.save();
}

function initializeActivityEntity(
  type: string,
  event: ethereum.Event,
  controllerId: string
): Activity {
  let activity = new Activity(event.transaction.hash.toHex());
  activity.type = type;
  activity.timestamp = event.block.timestamp.toI32();
  activity.controller = controllerId;
  activity.user = event.transaction.from;
  activity.save();
  return activity;
}

function generateActivityCollateralId(
  activity: Activity,
  collateralAddress: string,
  tokenId: string
): string {
  return `${activity.id}-${collateralAddress}-${tokenId}`;
}
