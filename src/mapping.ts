import { Address, DataSourceContext, BigInt } from "@graphprotocol/graph-ts";
import { BigInt as AsBigInt } from "as-bigint";

import {
  IncreaseDebt,
  ReduceDebt,
  UpdateTarget,
  AddCollateral,
  RemoveCollateral,
  AllowCollateral,
  StartAuction,
  EndAuction,
  SetFundingPeriod,
  IncreaseDebtAndSellCall,
  BuyAndReduceDebtCall,
} from "../generated/SlyFox/PaprController";

import {
  AddCollateralEvent,
  VaultCollateral,
  CollateralAllowedChangeEvent,
  DebtDecreasedEvent,
  DebtIncreasedEvent,
  PaprController,
  TargetUpdate,
  RemoveCollateralEvent,
  Vault,
  AllowedCollateral,
  Auction,
  AuctionStartEvent,
  AuctionEndEvent,
  ERC20Token,
  ERC721Token,
} from "../generated/schema";

import { Pool as PoolTemplate } from "../generated/templates";

import { PaprController as PaprControllerABI } from "../generated/SlyFox/PaprController";
import { ERC721 as ERC721ABI } from "../generated/SlyFox/ERC721";
import { ERC20 as ERC20ABI } from "../generated/SlyFox/ERC20";
import {
  updateControllerTarget,
  updateTargetHourData,
} from "./intervalUpdates";
import {
  generateVaultId,
  loadOrCreateERC20Token,
  loadOrCreateERC721Token,
} from "./utils";
import {
  addClientFeeToActivity,
  handleAddCollateralActivity,
  handleAuctionEndActivity,
  handleAuctionStartActivity,
  handleIncreaseDebtActivity,
  handleReduceDebtActivity,
  handleRemoveCollateralActivity,
} from "./activity";

function generateCollateralId(addr: Address, tokenId: BigInt): string {
  return `${addr.toHexString()}-${tokenId.toString()}`;
}

function initVault(
  controller: Address,
  account: Address,
  token: ERC721Token
): Vault {
  const vault = new Vault(generateVaultId(controller, account, token));
  vault.controller = controller.toHexString();
  vault.account = account;
  vault.token = token.id;
  vault.save();

  return vault;
}

export function handleAddCollateral(event: AddCollateral): void {
  const token = loadOrCreateERC721Token(event.params.collateralAddress);
  if (!token) {
    return;
  }

  let vault: Vault | null = Vault.load(
    generateVaultId(event.params._event.address, event.params.account, token)
  );
  if (!vault) {
    vault = initVault(event.params._event.address, event.params.account, token);
  }

  const collateralAdded = new VaultCollateral(
    generateCollateralId(event.params.collateralAddress, event.params.tokenId)
  );

  collateralAdded.tokenId = event.params.tokenId;
  collateralAdded.vault = vault.id;
  vault.collateralCount++;

  collateralAdded.save();
  if (vault.collateralCount === 0) {
    vault.debtPerCollateral = new BigInt(0);
  } else {
    vault.debtPerCollateral = vault.debt.div(
      BigInt.fromI32(vault.collateralCount)
    );
  }

  vault.save();

  const addCollateralEvent = new AddCollateralEvent(
    event.transaction.hash.toHexString()
  );
  addCollateralEvent.collateral = collateralAdded.id;
  addCollateralEvent.timestamp = event.block.timestamp.toI32();
  addCollateralEvent.controller = event.params._event.address.toHexString();
  addCollateralEvent.vault = vault.id;
  addCollateralEvent.account = vault.account;
  addCollateralEvent.save();
  handleAddCollateralActivity(event, event.params._event.address.toHexString());
}

export function handleRemoveCollateral(event: RemoveCollateral): void {
  const token = loadOrCreateERC721Token(event.params.collateralAddress);
  if (!token) {
    return;
  }

  const vault = Vault.load(
    generateVaultId(event.params._event.address, event.params.account, token)
  );
  if (!vault) return;

  const collateralRemoved = VaultCollateral.load(
    generateCollateralId(event.params.collateralAddress, event.params.tokenId)
  );
  if (!collateralRemoved) return;

  vault.collateralCount--;
  if (vault.collateralCount === 0) {
    vault.debtPerCollateral = new BigInt(0);
  } else {
    vault.debtPerCollateral = vault.debt.div(
      BigInt.fromI32(vault.collateralCount)
    );
  }
  vault.save();

  collateralRemoved.vault = "";
  collateralRemoved.save();

  const collateralRemovedEvent = new RemoveCollateralEvent(
    event.transaction.hash.toHexString()
  );
  collateralRemovedEvent.collateral = collateralRemoved.id;
  collateralRemovedEvent.timestamp = event.block.timestamp.toI32();
  collateralRemovedEvent.controller = vault.controller;
  collateralRemovedEvent.vault = vault.id;
  collateralRemovedEvent.account = vault.account;
  collateralRemovedEvent.save();
  handleRemoveCollateralActivity(event, vault.controller);
}

export function handleIncreaseDebt(event: IncreaseDebt): void {
  const token = loadOrCreateERC721Token(event.params.collateralAddress);
  if (!token) {
    return;
  }

  let vault = Vault.load(
    generateVaultId(event.params._event.address, event.params.account, token)
  );

  // vault should exist because this cannot be called unless collateral is added
  if (!vault) {
    return;
  }

  vault.debt = vault.debt.plus(event.params.amount);
  vault.debtPerCollateral = vault.debt.div(
    BigInt.fromI32(vault.collateralCount)
  );
  vault.latestIncreaseDebt = event.block.timestamp.toI32();
  vault.save();

  const debtIncreasedEvent = new DebtIncreasedEvent(
    event.transaction.hash.toHexString()
  );
  debtIncreasedEvent.timestamp = event.block.timestamp.toI32();
  debtIncreasedEvent.amount = event.params.amount;
  debtIncreasedEvent.controller = vault.controller;
  debtIncreasedEvent.vault = vault.id;
  debtIncreasedEvent.account = vault.account;
  debtIncreasedEvent.save();
  handleIncreaseDebtActivity(event, event.params._event.address.toHexString());
}

export function handleReduceDebt(event: ReduceDebt): void {
  const token = loadOrCreateERC721Token(event.params.collateralAddress);
  if (!token) {
    return;
  }

  const vault = Vault.load(
    generateVaultId(event.params._event.address, event.params.account, token)
  );
  if (!vault) {
    return;
  }

  vault.debt = vault.debt.minus(event.params.amount);
  if (vault.collateralCount === 0) {
    vault.debtPerCollateral = new BigInt(0);
  } else {
    vault.debtPerCollateral = vault.debt.div(
      BigInt.fromI32(vault.collateralCount)
    );
  }

  vault.save();

  const debtDecreasedEvent = new DebtDecreasedEvent(
    event.transaction.hash.toHexString()
  );
  debtDecreasedEvent.timestamp = event.block.timestamp.toI32();
  debtDecreasedEvent.amount = event.params.amount;
  debtDecreasedEvent.controller = vault.controller;
  debtDecreasedEvent.vault = vault.id;
  debtDecreasedEvent.account = vault.account;
  debtDecreasedEvent.save();
  handleReduceDebtActivity(event, event.params._event.address.toHexString());
}

export function handleTargetUpdate(event: UpdateTarget): void {
  // check if target update event emitted in this tx already
  // true if this was an increaseAndSwap call
  let targetUpdate = TargetUpdate.load(event.block.timestamp.toString());

  if (targetUpdate != null) return;

  let controller = PaprController.load(
    event.params._event.address.toHexString()
  );

  if (!controller) {
    controller = new PaprController(event.params._event.address.toHexString());
    controller.createdAt = event.block.timestamp.toI32();

    const poolResult = PaprControllerABI.bind(
      event.params._event.address
    ).try_pool();
    if (poolResult.reverted) return;

    controller.poolAddress = poolResult.value;

    let context = new DataSourceContext();
    context.setString("controller", controller.id);
    context.setString("poolAddress", controller.poolAddress.toHexString());
    PoolTemplate.createWithContext(poolResult.value, context);

    const maxLTVResult = PaprControllerABI.bind(
      event.params._event.address
    ).try_maxLTV();
    if (maxLTVResult.reverted) return;
    controller.maxLTV = maxLTVResult.value;
    const fundingPeriodResult = PaprControllerABI.bind(
      event.params._event.address
    ).try_fundingPeriod();
    if (fundingPeriodResult.reverted) return;
    controller.fundingPeriod = fundingPeriodResult.value;

    const underlyingResult = PaprControllerABI.bind(
      event.params._event.address
    ).try_underlying();
    if (underlyingResult.reverted) return;
    const underlyingToken = loadOrCreateERC20Token(underlyingResult.value);
    if (!underlyingToken) return;

    controller.underlying = underlyingToken.id;

    const paprTokenResult = PaprControllerABI.bind(
      event.params._event.address
    ).try_papr();
    if (paprTokenResult.reverted) return;

    const paprToken = loadOrCreateERC20Token(paprTokenResult.value);
    if (!paprToken) return;

    controller.paprToken = paprToken.id;

    underlyingResult.value.toHex();

    controller.token0IsUnderlying = AsBigInt.fromString(
      underlyingResult.value.toHexString()
    ).lt(AsBigInt.fromString(paprTokenResult.value.toHexString()));
  }

  targetUpdate = new TargetUpdate(event.block.timestamp.toString());

  targetUpdate.txHash = event.transaction.hash;
  targetUpdate.controller = controller.id;
  targetUpdate.newTarget = event.params.newTarget;
  targetUpdate.timestamp = event.block.timestamp.toI32();

  updateControllerTarget(
    event.params._event.address.toHexString(),
    event.params.newTarget,
    event.block.timestamp
  );

  controller.save();
  targetUpdate.save();

  updateTargetHourData(
    event.block.timestamp,
    controller.id,
    event.params.newTarget
  );
}

export function handleFundingPeriodUpdated(event: SetFundingPeriod): void {
  const controller = PaprController.load(
    event.params._event.address.toHexString()
  );
  if (!controller) return;

  controller.fundingPeriod = event.params.fundingPeriod;
  controller.save();
}

export function handleCollateralAllowedChanged(event: AllowCollateral): void {
  const controller = PaprController.load(
    event.params._event.address.toHexString()
  );
  if (!controller) return;
  let allowedCollateral = AllowedCollateral.load(
    `${controller.id}-${event.params.collateral.toHexString()}`
  );
  if (!allowedCollateral) {
    allowedCollateral = new AllowedCollateral(
      `${controller.id}-${event.params.collateral.toHexString()}`
    );
  }
  const token = loadOrCreateERC721Token(event.params.collateral);
  if (!token) return;

  allowedCollateral.token = token.id;
  allowedCollateral.allowed = event.params.isAllowed;
  allowedCollateral.controller = controller.id;

  const allowedCollateralChangeEvent = new CollateralAllowedChangeEvent(
    event.transaction.hash.toHexString()
  );
  allowedCollateralChangeEvent.timestamp = event.block.timestamp.toI32();
  allowedCollateralChangeEvent.collateralAddress = event.params.collateral;
  allowedCollateralChangeEvent.allowed = event.params.isAllowed;
  allowedCollateralChangeEvent.controller = controller.id;

  allowedCollateralChangeEvent.save();
  controller.save();
  allowedCollateral.save();
}

export function handleStartAuction(event: StartAuction): void {
  const controller = PaprController.load(
    event.params._event.address.toHexString()
  );
  if (!controller) return;
  const auction = new Auction(event.params.auctionID.toString());
  const nft = loadOrCreateERC721Token(event.params.auctionAssetContract);
  if (!nft) return;
  const vault = Vault.load(
    generateVaultId(event.params._event.address, event.params.nftOwner, nft)
  );
  if (!vault) {
    return;
  }
  vault.latestAuctionStartTime = event.block.timestamp.toI32();
  vault.save();

  auction.auctionAssetContract = nft.id;
  auction.auctionAssetID = event.params.auctionAssetID;
  auction.startPrice = event.params.startPrice;
  auction.perPeriodDecayPercentWad = event.params.perPeriodDecayPercentWad;
  auction.secondsInPeriod = event.params.secondsInPeriod;
  const erc20 = loadOrCreateERC20Token(event.params.paymentAsset);
  if (!erc20) {
    return;
  }

  auction.paymentAsset = erc20.id;
  auction.vault = vault.id;
  auction.nftOwner = event.params.nftOwner;
  auction.controller = controller.id;
  auction.startedBy = event.transaction.from;
  const start = new AuctionStartEvent(event.transaction.hash.toHexString());
  start.timestamp = event.block.timestamp.toI32();
  start.auction = auction.id;
  start.controller = auction.controller;
  start.account = auction.nftOwner;
  start.vault = vault.id;
  start.save();
  auction.start = start.id;
  auction.save();
  handleAuctionStartActivity(event, controller.id);
}

export function handleEndAuction(event: EndAuction): void {
  const auction = Auction.load(event.params.auctionID.toString());
  if (!auction) return;
  const start = AuctionStartEvent.load(auction.start);
  const vault = Vault.load(auction.vault);
  if (!vault || !start) return;
  if (vault.latestAuctionStartTime == start.timestamp) {
    vault.latestAuctionStartTime = 0;
    vault.save();
  }

  const end = new AuctionEndEvent(event.transaction.hash.toHexString());
  end.timestamp = event.block.timestamp.toI32();
  end.auction = auction.id;
  end.controller = auction.controller;
  end.account = auction.nftOwner;
  end.vault = vault.id;
  end.save();
  auction.endPrice = event.params.price;
  auction.end = end.id;
  auction.save();
  handleAuctionEndActivity(event, auction.controller);
}

export function handleIncreaseDebtAndSell(call: IncreaseDebtAndSellCall): void {
  addClientFeeToActivity(
    call.transaction.hash.toHexString(),
    call.inputs.params.swapFeeBips
  );
}

export function handleBuyAndReduceDebt(call: BuyAndReduceDebtCall): void {
  addClientFeeToActivity(
    call.transaction.hash.toHexString(),
    call.inputs.params.swapFeeBips
  );
}
