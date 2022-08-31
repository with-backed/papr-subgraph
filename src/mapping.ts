import { BigInt, log } from "@graphprotocol/graph-ts";

import {
  DebtAdded,
  DebtReduced,
  NormalizationFactorUpdated,
  VaultClosed,
  VaultCreated,
} from "../generated/SlyFox/LendingStrategy";

import { LendingStrategyCreated } from "../generated/MamaSlyFox/StrategyFactory";

import {
  Account,
  LendingStrategy,
  NormFactorUpdate,
  Vault,
} from "../generated/schema";

import { LendingStrategy as LendingStrategyABI } from "../generated/SlyFox/LendingStrategy";

export function handleStrategyCreated(event: LendingStrategyCreated): void {
  const lendingStrategy = new LendingStrategy(
    event.params.strategyAddress.toHexString()
  );

  lendingStrategy.createdAt = event.block.timestamp;
  lendingStrategy.collateral = event.params.collateral;
  lendingStrategy.underlying = event.params.underlying;

  lendingStrategy.poolAddress = LendingStrategyABI.bind(
    event.params.strategyAddress
  ).pool();

  lendingStrategy.name = event.params.name;
  lendingStrategy.symbol = event.params.symbol;
  lendingStrategy.normFactor = BigInt.fromI32(1);

  lendingStrategy.save();
}

export function handleVaultCreated(event: VaultCreated): void {
  const vault = new Vault(event.params.vaultKey.toHexString());

  let account = Account.load(event.params.mintTo.toHexString());
  if (!account) {
    account = new Account(event.params.mintTo.toHexString());
  }

  const strategy = LendingStrategy.load(
    event.params._event.address.toHexString()
  );
  if (!strategy) {
    return;
  }

  vault.strategy = strategy.id;
  vault.owner = account.id;
  vault.debt = event.params.amount;
  vault.tokenId = event.params.tokenId;
  vault.open = true;
  vault.save();
  account.save();
}

export function handleDebtAdded(event: DebtAdded): void {
  const vault = Vault.load(event.params.vaultKey.toHexString());
  if (!vault) {
    return;
  }

  vault.debt = vault.debt.plus(event.params.amount);
  vault.save();
}

export function handleDebtReduced(event: DebtReduced): void {
  const vault = Vault.load(event.params.vaultKey.toHexString());
  if (!vault) {
    return;
  }

  vault.debt = vault.debt.minus(event.params.amount);
  vault.save();
}

export function handleVaultClosed(event: VaultClosed): void {
  const vault = Vault.load(event.params.vaultKey.toHexString());
  if (!vault) {
    return;
  }

  vault.open = false;
  vault.save();
}

export function handleNormFactorUpdated(
  event: NormalizationFactorUpdated
): void {
  const strategy = LendingStrategy.load(
    event.params._event.address.toHexString()
  );
  if (!strategy) {
    return;
  }

  strategy.normFactor = event.params.newNorm;

  const normFactorUpdate = new NormFactorUpdate(
    `${strategy.id}-${event.transaction.hash.toHexString()}`
  );
  normFactorUpdate.strategy = strategy.id;
  normFactorUpdate.oldNorm = event.params.oldNorm;
  normFactorUpdate.newNorm = event.params.newNorm;
  normFactorUpdate.timestamp = event.block.timestamp;

  strategy.save();
  normFactorUpdate.save();
}
