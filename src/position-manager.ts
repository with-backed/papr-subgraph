import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";
import {
  Collect,
  DecreaseLiquidity,
  IncreaseLiquidity,
  NonfungiblePositionManager,
  Transfer,
} from "../generated/NonfungiblePositionManager/NonfungiblePositionManager";
import { ERC20Token, PaprController, Position } from "../generated/schema";
import { handleSyntheticSwapFromLP } from "./activity";
import { loadOrCreateERC20Token } from "./utils";

const paprControllerAddress = "0x3b29c19ff2fcea0ff98d0ef5b184354d74ea74b0";

function isPaprPool(
  tokenAddress0: Address,
  tokenAddress1: Address,
  controller: PaprController
): boolean {
  return (
    (tokenAddress0.equals(Address.fromString(controller.paprToken)) &&
      tokenAddress1.equals(Address.fromString(controller.underlying))) ||
    (tokenAddress1.equals(Address.fromString(controller.paprToken)) &&
      tokenAddress0.equals(Address.fromString(controller.underlying)))
  );
}

function createOrUpdatePosition(
  event: ethereum.Event,
  tokenId: BigInt,
  controller: PaprController
): Position | null {
  let position = Position.load(tokenId.toString());

  const contract = NonfungiblePositionManager.bind(event.address);
  const positionCall = contract.try_positions(tokenId);
  if (positionCall.reverted) return null;

  const amountToken0 = positionCall.value.value10;
  const amountToken1 = positionCall.value.value11;

  if (position === null) {
    const positionResult = positionCall.value;
    if (!isPaprPool(positionResult.value2, positionResult.value3, controller)) {
      return null;
    }

    position = new Position(tokenId.toString());

    // The owner gets correctly updated in the Transfer handler
    position.owner = Address.fromString(
      "0x0000000000000000000000000000000000000000"
    );
    position.token0 = loadOrCreateERC20Token(positionResult.value2)!.id;
    position.token1 = loadOrCreateERC20Token(positionResult.value3)!.id;

    position.amountToken0 = amountToken0;
    position.amountToken1 = amountToken1;
    position.collectedFeesToken0 = BigInt.fromI32(0);
    position.collectedFeesToken1 = BigInt.fromI32(0);
  }

  const token0Delta = amountToken0.minus(position.amountToken0);
  const token1Delta = amountToken1.minus(position.amountToken1);

  position.amountToken0 = amountToken0;
  position.amountToken1 = amountToken1;

  position.save();

  createSyntheticSwapFromDeltas(
    event,
    position,
    controller,
    token0Delta,
    token1Delta
  );

  return position;
}

export function handleIncreaseLiquidity(event: IncreaseLiquidity): void {
  const controller = PaprController.load(paprControllerAddress.toLowerCase());
  if (!controller) return;

  createOrUpdatePosition(event, event.params.tokenId, controller);
}

export function handleDecreaseLiquidity(event: DecreaseLiquidity): void {
  const controller = PaprController.load(paprControllerAddress.toLowerCase());
  if (!controller) return;

  createOrUpdatePosition(event, event.params.tokenId, controller);
}

export function handleTransfer(event: Transfer): void {
  const controller = PaprController.load(paprControllerAddress.toLowerCase());
  if (!controller) return;

  const position = createOrUpdatePosition(
    event,
    event.params.tokenId,
    controller
  );

  // position was not able to be fetched
  if (position == null) {
    return;
  }

  position.owner = event.params.to;
  position.save();
}

function createSyntheticSwapFromDeltas(
  event: ethereum.Event,
  position: Position,
  controller: PaprController,
  token0Delta: BigInt,
  token1Delta: BigInt
): void {
  let amountOut: BigInt = BigInt.fromI32(0);
  let amountIn: BigInt = BigInt.fromI32(0);
  let tokenOut: string;
  let tokenIn: string;
  if (token0Delta.lt(BigInt.fromI32(0))) {
    amountIn = token0Delta.abs();
    amountOut = token1Delta.abs();
    tokenIn = position.token0;
    tokenOut = position.token1;
  } else {
    amountIn = token1Delta.abs();
    amountOut = token0Delta.abs();
    tokenIn = position.token1;
    tokenOut = position.token0;
  }

  handleSyntheticSwapFromLP(
    event,
    amountIn,
    amountOut,
    loadOrCreateERC20Token(Address.fromString(tokenIn)),
    loadOrCreateERC20Token(Address.fromString(tokenOut)),
    controller
  );
}
