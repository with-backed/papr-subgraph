import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";

import {
  IncreaseDebt,
  ReduceDebt,
  UpdateNormalization,
  AddCollateral,
  RemoveCollateral,
  ChangeCollateralAllowed,
} from "../generated/SlyFox/LendingStrategy";

import {
  AddCollateralEvent,
  VaultCollateral,
  CollateralAllowedChangeEvent,
  DebtDecreasedEvent,
  DebtIncreasedEvent,
  LendingStrategy,
  NormalizationUpdate,
  RemoveCollateralEvent,
  Vault,
  AllowedCollateral,
} from "../generated/schema";

import { LendingStrategy as LendingStrategyABI } from "../generated/SlyFox/LendingStrategy";
import { ERC721 as ERC721ABI } from "../generated/SlyFox/ERC721";

function generateCollateralId(addr: Address, tokenId: BigInt): string {
  return `${addr.toHexString()}-${tokenId.toString()}`;
}

function initVault(account: Address, strategy: Address): Vault {
  const vault = new Vault(account.toHexString());
  vault.strategy = strategy.toHexString();
  vault.save();

  return vault;
}

export function handleAddCollateral(event: AddCollateral): void {
  let vault: Vault | null = Vault.load(event.params.account.toHexString());
  if (!vault) {
    vault = initVault(event.params.account, event.params._event.address);
  }

  const collateralAdded = new VaultCollateral(
    generateCollateralId(
      event.params.collateral.addr,
      event.params.collateral.id
    )
  );
  collateralAdded.contractAddress = event.params.collateral.addr;
  collateralAdded.tokenId = event.params.collateral.id;
  collateralAdded.value = event.params.price;
  collateralAdded.symbol = ERC721ABI.bind(
    event.params.collateral.addr
  ).symbol();

  collateralAdded.vault = vault.id;
  vault.totalCollateralValue = vault.totalCollateralValue.plus(
    collateralAdded.value
  );

  collateralAdded.save();
  vault.save();

  const addCollateralEvent = new AddCollateralEvent(
    event.transaction.hash.toHexString()
  );
  addCollateralEvent.collateral = collateralAdded.id;
  addCollateralEvent.timestamp = event.block.timestamp;
  addCollateralEvent.strategy = event.params._event.address.toHexString();
  addCollateralEvent.vault = vault.id;
  addCollateralEvent.txHash = event.transaction.hash;
  addCollateralEvent.save();
}

export function handleCollateralRemoved(event: RemoveCollateral): void {
  const vault = Vault.load(event.params.account.toHexString());
  if (!vault) return;

  const collateralRemoved = VaultCollateral.load(
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
  collateralRemovedEvent.vault = vault.id;
  collateralRemovedEvent.txHash = event.transaction.hash;
  collateralRemovedEvent.save();
}

export function handleIncreaseDebt(event: IncreaseDebt): void {
  let vault = Vault.load(event.params.account.toHexString());
  if (!vault) {
    vault = initVault(event.params.account, event.params._event.address);
  }

  vault.debt = vault.debt.plus(event.params.amount);
  vault.save();

  const debtIncreasedEvent = new DebtIncreasedEvent(
    event.transaction.hash.toHexString()
  );
  debtIncreasedEvent.timestamp = event.block.timestamp;
  debtIncreasedEvent.amount = event.params.amount;
  debtIncreasedEvent.strategy = vault.strategy;
  debtIncreasedEvent.vault = vault.id;
  debtIncreasedEvent.txHash = event.transaction.hash;
  debtIncreasedEvent.save();
}

export function handleReduceDebt(event: ReduceDebt): void {
  const vault = Vault.load(event.params.account.toHexString());
  if (!vault) {
    return;
  }

  vault.debt = vault.debt.minus(event.params.amount);
  vault.save();

  const debtDecreasedEvent = new DebtDecreasedEvent(
    event.transaction.hash.toHexString()
  );
  debtDecreasedEvent.timestamp = event.block.timestamp;
  debtDecreasedEvent.amount = event.params.amount;
  debtDecreasedEvent.strategy = vault.strategy;
  debtDecreasedEvent.vault = vault.id;
  debtDecreasedEvent.txHash = event.transaction.hash;
  debtDecreasedEvent.save();
}

export function handleUpdateNormalization(event: UpdateNormalization): void {
  let strategy = LendingStrategy.load(
    event.params._event.address.toHexString()
  );
  if (!strategy) {
    strategy = new LendingStrategy(event.params._event.address.toHexString());
    strategy.norm = event.params.newNorm;
    strategy.createdAt = event.block.timestamp;
    strategy.poolAddress = LendingStrategyABI.bind(
      event.params._event.address
    ).pool();
    strategy.underlying = LendingStrategyABI.bind(
      event.params._event.address
    ).underlying();
    strategy.debtToken = LendingStrategyABI.bind(
      event.params._event.address
    ).perpetual();
  }

  const normUpdate = new NormalizationUpdate(
    event.transaction.hash.toHexString()
  );

  normUpdate.strategy = strategy.id;
  normUpdate.newNorm = event.params.newNorm;
  normUpdate.timestamp = event.block.timestamp;
  normUpdate.txHash = event.transaction.hash;

  strategy.save();
  normUpdate.save();
}

export function handleCollateralAllowedChanged(
  event: ChangeCollateralAllowed
): void {
  const strategy = LendingStrategy.load(
    event.params._event.address.toHexString()
  );
  if (!strategy) return;
  let allowedCollateral = AllowedCollateral.load(
    `${strategy.id}-${event.params.arg.addr.toHexString()}`
  );
  if (!allowedCollateral) {
    allowedCollateral = new AllowedCollateral(
      `${strategy.id}-${event.params.arg.addr.toHexString()}`
    );
  }
  allowedCollateral.contractAddress = event.params.arg.addr;
  allowedCollateral.allowed = event.params.arg.allowed;
  allowedCollateral.strategy = strategy.id;

  const allowedCollateralChangeEvent = new CollateralAllowedChangeEvent(
    event.transaction.hash.toHexString()
  );
  allowedCollateralChangeEvent.timestamp = event.block.timestamp;
  allowedCollateralChangeEvent.collateralAddress = event.params.arg.addr;
  allowedCollateralChangeEvent.allowed = event.params.arg.allowed;
  allowedCollateralChangeEvent.strategy = strategy.id;
  allowedCollateralChangeEvent.txHash = event.transaction.hash;

  allowedCollateralChangeEvent.save();
  strategy.save();
  allowedCollateral.save();
}
