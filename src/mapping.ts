import { BigInt, log } from "@graphprotocol/graph-ts";

import {
  IncreaseDebt,
  ReduceDebt,
  UpdateNormalization,
  CloseVault,
  OpenVault,
} from "../generated/SlyFox/LendingStrategy";

import { CreateLendingStrategy } from "../generated/MamaSlyFox/StrategyFactory";

import {
  Account,
  LendingStrategy,
  NormalizationUpdate,
  Vault,
} from "../generated/schema";

import { LendingStrategy as LendingStrategyABI } from "../generated/SlyFox/LendingStrategy";

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

  lendingStrategy.poolAddress = LendingStrategyABI.bind(
    event.params.strategyAddress
  ).pool();

  lendingStrategy.name = event.params.name;
  lendingStrategy.symbol = event.params.symbol;
  lendingStrategy.norm = BigInt.fromI32(1);

  lendingStrategy.save();

  const normUpdate = new NormalizationUpdate(
    event.transaction.hash.toHexString()
  );
  normUpdate.newNorm = BigInt.fromI32(1);
  normUpdate.strategy = event.params.strategyAddress.toHexString();
  normUpdate.save();
}

export function handleOpenVault(event: OpenVault): void {
  const vault = new Vault(event.params.vaultId.toString());

  let account = Account.load(event.params.owner.toHexString());
  if (!account) {
    account = new Account(event.params.owner.toHexString());
  }

  const strategy = LendingStrategy.load(
    event.params._event.address.toHexString()
  );
  if (!strategy) {
    return;
  }

  vault.strategy = strategy.id;
  vault.owner = account.id;
  vault.debt = BigInt.fromI32(0);
  vault.open = true;
  vault.save();
  account.save();
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

export function handleCloseVault(event: CloseVault): void {
  const vault = Vault.load(event.params.vaultId.toHexString());
  if (!vault) {
    return;
  }

  vault.open = false;
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
