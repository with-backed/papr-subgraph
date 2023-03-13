import { BigInt } from "@graphprotocol/graph-ts";
import { PaprController, TargetHourData } from "../generated/schema";

export function updateTargetHourData(
  blockTimestamp: BigInt,
  controllerAddress: string,
  newTarget: BigInt
): TargetHourData {
  let timestamp = blockTimestamp.toI32();
  let hourIndex = timestamp / 3600; // get unique hour within unix history
  let hourStartUnix = hourIndex * 3600; // want the rounded effect
  let hourControllerID = controllerAddress
    .concat("-")
    .concat(hourIndex.toString());
  let targetHourData = TargetHourData.load(hourControllerID);
  if (targetHourData === null) {
    targetHourData = new TargetHourData(hourControllerID);
    targetHourData.periodStartUnix = hourStartUnix;
    targetHourData.controller = controllerAddress;
    targetHourData.numTargetUpdates = 1;
    targetHourData.target = newTarget;
  } else {
    targetHourData.numTargetUpdates = targetHourData.numTargetUpdates + 1;
    targetHourData.target = targetHourData.target
      .plus(newTarget)
      .div(BigInt.fromI32(targetHourData.numTargetUpdates));
  }
  targetHourData.save();

  return targetHourData;
}

export function updateControllerTarget(
  controllerAddress: string,
  target: BigInt
): void {
  let controller = PaprController.load(controllerAddress);
  if (!controller) return;
  controller.target = target;
  controller.save();
}
