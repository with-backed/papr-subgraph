import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";

import {
  IncreaseDebt,
  ReduceDebt,
  UpdateTarget,
  AddCollateral,
  RemoveCollateral,
  AllowCollateral,
  StartAuction,
  EndAuction,
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
} from "../generated/schema";

import { PaprController as PaprControllerABI } from "../generated/SlyFox/PaprController";
import { ERC721 as ERC721ABI } from "../generated/SlyFox/ERC721";

function generateCollateralId(addr: Address, tokenId: BigInt): string {
  return `${addr.toHexString()}-${tokenId.toString()}`;
}

function generateVaultId(
  controller: Address,
  account: Address,
  asset: Address
): string {
  return `${controller.toHexString()}-${account.toHexString()}-${asset.toHexString()}`;
}

function initVault(
  controller: Address,
  account: Address,
  asset: Address
): Vault {
  const vault = new Vault(generateVaultId(controller, account, asset));
  vault.controller = controller.toHexString();
  vault.account = account;
  vault.collateralContract = asset;
  vault.save();

  return vault;
}

export function handleAddCollateral(event: AddCollateral): void {
  let vault: Vault | null = Vault.load(
    generateVaultId(
      event.params._event.address,
      event.params.account,
      event.params.collateralAddress
    )
  );
  if (!vault) {
    vault = initVault(
      event.params._event.address,
      event.params.account,
      event.params.collateralAddress
    );
  }

  const collateralAdded = new VaultCollateral(
    generateCollateralId(event.params.collateralAddress, event.params.tokenId)
  );
  collateralAdded.contractAddress = event.params.collateralAddress;
  collateralAdded.tokenId = event.params.tokenId;
  collateralAdded.symbol = ERC721ABI.bind(
    event.params.collateralAddress
  ).symbol();

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
  addCollateralEvent.timestamp = event.block.timestamp;
  addCollateralEvent.controller = event.params._event.address.toHexString();
  addCollateralEvent.vault = vault.id;
  addCollateralEvent.account = vault.account;
  addCollateralEvent.save();
}

export function handleRemoveCollateral(event: RemoveCollateral): void {
  const vault = Vault.load(
    generateVaultId(
      event.params._event.address,
      event.params.account,
      event.params.collateralAddress
    )
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
  collateralRemovedEvent.timestamp = event.block.timestamp;
  collateralRemovedEvent.controller = vault.controller;
  collateralRemovedEvent.vault = vault.id;
  collateralRemovedEvent.account = vault.account;
  collateralRemovedEvent.save();
}

export function handleIncreaseDebt(event: IncreaseDebt): void {
  let vault = Vault.load(
    generateVaultId(
      event.params._event.address,
      event.params.account,
      event.params.collateralAddress
    )
  );
  if (!vault) {
    vault = initVault(
      event.params._event.address,
      event.params.account,
      event.params.collateralAddress
    );
  }

  vault.debt = vault.debt.plus(event.params.amount);
  vault.debtPerCollateral = vault.debt.div(
    BigInt.fromI32(vault.collateralCount)
  );
  vault.save();

  const debtIncreasedEvent = new DebtIncreasedEvent(
    event.transaction.hash.toHexString()
  );
  debtIncreasedEvent.timestamp = event.block.timestamp;
  debtIncreasedEvent.amount = event.params.amount;
  debtIncreasedEvent.controller = vault.controller;
  debtIncreasedEvent.vault = vault.id;
  debtIncreasedEvent.account = vault.account;
  debtIncreasedEvent.save();
}

export function handleReduceDebt(event: ReduceDebt): void {
  const vault = Vault.load(
    generateVaultId(
      event.params._event.address,
      event.params.account,
      event.params.collateralAddress
    )
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
  debtDecreasedEvent.timestamp = event.block.timestamp;
  debtDecreasedEvent.amount = event.params.amount;
  debtDecreasedEvent.controller = vault.controller;
  debtDecreasedEvent.vault = vault.id;
  debtDecreasedEvent.account = vault.account;
  debtDecreasedEvent.save();
}

export function handleTargetUpdate(event: UpdateTarget): void {
  let controller = PaprController.load(
    event.params._event.address.toHexString()
  );

  if (!controller) {
    controller = new PaprController(event.params._event.address.toHexString());
    controller.target = event.params.newTarget;
    controller.createdAt = event.block.timestamp;

    const poolResult = PaprControllerABI.bind(
      event.params._event.address
    ).try_pool();
    if (poolResult.reverted) return;
    controller.poolAddress = poolResult.value;

    const maxLTVResult = PaprControllerABI.bind(
      event.params._event.address
    ).try_maxLTV();
    if (maxLTVResult.reverted) return;
    controller.maxLTV = maxLTVResult.value;

    const underlyingResult = PaprControllerABI.bind(
      event.params._event.address
    ).try_underlying();
    if (underlyingResult.reverted) return;
    controller.underlying = underlyingResult.value;

    const paprTokenResult = PaprControllerABI.bind(
      event.params._event.address
    ).try_papr();
    if (paprTokenResult.reverted) return;

    controller.paprToken = paprTokenResult.value;
  }

  const targetUpdate = new TargetUpdate(event.transaction.hash.toHexString());

  targetUpdate.controller = controller.id;
  targetUpdate.newTarget = event.params.newTarget;
  targetUpdate.timestamp = event.block.timestamp;

  controller.save();
  targetUpdate.save();
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
  allowedCollateral.contractAddress = event.params.collateral;
  allowedCollateral.allowed = event.params.isAllowed;
  allowedCollateral.controller = controller.id;

  const allowedCollateralChangeEvent = new CollateralAllowedChangeEvent(
    event.transaction.hash.toHexString()
  );
  allowedCollateralChangeEvent.timestamp = event.block.timestamp;
  allowedCollateralChangeEvent.collateralAddress = event.params.collateral;
  allowedCollateralChangeEvent.allowed = event.params.isAllowed;
  allowedCollateralChangeEvent.controller = controller.id;

  allowedCollateralChangeEvent.save();
  controller.save();
  allowedCollateral.save();
}

export function handleStartAuction(event: StartAuction): void {
  const auction = new Auction(event.params.auctionID.toString());
  auction.auctionAssetContract = event.params.auctionAssetContract;
  auction.auctionAssetID = event.params.auctionAssetID;
  auction.startPrice = event.params.startPrice;
  auction.perPeriodDecayPercentWad = event.params.perPeriodDecayPercentWad;
  auction.secondsInPeriod = event.params.secondsInPeriod;
  auction.paymentAsset = event.params.paymentAsset;
  auction.vault = generateVaultId(
    event.params._event.address,
    event.params.nftOwner,
    event.params.auctionAssetContract
  );
  auction.nftOwner = event.params.nftOwner;
  auction.controller = event.params._event.address.toHexString();
  auction.startedBy = event.transaction.from;
  auction.save();
  const start = new AuctionStartEvent(event.transaction.hash.toHexString());
  start.timestamp = event.block.timestamp.toI32();
  start.auction = auction.id;
  start.controller = auction.controller;
  start.account = auction.nftOwner;
  start.save();
}

export function handleEndAuction(event: EndAuction): void {
  const auction = Auction.load(event.params.auctionID.toString());
  if (!auction) return;
  const end = new AuctionEndEvent(event.transaction.hash.toHexString());
  end.timestamp = event.block.timestamp.toI32();
  end.auction = auction.id;
  end.controller = auction.controller;
  end.account = auction.nftOwner;
  end.save();
  auction.endPrice = event.params.price;
  auction.save();
}
