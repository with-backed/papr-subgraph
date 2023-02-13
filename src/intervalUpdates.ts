import { BigInt } from "@graphprotocol/graph-ts";
import { PaprController, TargetHourData } from "../generated/schema";
import { UpdateTarget } from "../generated/SlyFox/PaprController";

export function updateTargetHourData(event: UpdateTarget): TargetHourData {
  let timestamp = event.block.timestamp.toI32();
  let hourIndex = timestamp / 3600; // get unique hour within unix history
  let hourStartUnix = hourIndex * 3600; // want the rounded effect
  let hourControllerID = event.params._event.address
    .toHexString()
    .concat("-")
    .concat(hourIndex.toString());
  let controller = PaprController.load(
    event.params._event.address.toHexString()
  )!;
  let targetHourData = TargetHourData.load(hourControllerID);
  if (targetHourData === null) {
    targetHourData = new TargetHourData(hourControllerID);
    targetHourData.periodStartUnix = hourStartUnix;
    targetHourData.controller = controller.id;
    targetHourData.numTargetUpdates = 1;
    targetHourData.target = event.params.newTarget;
  } else {
    targetHourData.numTargetUpdates = targetHourData.numTargetUpdates + 1;
    targetHourData.target = targetHourData.target
      .plus(event.params.newTarget)
      .div(BigInt.fromI32(targetHourData.numTargetUpdates));
  }
  targetHourData.save();

  return targetHourData;
}
