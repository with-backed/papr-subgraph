import { Address, BigInt, dataSource } from "@graphprotocol/graph-ts";
import { Activity, PaprController } from "../generated/schema";
import { Pool as PoolABI } from "../generated/templates/Pool/Pool";
import { Swap as SwapEvent } from "../generated/templates/Pool/Pool";
import { loadOrCreateERC20Token } from "./utils";

function getSqrtPricePool(pool: PoolABI): BigInt {
  const context = dataSource.context();
  const controllerId = context.getString("controller");
  const controller = PaprController.load(controllerId);
  if (!controller) return BigInt.fromI32(0);

  const slot0 = pool.try_slot0();
  if (slot0.reverted) return BigInt.fromI32(0);

  return slot0.value.value0;
}

class TokenAmounts {
  amountIn: BigInt | null;
  amountOut: BigInt | null;
  tokenIn: Address;
  tokenOut: Address;
}

function getTokenAmountsForSwap(
  amount0: BigInt,
  amount1: BigInt,
  pool: PoolABI
): TokenAmounts {
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

export function createSwapActivityEntity(event: SwapEvent): void {
  let activity = Activity.load(event.transaction.hash.toHex());

  // add collateral event already exists, and user is doing a mint + swap
  // this entity will be updated with the swap details and re-typed to a ADD_COLLATERAL_INCREASE_DEBT_SWAP
  if (!!activity) {
    activity.type = "ADD_COLLATERAL_INCREASE_DEBT_SWAP";
  } else {
    activity = new Activity(event.transaction.hash.toHex());
    activity.type = "SWAP";
  }

  const pool = PoolABI.bind(event.params._event.address);

  activity.user = event.transaction.from;
  activity.sqrtPricePool = getSqrtPricePool(pool);

  const tokenAmounts = getTokenAmountsForSwap(
    event.params.amount0,
    event.params.amount1,
    pool
  );
  activity.amountIn = tokenAmounts.amountIn;
  activity.amountOut = tokenAmounts.amountOut;

  const tokenInER20 = loadOrCreateERC20Token(tokenAmounts.tokenIn);
  const tokenOutERC20 = loadOrCreateERC20Token(tokenAmounts.tokenOut);
  if (tokenInER20) activity.tokenIn = tokenInER20.id;
  if (tokenOutERC20) activity.tokenOut = tokenOutERC20.id;

  activity.save();
}
