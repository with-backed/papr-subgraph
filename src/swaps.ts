import { Address, dataSource } from "@graphprotocol/graph-ts";

import {
    TargetUpdate
  } from "../generated/schema";

import {
    Swap as SwapEvent
  } from '../generated/templates/Pool/Pool'

import { PaprController as PaprControllerABI } from "../generated/SlyFox/PaprController";
import { updateControllerTarget, updateTargetHourData } from "./intervalUpdates";
import { handleSwapActivityEntity } from "./activity";

// Thought I'd separate this as it is kind of distinct from the
// handlers for the papr controller events
export function handleSwap(event: SwapEvent): void {
    let context = dataSource.context()
    let controller = context.getString('controller')
    if (!controller) return;
    
    handleSwapActivityEntity(event);
  
    const newTargetResult = PaprControllerABI.bind(
       Address.fromString(controller)
    ).try_newTarget();
    if (newTargetResult.reverted) return;

    // note that we could possibly miss target updates from the contract because 
    // a swap has occurred in the same block and we store that one instead
    let targetUpdate = TargetUpdate.load(event.block.timestamp.toString());

    if (targetUpdate != null) return;
  
    targetUpdate = new TargetUpdate(event.block.timestamp.toString());

    targetUpdate.txHash = event.transaction.hash;
    targetUpdate.controller = controller;
    targetUpdate.newTarget = newTargetResult.value;
    targetUpdate.timestamp = event.block.timestamp.toI32();
  
    targetUpdate.save();
    updateTargetHourData(event.block.timestamp, controller, newTargetResult.value);
    updateControllerTarget(controller, newTargetResult.value, event.block.timestamp);
}