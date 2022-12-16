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

export class PaprController extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("createdAt", Value.fromBigInt(BigInt.zero()));
    this.set("poolAddress", Value.fromBytes(Bytes.empty()));
    this.set("underlying", Value.fromBytes(Bytes.empty()));
    this.set("paprToken", Value.fromBytes(Bytes.empty()));
    this.set("maxLTV", Value.fromBigInt(BigInt.zero()));
    this.set("target", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PaprController entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save PaprController entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("PaprController", id.toString(), this);
    }
  }

  static load(id: string): PaprController | null {
    return changetype<PaprController | null>(store.get("PaprController", id));
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

  get paprToken(): Bytes {
    let value = this.get("paprToken");
    return value!.toBytes();
  }

  set paprToken(value: Bytes) {
    this.set("paprToken", Value.fromBytes(value));
  }

  get maxLTV(): BigInt {
    let value = this.get("maxLTV");
    return value!.toBigInt();
  }

  set maxLTV(value: BigInt) {
    this.set("maxLTV", Value.fromBigInt(value));
  }

  get target(): BigInt {
    let value = this.get("target");
    return value!.toBigInt();
  }

  set target(value: BigInt) {
    this.set("target", Value.fromBigInt(value));
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

  get targetUpdates(): Array<string> | null {
    let value = this.get("targetUpdates");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set targetUpdates(value: Array<string> | null) {
    if (!value) {
      this.unset("targetUpdates");
    } else {
      this.set("targetUpdates", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Vault extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("account", Value.fromBytes(Bytes.empty()));
    this.set("collateralContract", Value.fromBytes(Bytes.empty()));
    this.set("controller", Value.fromString(""));
    this.set("debt", Value.fromBigInt(BigInt.zero()));
    this.set("debtPerCollateral", Value.fromBigInt(BigInt.zero()));
    this.set("collateralCount", Value.fromI32(0));
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

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get collateralContract(): Bytes {
    let value = this.get("collateralContract");
    return value!.toBytes();
  }

  set collateralContract(value: Bytes) {
    this.set("collateralContract", Value.fromBytes(value));
  }

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
  }

  get debt(): BigInt {
    let value = this.get("debt");
    return value!.toBigInt();
  }

  set debt(value: BigInt) {
    this.set("debt", Value.fromBigInt(value));
  }

  get debtPerCollateral(): BigInt {
    let value = this.get("debtPerCollateral");
    return value!.toBigInt();
  }

  set debtPerCollateral(value: BigInt) {
    this.set("debtPerCollateral", Value.fromBigInt(value));
  }

  get collateral(): Array<string> {
    let value = this.get("collateral");
    return value!.toStringArray();
  }

  set collateral(value: Array<string>) {
    this.set("collateral", Value.fromStringArray(value));
  }

  get collateralCount(): i32 {
    let value = this.get("collateralCount");
    return value!.toI32();
  }

  set collateralCount(value: i32) {
    this.set("collateralCount", Value.fromI32(value));
  }
}

export class TargetUpdate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("newTarget", Value.fromBigInt(BigInt.zero()));
    this.set("controller", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TargetUpdate entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save TargetUpdate entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("TargetUpdate", id.toString(), this);
    }
  }

  static load(id: string): TargetUpdate | null {
    return changetype<TargetUpdate | null>(store.get("TargetUpdate", id));
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

  get newTarget(): BigInt {
    let value = this.get("newTarget");
    return value!.toBigInt();
  }

  set newTarget(value: BigInt) {
    this.set("newTarget", Value.fromBigInt(value));
  }

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
  }
}

export class VaultCollateral extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contractAddress", Value.fromBytes(Bytes.empty()));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("symbol", Value.fromString(""));
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

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }
}

export class AllowedCollateral extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contractAddress", Value.fromBytes(Bytes.empty()));
    this.set("controller", Value.fromString(""));
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

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
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
    this.set("controller", Value.fromString(""));
    this.set("account", Value.fromBytes(Bytes.empty()));
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

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
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
    this.set("controller", Value.fromString(""));
    this.set("account", Value.fromBytes(Bytes.empty()));
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

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
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
    this.set("controller", Value.fromString(""));
    this.set("account", Value.fromBytes(Bytes.empty()));
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

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
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
    this.set("controller", Value.fromString(""));
    this.set("account", Value.fromBytes(Bytes.empty()));
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

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class Auction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("startedBy", Value.fromBytes(Bytes.empty()));
    this.set("vault", Value.fromString(""));
    this.set("nftOwner", Value.fromBytes(Bytes.empty()));
    this.set("controller", Value.fromString(""));
    this.set("auctionAssetID", Value.fromBigInt(BigInt.zero()));
    this.set("auctionAssetContract", Value.fromBytes(Bytes.empty()));
    this.set("perPeriodDecayPercentWad", Value.fromBigInt(BigInt.zero()));
    this.set("secondsInPeriod", Value.fromBigInt(BigInt.zero()));
    this.set("startPrice", Value.fromBigInt(BigInt.zero()));
    this.set("paymentAsset", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Auction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Auction entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Auction", id.toString(), this);
    }
  }

  static load(id: string): Auction | null {
    return changetype<Auction | null>(store.get("Auction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get startedBy(): Bytes {
    let value = this.get("startedBy");
    return value!.toBytes();
  }

  set startedBy(value: Bytes) {
    this.set("startedBy", Value.fromBytes(value));
  }

  get endPrice(): BigInt | null {
    let value = this.get("endPrice");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set endPrice(value: BigInt | null) {
    if (!value) {
      this.unset("endPrice");
    } else {
      this.set("endPrice", Value.fromBigInt(<BigInt>value));
    }
  }

  get vault(): string {
    let value = this.get("vault");
    return value!.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get nftOwner(): Bytes {
    let value = this.get("nftOwner");
    return value!.toBytes();
  }

  set nftOwner(value: Bytes) {
    this.set("nftOwner", Value.fromBytes(value));
  }

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
  }

  get start(): string {
    let value = this.get("start");
    return value!.toString();
  }

  set start(value: string) {
    this.set("start", Value.fromString(value));
  }

  get end(): string | null {
    let value = this.get("end");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set end(value: string | null) {
    if (!value) {
      this.unset("end");
    } else {
      this.set("end", Value.fromString(<string>value));
    }
  }

  get auctionAssetID(): BigInt {
    let value = this.get("auctionAssetID");
    return value!.toBigInt();
  }

  set auctionAssetID(value: BigInt) {
    this.set("auctionAssetID", Value.fromBigInt(value));
  }

  get auctionAssetContract(): Bytes {
    let value = this.get("auctionAssetContract");
    return value!.toBytes();
  }

  set auctionAssetContract(value: Bytes) {
    this.set("auctionAssetContract", Value.fromBytes(value));
  }

  get perPeriodDecayPercentWad(): BigInt {
    let value = this.get("perPeriodDecayPercentWad");
    return value!.toBigInt();
  }

  set perPeriodDecayPercentWad(value: BigInt) {
    this.set("perPeriodDecayPercentWad", Value.fromBigInt(value));
  }

  get secondsInPeriod(): BigInt {
    let value = this.get("secondsInPeriod");
    return value!.toBigInt();
  }

  set secondsInPeriod(value: BigInt) {
    this.set("secondsInPeriod", Value.fromBigInt(value));
  }

  get startPrice(): BigInt {
    let value = this.get("startPrice");
    return value!.toBigInt();
  }

  set startPrice(value: BigInt) {
    this.set("startPrice", Value.fromBigInt(value));
  }

  get paymentAsset(): Bytes {
    let value = this.get("paymentAsset");
    return value!.toBytes();
  }

  set paymentAsset(value: Bytes) {
    this.set("paymentAsset", Value.fromBytes(value));
  }
}

export class AuctionStartEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromI32(0));
    this.set("auction", Value.fromString(""));
    this.set("account", Value.fromBytes(Bytes.empty()));
    this.set("controller", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AuctionStartEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save AuctionStartEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("AuctionStartEvent", id.toString(), this);
    }
  }

  static load(id: string): AuctionStartEvent | null {
    return changetype<AuctionStartEvent | null>(
      store.get("AuctionStartEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }

  get auction(): string {
    let value = this.get("auction");
    return value!.toString();
  }

  set auction(value: string) {
    this.set("auction", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
  }
}

export class AuctionEndEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromI32(0));
    this.set("auction", Value.fromString(""));
    this.set("account", Value.fromBytes(Bytes.empty()));
    this.set("controller", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AuctionEndEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save AuctionEndEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("AuctionEndEvent", id.toString(), this);
    }
  }

  static load(id: string): AuctionEndEvent | null {
    return changetype<AuctionEndEvent | null>(store.get("AuctionEndEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }

  get auction(): string {
    let value = this.get("auction");
    return value!.toString();
  }

  set auction(value: string) {
    this.set("auction", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
  }
}

export class CollateralAllowedChangeEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("collateralAddress", Value.fromBytes(Bytes.empty()));
    this.set("controller", Value.fromString(""));
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

  get controller(): string {
    let value = this.get("controller");
    return value!.toString();
  }

  set controller(value: string) {
    this.set("controller", Value.fromString(value));
  }

  get allowed(): boolean {
    let value = this.get("allowed");
    return value!.toBoolean();
  }

  set allowed(value: boolean) {
    this.set("allowed", Value.fromBoolean(value));
  }
}
