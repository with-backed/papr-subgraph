import { Address, BigInt, log } from "@graphprotocol/graph-ts";

import {
  IncreaseDebt,
  ReduceDebt,
  UpdateNormalization,
  AddCollateral,
  RemoveCollateral,
} from "../generated/SlyFox/LendingStrategy";

import { CreateLendingStrategy } from "../generated/MamaSlyFox/StrategyFactory";

import {
  Account,
  AddCollateralEvent,
  Collateral,
  LendingStrategy,
  NormalizationUpdate,
  RemoveCollateralEvent,
  Vault,
} from "../generated/schema";

import { LendingStrategy as LendingStrategyABI } from "../generated/SlyFox/LendingStrategy";

function generateCollateralId(addr: Address, tokenId: BigInt): string {
  return `${addr.toHexString()}-${tokenId.toString()}`;
}

export function handleCreateLendingStrategy(
  event: CreateLendingStrategy
): void {
  const lendingStrategy = new LendingStrategy(
    event.params.strategyAddress.toHexString()
  );

  lendingStrategy.createdAt = event.block.timestamp;
  lendingStrategy.allowedCollateralRoot = event.params.allowedCollateralRoot;
  lendingStrategy.strategyURI = event.params.allowedCollateralURI;
  lendingStrategy.underlying = event.params.underlying;
  lendingStrategy.targetAPR = LendingStrategyABI.bind(
    event.params.strategyAddress
  ).targetAPR();

  lendingStrategy.poolAddress = LendingStrategyABI.bind(
    event.params.strategyAddress
  ).pool();

  lendingStrategy.name = event.params.name;
  lendingStrategy.symbol = event.params.symbol;

  lendingStrategy.save();
}

export function handleAddCollateral(event: AddCollateral): void {
  let vault: Vault | null = Vault.load(event.params.vaultId.toString());
  const collateralAdded = new Collateral(
    generateCollateralId(
      event.params.collateral.addr,
      event.params.collateral.id
    )
  );
  collateralAdded.contractAddress = event.params.collateral.addr;
  collateralAdded.tokenId = event.params.collateral.id;
  collateralAdded.value = event.params.oracleInfo.price;

  if (!vault) {
    vault = new Vault(event.params.vaultId.toString());
    vault.openedAt = event.block.timestamp;
    vault.nonce = event.params.vaultNonce;
  }

  collateralAdded.vault = vault.id;

  let account = Account.load(event.transaction.from.toHexString());
  if (!account) {
    account = new Account(event.transaction.from.toHexString());
  }

  const strategy = LendingStrategy.load(
    event.params._event.address.toHexString()
  );
  if (!strategy) {
    return;
  }

  vault.strategy = strategy.id;
  vault.owner = account.id;
  vault.totalCollateralValue = vault.totalCollateralValue.plus(
    collateralAdded.value
  );

  collateralAdded.save();
  vault.save();
  account.save();

  const addCollateralEvent = new AddCollateralEvent(
    event.transaction.hash.toHexString()
  );
  addCollateralEvent.collateral = collateralAdded.id;
  addCollateralEvent.timestamp = event.block.timestamp;
  addCollateralEvent.strategy = strategy.id;
  addCollateralEvent.save();
}

export function handleCollateralRemoved(event: RemoveCollateral): void {
  const vault = Vault.load(event.params.vaultId.toString());
  if (!vault) return;

  const collateralRemoved = Collateral.load(
    generateCollateralId(
      event.params.collateral.addr,
      event.params.collateral.id
    )
  );
  if (!collateralRemoved) return;

  vault.totalCollateralValue = vault.totalCollateralValue.minus(
    collateralRemoved.value
  );
  vault.save();

  collateralRemoved.vault = "";
  collateralRemoved.save();

  const collateralRemovedEvent = new RemoveCollateralEvent(
    event.transaction.hash.toHexString()
  );
  collateralRemovedEvent.collateral = collateralRemoved.id;
  collateralRemovedEvent.timestamp = event.block.timestamp;
  collateralRemovedEvent.strategy = vault.strategy;
  collateralRemovedEvent.save();
}

export function handleIncreaseDebt(event: IncreaseDebt): void {
  const vault = Vault.load(event.params.vaultId.toString());
  if (!vault) {
    return;
  }

  vault.debt = vault.debt.plus(event.params.amount);
  vault.save();
}

export function handleReduceDebt(event: ReduceDebt): void {
  const vault = Vault.load(event.params.vaultId.toHexString());
  if (!vault) {
    return;
  }

  vault.debt = vault.debt.minus(event.params.amount);
  vault.save();
}

export function handleUpdateNormalization(event: UpdateNormalization): void {
  const strategy = LendingStrategy.load(
    event.params._event.address.toHexString()
  );
  if (!strategy) {
    return;
  }

  strategy.norm = event.params.newNorm;

  const normUpdate = new NormalizationUpdate(
    event.transaction.hash.toHexString()
  );

  normUpdate.strategy = strategy.id;
  normUpdate.newNorm = event.params.newNorm;
  normUpdate.timestamp = event.block.timestamp;

  strategy.save();
  normUpdate.save();
}
