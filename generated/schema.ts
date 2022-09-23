// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class LendingStrategy extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("createdAt", Value.fromBigInt(BigInt.zero()));
    this.set("name", Value.fromString(""));
    this.set("symbol", Value.fromString(""));
    this.set("poolAddress", Value.fromBytes(Bytes.empty()));
    this.set("underlying", Value.fromBytes(Bytes.empty()));
    this.set("targetAPR", Value.fromBigInt(BigInt.zero()));
    this.set("norm", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LendingStrategy entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save LendingStrategy entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("LendingStrategy", id.toString(), this);
    }
  }

  static load(id: string): LendingStrategy | null {
    return changetype<LendingStrategy | null>(store.get("LendingStrategy", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get poolAddress(): Bytes {
    let value = this.get("poolAddress");
    return value!.toBytes();
  }

  set poolAddress(value: Bytes) {
    this.set("poolAddress", Value.fromBytes(value));
  }

  get underlying(): Bytes {
    let value = this.get("underlying");
    return value!.toBytes();
  }

  set underlying(value: Bytes) {
    this.set("underlying", Value.fromBytes(value));
  }

  get targetAPR(): BigInt {
    let value = this.get("targetAPR");
    return value!.toBigInt();
  }

  set targetAPR(value: BigInt) {
    this.set("targetAPR", Value.fromBigInt(value));
  }

  get norm(): BigInt {
    let value = this.get("norm");
    return value!.toBigInt();
  }

  set norm(value: BigInt) {
    this.set("norm", Value.fromBigInt(value));
  }

  get vaults(): Array<string> | null {
    let value = this.get("vaults");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set vaults(value: Array<string> | null) {
    if (!value) {
      this.unset("vaults");
    } else {
      this.set("vaults", Value.fromStringArray(<Array<string>>value));
    }
  }

  get allowedCollateral(): Array<string> {
    let value = this.get("allowedCollateral");
    return value!.toStringArray();
  }

  set allowedCollateral(value: Array<string>) {
    this.set("allowedCollateral", Value.fromStringArray(value));
  }

  get normUpdates(): Array<string> | null {
    let value = this.get("normUpdates");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set normUpdates(value: Array<string> | null) {
    if (!value) {
      this.unset("normUpdates");
    } else {
      this.set("normUpdates", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Account entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get vaults(): Array<string> | null {
    let value = this.get("vaults");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set vaults(value: Array<string> | null) {
    if (!value) {
      this.unset("vaults");
    } else {
      this.set("vaults", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Vault extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nonce", Value.fromBigInt(BigInt.zero()));
    this.set("strategy", Value.fromString(""));
    this.set("owner", Value.fromString(""));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("debt", Value.fromBigInt(BigInt.zero()));
    this.set("totalCollateralValue", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Vault entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Vault entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Vault", id.toString(), this);
    }
  }

  static load(id: string): Vault | null {
    return changetype<Vault | null>(store.get("Vault", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nonce(): BigInt {
    let value = this.get("nonce");
    return value!.toBigInt();
  }

  set nonce(value: BigInt) {
    this.set("nonce", Value.fromBigInt(value));
  }

  get strategy(): string {
    let value = this.get("strategy");
    return value!.toString();
  }

  set strategy(value: string) {
    this.set("strategy", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get debt(): BigInt {
    let value = this.get("debt");
    return value!.toBigInt();
  }

  set debt(value: BigInt) {
    this.set("debt", Value.fromBigInt(value));
  }

  get totalCollateralValue(): BigInt {
    let value = this.get("totalCollateralValue");
    return value!.toBigInt();
  }

  set totalCollateralValue(value: BigInt) {
    this.set("totalCollateralValue", Value.fromBigInt(value));
  }

  get collateral(): Array<string> {
    let value = this.get("collateral");
    return value!.toStringArray();
  }

  set collateral(value: Array<string>) {
    this.set("collateral", Value.fromStringArray(value));
  }
}

export class NormalizationUpdate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("strategy", Value.fromString(""));
    this.set("newNorm", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NormalizationUpdate entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save NormalizationUpdate entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("NormalizationUpdate", id.toString(), this);
    }
  }

  static load(id: string): NormalizationUpdate | null {
    return changetype<NormalizationUpdate | null>(
      store.get("NormalizationUpdate", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get strategy(): string {
    let value = this.get("strategy");
    return value!.toString();
  }

  set strategy(value: string) {
    this.set("strategy", Value.fromString(value));
  }

  get newNorm(): BigInt {
    let value = this.get("newNorm");
    return value!.toBigInt();
  }

  set newNorm(value: BigInt) {
    this.set("newNorm", Value.fromBigInt(value));
  }
}

export class VaultCollateral extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contractAddress", Value.fromBytes(Bytes.empty()));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("value", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save VaultCollateral entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save VaultCollateral entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("VaultCollateral", id.toString(), this);
    }
  }

  static load(id: string): VaultCollateral | null {
    return changetype<VaultCollateral | null>(store.get("VaultCollateral", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value!.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get vault(): string | null {
    let value = this.get("vault");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set vault(value: string | null) {
    if (!value) {
      this.unset("vault");
    } else {
      this.set("vault", Value.fromString(<string>value));
    }
  }
}

export class AllowedCollateral extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contractAddress", Value.fromBytes(Bytes.empty()));
    this.set("allowed", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AllowedCollateral entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save AllowedCollateral entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("AllowedCollateral", id.toString(), this);
    }
  }

  static load(id: string): AllowedCollateral | null {
    return changetype<AllowedCollateral | null>(
      store.get("AllowedCollateral", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value!.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get strategy(): string | null {
    let value = this.get("strategy");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set strategy(value: string | null) {
    if (!value) {
      this.unset("strategy");
    } else {
      this.set("strategy", Value.fromString(<string>value));
    }
  }

  get allowed(): boolean {
    let value = this.get("allowed");
    return value!.toBoolean();
  }

  set allowed(value: boolean) {
    this.set("allowed", Value.fromBoolean(value));
  }
}

export class AddCollateralEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("vault", Value.fromString(""));
    this.set("strategy", Value.fromString(""));
    this.set("collateral", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AddCollateralEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save AddCollateralEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("AddCollateralEvent", id.toString(), this);
    }
  }

  static load(id: string): AddCollateralEvent | null {
    return changetype<AddCollateralEvent | null>(
      store.get("AddCollateralEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value!.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get strategy(): string {
    let value = this.get("strategy");
    return value!.toString();
  }

  set strategy(value: string) {
    this.set("strategy", Value.fromString(value));
  }

  get collateral(): string {
    let value = this.get("collateral");
    return value!.toString();
  }

  set collateral(value: string) {
    this.set("collateral", Value.fromString(value));
  }
}

export class RemoveCollateralEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("vault", Value.fromString(""));
    this.set("strategy", Value.fromString(""));
    this.set("collateral", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save RemoveCollateralEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save RemoveCollateralEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("RemoveCollateralEvent", id.toString(), this);
    }
  }

  static load(id: string): RemoveCollateralEvent | null {
    return changetype<RemoveCollateralEvent | null>(
      store.get("RemoveCollateralEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value!.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get strategy(): string {
    let value = this.get("strategy");
    return value!.toString();
  }

  set strategy(value: string) {
    this.set("strategy", Value.fromString(value));
  }

  get collateral(): string {
    let value = this.get("collateral");
    return value!.toString();
  }

  set collateral(value: string) {
    this.set("collateral", Value.fromString(value));
  }
}

export class DebtIncreasedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("vault", Value.fromString(""));
    this.set("strategy", Value.fromString(""));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DebtIncreasedEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DebtIncreasedEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DebtIncreasedEvent", id.toString(), this);
    }
  }

  static load(id: string): DebtIncreasedEvent | null {
    return changetype<DebtIncreasedEvent | null>(
      store.get("DebtIncreasedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value!.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get strategy(): string {
    let value = this.get("strategy");
    return value!.toString();
  }

  set strategy(value: string) {
    this.set("strategy", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class DebtDecreasedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("vault", Value.fromString(""));
    this.set("strategy", Value.fromString(""));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DebtDecreasedEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DebtDecreasedEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DebtDecreasedEvent", id.toString(), this);
    }
  }

  static load(id: string): DebtDecreasedEvent | null {
    return changetype<DebtDecreasedEvent | null>(
      store.get("DebtDecreasedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value!.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get strategy(): string {
    let value = this.get("strategy");
    return value!.toString();
  }

  set strategy(value: string) {
    this.set("strategy", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class CollateralAllowedChangeEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("collateralAddress", Value.fromBytes(Bytes.empty()));
    this.set("strategy", Value.fromString(""));
    this.set("allowed", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save CollateralAllowedChangeEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save CollateralAllowedChangeEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("CollateralAllowedChangeEvent", id.toString(), this);
    }
  }

  static load(id: string): CollateralAllowedChangeEvent | null {
    return changetype<CollateralAllowedChangeEvent | null>(
      store.get("CollateralAllowedChangeEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get collateralAddress(): Bytes {
    let value = this.get("collateralAddress");
    return value!.toBytes();
  }

  set collateralAddress(value: Bytes) {
    this.set("collateralAddress", Value.fromBytes(value));
  }

  get strategy(): string {
    let value = this.get("strategy");
    return value!.toString();
  }

  set strategy(value: string) {
    this.set("strategy", Value.fromString(value));
  }

  get allowed(): boolean {
    let value = this.get("allowed");
    return value!.toBoolean();
  }

  set allowed(value: boolean) {
    this.set("allowed", Value.fromBoolean(value));
  }
}
