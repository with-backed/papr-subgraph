import { Address, BigInt, dataSource, ethereum } from "@graphprotocol/graph-ts";
import {
  Activity,
  ActivityAddedCollateral,
  ActivityRemovedCollateral,
  Auction,
  ERC20Token,
  PaprController,
  Position,
} from "../generated/schema";
import {
  AddCollateral as AddCollateralEvent,
  EndAuction as EndAuctionEvent,
  IncreaseDebt as IncreaseDebtEvent,
  ReduceDebt as ReduceDebtEvent,
  RemoveCollateral as RemoveCollateralEvent,
  StartAuction as StartAuctionEvent,
} from "../generated/SlyFox/PaprController";
import {
  Burn as BurnEvent,
  Mint as MintEvent,
  Pool as PoolABI,
} from "../generated/templates/Pool/Pool";
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
    amountIn = amount1.abs();
    amountOut = amount0.abs();
    tokenIn = pool.token1();
    tokenOut = pool.token0();
  } else {
    amountIn = amount0.abs();
    amountOut = amount1.abs();
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

export function handleSwapActivity(event: SwapEvent): void {
  const context = dataSource.context();
  const controller = context.getString("controller");
  if (!controller) return;

  let activity = Activity.load(event.transaction.hash.toHex());

  if (!activity) {
    activity = initializeActivityEntity(event, controller);
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

export function handleAddCollateralActivity(
  event: AddCollateralEvent,
  controllerId: string
): void {
  const token = loadOrCreateERC721Token(event.params.collateralAddress);
  if (!token) return;

  let activity = Activity.load(event.transaction.hash.toHex());
  if (!activity) {
    activity = new Activity(event.transaction.hash.toHex());
    activity = initializeActivityEntity(event, controllerId);
  }
  activity.vault = generateVaultId(
    event.params._event.address,
    event.params.account,
    token
  );

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

export function handleRemoveCollateralActivity(
  event: RemoveCollateralEvent,
  controllerId: string
): void {
  const token = loadOrCreateERC721Token(event.params.collateralAddress);
  if (!token) return;

  let activity = Activity.load(event.transaction.hash.toHex());
  if (!activity) {
    activity = new Activity(event.transaction.hash.toHex());
    activity = initializeActivityEntity(event, controllerId);
  }
  activity.vault = generateVaultId(
    event.params._event.address,
    event.params.account,
    token
  );

  const activityRemovedCollateral = new ActivityRemovedCollateral(
    generateActivityCollateralId(
      activity,
      token.id,
      event.params.tokenId.toString()
    )
  );
  activityRemovedCollateral.activity = activity.id;
  activityRemovedCollateral.collateral = token.id;
  activityRemovedCollateral.tokenId = event.params.tokenId;
  activityRemovedCollateral.save();

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
    activity = initializeActivityEntity(event, controllerId);
  }
  activity.vault = generateVaultId(
    event.params._event.address,
    event.params.account,
    token
  );

  activity.amountBorrowed = event.params.amount;
  activity.save();
}

export function handleReduceDebtActivity(
  event: ReduceDebtEvent,
  controllerId: string
): void {
  const token = loadOrCreateERC721Token(event.params.collateralAddress);
  if (!token) return;

  let activity = Activity.load(event.transaction.hash.toHex());
  if (!activity) {
    activity = initializeActivityEntity(event, controllerId);
  }
  activity.vault = generateVaultId(
    event.params._event.address,
    event.params.account,
    token
  );

  activity.amountRepaid = event.params.amount;
  activity.save();
}

export function handleAuctionStartActivity(
  event: StartAuctionEvent,
  controllerId: string
): void {
  const token = loadOrCreateERC721Token(event.params.auctionAssetContract);
  if (!token) return;

  let activity = Activity.load(event.transaction.hash.toHex());
  if (!activity) {
    activity = initializeActivityEntity(event, controllerId);
  }
  activity.vault = generateVaultId(
    event.params._event.address,
    event.params.nftOwner,
    token
  );
  activity.auctionCollateral = token.id;
  activity.auctionTokenId = event.params.auctionAssetID;

  activity.save();
}

export function handleAuctionEndActivity(
  event: EndAuctionEvent,
  controllerId: string
): void {
  const auction = Auction.load(event.params.auctionID.toString());
  if (!auction) return;

  const auctionStartActivity = Activity.load(auction.start);
  if (!auctionStartActivity) return;

  let activity = Activity.load(event.transaction.hash.toHex());
  if (!activity) {
    activity = initializeActivityEntity(event, controllerId);
  }
  activity.vault = auction.vault;
  activity.auctionCollateral = auctionStartActivity.auctionCollateral;
  activity.auctionTokenId = auctionStartActivity.auctionTokenId;
  activity.auctionEndPrice = event.params.price;

  activity.save();
}

export function handleLPIncreaseActivity(
  event: MintEvent,
  sqrtPricePool: BigInt,
  tickCurrent: i32,
  controllerId: string
): void {
  const positionId = `${event.transaction.from}-${event.params.tickLower}-${event.params.tickUpper}`;
  let position = Position.load(positionId);
  if (!position) {
    position = new Position(positionId);
    position.user = event.transaction.from;
    position.tickLower = event.params.tickLower;
    position.tickUpper = event.params.tickUpper;
    position.liquidity = BigInt.fromI32(0);
    position.amount0 = BigInt.fromI32(0);
    position.amount1 = BigInt.fromI32(0);
    position.save();
  }

  let activity = Activity.load(event.transaction.hash.toHex());
  if (!activity) {
    activity = initializeActivityEntity(event, controllerId);
  }
  activity.user = event.transaction.from;
  activity.liquidityAdded = event.params.amount;
  activity.liquidityAdded0 = event.params.amount0;
  activity.liquidityAdded1 = event.params.amount1;
  activity.positionTickLower = event.params.tickLower;
  activity.positionTickUpper = event.params.tickUpper;
  activity.sqrtPricePool = sqrtPricePool;
  activity.tickCurrent = tickCurrent;

  activity.totalLiquidityAdded = position.liquidity.plus(event.params.amount);
  activity.totalLiquidity0 = position.amount0.plus(event.params.amount0);
  activity.totalLiquidity1 = position.amount1.plus(event.params.amount1);

  activity.save();
}

export function handleLPDecreaseActivity(
  event: BurnEvent,
  sqrtPricePool: BigInt,
  tickCurrent: i32,
  controllerId: string
): void {
  const position = Position.load(
    `${event.transaction.from}-${event.params.tickLower}-${event.params.tickUpper}`
  );
  if (!position) return;
  position.liquidity = position.liquidity.minus(event.params.amount);
  position.amount0 = position.amount0.minus(event.params.amount0);
  position.amount1 = position.amount1.minus(event.params.amount1);
  position.save();

  let activity = Activity.load(event.transaction.hash.toHex());
  if (!activity) {
    activity = initializeActivityEntity(event, controllerId);
  }
  activity.user = event.transaction.from;
  activity.liquidityAdded = event.params.amount.times(BigInt.fromI32(-1));
  activity.liquidityAdded0 = event.params.amount0;
  activity.liquidityAdded1 = event.params.amount1;
  activity.positionTickLower = event.params.tickLower;
  activity.positionTickUpper = event.params.tickUpper;
  activity.sqrtPricePool = sqrtPricePool;
  activity.tickCurrent = tickCurrent;

  activity.totalLiquidityAdded = position.liquidity.minus(event.params.amount);
  activity.totalLiquidity0 = position.amount0.minus(event.params.amount0);
  activity.totalLiquidity1 = position.amount1.minus(event.params.amount1);

  activity.save();
}

function initializeActivityEntity(
  event: ethereum.Event,
  controllerId: string
): Activity {
  let activity = new Activity(event.transaction.hash.toHex());

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

export function addClientFeeToActivity(
  activityId: string,
  feeBips: BigInt
): void {
  const activity = Activity.load(activityId);
  if (!activity) return;

  activity.clientFeeBips = feeBips;
  activity.save();
}
