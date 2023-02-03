import { Address, dataSource } from "@graphprotocol/graph-ts";

import {
    TargetUpdate
  } from "../generated/schema";

import {
    Swap as SwapEvent
  } from '../generated/templates/Pool/Pool'

import { PaprController as PaprControllerABI } from "../generated/SlyFox/PaprController";

// Thought I'd separate this as it is kind of distinct from the
// handlers for the papr controller events
export function handleSwap(event: SwapEvent): void {
    let context = dataSource.context()
    let controller = context.getString('controller')
    if (!controller) return;
  
    const newTargetResult = PaprControllerABI.bind(
       Address.fromString(controller)
    ).try_newTarget();
    if (newTargetResult.reverted) return;

    // check if target update event emitted in this tx already
    // true if this was an increaseAndSwap call
    let targetUpdate = TargetUpdate.load(event.transaction.hash.toHexString());

    if (targetUpdate != null) return;
  
    // not sure how I feel about faking this, but I do not think 
    // we link to these events anywhere
    targetUpdate = new TargetUpdate(event.transaction.hash.toHexString());
  
    targetUpdate.controller = controller;
    targetUpdate.newTarget = newTargetResult.value;
    targetUpdate.timestamp = event.block.timestamp.toI32();
  
    targetUpdate.save();  
}