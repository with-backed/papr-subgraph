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
    this.set("allowedCollateralRoot", Value.fromBytes(Bytes.empty()));
    this.set("strategyURI", Value.fromString(""));
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

  get allowedCollateralRoot(): Bytes {
    let value = this.get("allowedCollateralRoot");
    return value!.toBytes();
  }

  set allowedCollateralRoot(value: Bytes) {
    this.set("allowedCollateralRoot", Value.fromBytes(value));
  }

  get strategyURI(): string {
    let value = this.get("strategyURI");
    return value!.toString();
  }

  set strategyURI(value: string) {
    this.set("strategyURI", Value.fromString(value));
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

    this.set("strategy", Value.fromString(""));
    this.set("owner", Value.fromString(""));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("debt", Value.fromBigInt(BigInt.zero()));
    this.set("open", Value.fromBoolean(false));
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

  get open(): boolean {
    let value = this.get("open");
    return value!.toBoolean();
  }

  set open(value: boolean) {
    this.set("open", Value.fromBoolean(value));
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
