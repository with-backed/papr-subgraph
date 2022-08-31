// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class DebtAdded extends ethereum.Event {
  get params(): DebtAdded__Params {
    return new DebtAdded__Params(this);
  }
}

export class DebtAdded__Params {
  _event: DebtAdded;

  constructor(event: DebtAdded) {
    this._event = event;
  }

  get vaultKey(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class DebtReduced extends ethereum.Event {
  get params(): DebtReduced__Params {
    return new DebtReduced__Params(this);
  }
}

export class DebtReduced__Params {
  _event: DebtReduced;

  constructor(event: DebtReduced) {
    this._event = event;
  }

  get vaultKey(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class NormalizationFactorUpdated extends ethereum.Event {
  get params(): NormalizationFactorUpdated__Params {
    return new NormalizationFactorUpdated__Params(this);
  }
}

export class NormalizationFactorUpdated__Params {
  _event: NormalizationFactorUpdated;

  constructor(event: NormalizationFactorUpdated) {
    this._event = event;
  }

  get oldNorm(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newNorm(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class VaultClosed extends ethereum.Event {
  get params(): VaultClosed__Params {
    return new VaultClosed__Params(this);
  }
}

export class VaultClosed__Params {
  _event: VaultClosed;

  constructor(event: VaultClosed) {
    this._event = event;
  }

  get vaultKey(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class VaultCreated extends ethereum.Event {
  get params(): VaultCreated__Params {
    return new VaultCreated__Params(this);
  }
}

export class VaultCreated__Params {
  _event: VaultCreated;

  constructor(event: VaultCreated) {
    this._event = event;
  }

  get vaultKey(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get mintTo(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class LendingStrategy__vaultInfoResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class LendingStrategy__vaultKeyInputCollateralStruct extends ethereum.Tuple {
  get nft(): Address {
    return this[0].toAddress();
  }

  get id(): BigInt {
    return this[1].toBigInt();
  }
}

export class LendingStrategy extends ethereum.SmartContract {
  static bind(address: Address): LendingStrategy {
    return new LendingStrategy("LendingStrategy", address);
  }

  collateral(): Address {
    let result = super.call("collateral", "collateral():(address)", []);

    return result[0].toAddress();
  }

  try_collateral(): ethereum.CallResult<Address> {
    let result = super.tryCall("collateral", "collateral():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  debtToken(): Address {
    let result = super.call("debtToken", "debtToken():(address)", []);

    return result[0].toAddress();
  }

  try_debtToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("debtToken", "debtToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  debtVault(): Address {
    let result = super.call("debtVault", "debtVault():(address)", []);

    return result[0].toAddress();
  }

  try_debtVault(): ethereum.CallResult<Address> {
    let result = super.tryCall("debtVault", "debtVault():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  index(): BigInt {
    let result = super.call("index", "index():(uint256)", []);

    return result[0].toBigInt();
  }

  try_index(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("index", "index():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lastUpdated(): BigInt {
    let result = super.call("lastUpdated", "lastUpdated():(uint128)", []);

    return result[0].toBigInt();
  }

  try_lastUpdated(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("lastUpdated", "lastUpdated():(uint128)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  liquidationPrice(key: Bytes): BigInt {
    let result = super.call(
      "liquidationPrice",
      "liquidationPrice(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(key)]
    );

    return result[0].toBigInt();
  }

  try_liquidationPrice(key: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "liquidationPrice",
      "liquidationPrice(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(key)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  mark(period: BigInt): BigInt {
    let result = super.call("mark", "mark(uint32):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(period)
    ]);

    return result[0].toBigInt();
  }

  try_mark(period: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("mark", "mark(uint32):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(period)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  maxDebt(price: BigInt): BigInt {
    let result = super.call("maxDebt", "maxDebt(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(price)
    ]);

    return result[0].toBigInt();
  }

  try_maxDebt(price: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("maxDebt", "maxDebt(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(price)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  maxLTV(): BigInt {
    let result = super.call("maxLTV", "maxLTV():(uint256)", []);

    return result[0].toBigInt();
  }

  try_maxLTV(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("maxLTV", "maxLTV():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  newNorm(): BigInt {
    let result = super.call("newNorm", "newNorm():(uint256)", []);

    return result[0].toBigInt();
  }

  try_newNorm(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("newNorm", "newNorm():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  normalization(): BigInt {
    let result = super.call("normalization", "normalization():(uint128)", []);

    return result[0].toBigInt();
  }

  try_normalization(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "normalization",
      "normalization():(uint128)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  onERC721Received(
    param0: Address,
    param1: Address,
    _id: BigInt,
    data: Bytes
  ): Bytes {
    let result = super.call(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(_id),
        ethereum.Value.fromBytes(data)
      ]
    );

    return result[0].toBytes();
  }

  try_onERC721Received(
    param0: Address,
    param1: Address,
    _id: BigInt,
    data: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(_id),
        ethereum.Value.fromBytes(data)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  pool(): Address {
    let result = super.call("pool", "pool():(address)", []);

    return result[0].toAddress();
  }

  try_pool(): ethereum.CallResult<Address> {
    let result = super.tryCall("pool", "pool():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  targetGrowthPerPeriod(): BigInt {
    let result = super.call(
      "targetGrowthPerPeriod",
      "targetGrowthPerPeriod():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_targetGrowthPerPeriod(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "targetGrowthPerPeriod",
      "targetGrowthPerPeriod():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  targetMultiplier(): BigInt {
    let result = super.call(
      "targetMultiplier",
      "targetMultiplier():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_targetMultiplier(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "targetMultiplier",
      "targetMultiplier():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  underlying(): Address {
    let result = super.call("underlying", "underlying():(address)", []);

    return result[0].toAddress();
  }

  try_underlying(): ethereum.CallResult<Address> {
    let result = super.tryCall("underlying", "underlying():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  vaultInfo(param0: Bytes): LendingStrategy__vaultInfoResult {
    let result = super.call(
      "vaultInfo",
      "vaultInfo(bytes32):(uint128,uint128)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return new LendingStrategy__vaultInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_vaultInfo(
    param0: Bytes
  ): ethereum.CallResult<LendingStrategy__vaultInfoResult> {
    let result = super.tryCall(
      "vaultInfo",
      "vaultInfo(bytes32):(uint128,uint128)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new LendingStrategy__vaultInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  vaultKey(collateral: LendingStrategy__vaultKeyInputCollateralStruct): Bytes {
    let result = super.call(
      "vaultKey",
      "vaultKey((address,uint256)):(bytes32)",
      [ethereum.Value.fromTuple(collateral)]
    );

    return result[0].toBytes();
  }

  try_vaultKey(
    collateral: LendingStrategy__vaultKeyInputCollateralStruct
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "vaultKey",
      "vaultKey((address,uint256)):(bytes32)",
      [ethereum.Value.fromTuple(collateral)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _collateral(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _underlying(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _oracle(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CloseVaultCall extends ethereum.Call {
  get inputs(): CloseVaultCall__Inputs {
    return new CloseVaultCall__Inputs(this);
  }

  get outputs(): CloseVaultCall__Outputs {
    return new CloseVaultCall__Outputs(this);
  }
}

export class CloseVaultCall__Inputs {
  _call: CloseVaultCall;

  constructor(call: CloseVaultCall) {
    this._call = call;
  }

  get collateral(): CloseVaultCallCollateralStruct {
    return changetype<CloseVaultCallCollateralStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class CloseVaultCall__Outputs {
  _call: CloseVaultCall;

  constructor(call: CloseVaultCall) {
    this._call = call;
  }
}

export class CloseVaultCallCollateralStruct extends ethereum.Tuple {
  get nft(): Address {
    return this[0].toAddress();
  }

  get id(): BigInt {
    return this[1].toBigInt();
  }
}

export class IncreaseDebtCall extends ethereum.Call {
  get inputs(): IncreaseDebtCall__Inputs {
    return new IncreaseDebtCall__Inputs(this);
  }

  get outputs(): IncreaseDebtCall__Outputs {
    return new IncreaseDebtCall__Outputs(this);
  }
}

export class IncreaseDebtCall__Inputs {
  _call: IncreaseDebtCall;

  constructor(call: IncreaseDebtCall) {
    this._call = call;
  }

  get vaultKey(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class IncreaseDebtCall__Outputs {
  _call: IncreaseDebtCall;

  constructor(call: IncreaseDebtCall) {
    this._call = call;
  }
}

export class LiquidateCall extends ethereum.Call {
  get inputs(): LiquidateCall__Inputs {
    return new LiquidateCall__Inputs(this);
  }

  get outputs(): LiquidateCall__Outputs {
    return new LiquidateCall__Outputs(this);
  }
}

export class LiquidateCall__Inputs {
  _call: LiquidateCall;

  constructor(call: LiquidateCall) {
    this._call = call;
  }

  get vaultKey(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class LiquidateCall__Outputs {
  _call: LiquidateCall;

  constructor(call: LiquidateCall) {
    this._call = call;
  }
}

export class MaxDebtCall extends ethereum.Call {
  get inputs(): MaxDebtCall__Inputs {
    return new MaxDebtCall__Inputs(this);
  }

  get outputs(): MaxDebtCall__Outputs {
    return new MaxDebtCall__Outputs(this);
  }
}

export class MaxDebtCall__Inputs {
  _call: MaxDebtCall;

  constructor(call: MaxDebtCall) {
    this._call = call;
  }

  get price(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class MaxDebtCall__Outputs {
  _call: MaxDebtCall;

  constructor(call: MaxDebtCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class OnERC721ReceivedCall extends ethereum.Call {
  get inputs(): OnERC721ReceivedCall__Inputs {
    return new OnERC721ReceivedCall__Inputs(this);
  }

  get outputs(): OnERC721ReceivedCall__Outputs {
    return new OnERC721ReceivedCall__Outputs(this);
  }
}

export class OnERC721ReceivedCall__Inputs {
  _call: OnERC721ReceivedCall;

  constructor(call: OnERC721ReceivedCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value1(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _id(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class OnERC721ReceivedCall__Outputs {
  _call: OnERC721ReceivedCall;

  constructor(call: OnERC721ReceivedCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class OpenVaultCall extends ethereum.Call {
  get inputs(): OpenVaultCall__Inputs {
    return new OpenVaultCall__Inputs(this);
  }

  get outputs(): OpenVaultCall__Outputs {
    return new OpenVaultCall__Outputs(this);
  }
}

export class OpenVaultCall__Inputs {
  _call: OpenVaultCall;

  constructor(call: OpenVaultCall) {
    this._call = call;
  }

  get request(): OpenVaultCallRequestStruct {
    return changetype<OpenVaultCallRequestStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class OpenVaultCall__Outputs {
  _call: OpenVaultCall;

  constructor(call: OpenVaultCall) {
    this._call = call;
  }
}

export class OpenVaultCallRequestStruct extends ethereum.Tuple {
  get mintTo(): Address {
    return this[0].toAddress();
  }

  get debt(): BigInt {
    return this[1].toBigInt();
  }

  get collateral(): OpenVaultCallRequestCollateralStruct {
    return changetype<OpenVaultCallRequestCollateralStruct>(this[2].toTuple());
  }

  get oracleInfo(): OpenVaultCallRequestOracleInfoStruct {
    return changetype<OpenVaultCallRequestOracleInfoStruct>(this[3].toTuple());
  }

  get sig(): OpenVaultCallRequestSigStruct {
    return changetype<OpenVaultCallRequestSigStruct>(this[4].toTuple());
  }
}

export class OpenVaultCallRequestCollateralStruct extends ethereum.Tuple {
  get nft(): Address {
    return this[0].toAddress();
  }

  get id(): BigInt {
    return this[1].toBigInt();
  }
}

export class OpenVaultCallRequestOracleInfoStruct extends ethereum.Tuple {
  get price(): BigInt {
    return this[0].toBigInt();
  }

  get period(): i32 {
    return this[1].toI32();
  }
}

export class OpenVaultCallRequestSigStruct extends ethereum.Tuple {
  get v(): i32 {
    return this[0].toI32();
  }

  get r(): Bytes {
    return this[1].toBytes();
  }

  get s(): Bytes {
    return this[2].toBytes();
  }
}

export class ReduceDebtCall extends ethereum.Call {
  get inputs(): ReduceDebtCall__Inputs {
    return new ReduceDebtCall__Inputs(this);
  }

  get outputs(): ReduceDebtCall__Outputs {
    return new ReduceDebtCall__Outputs(this);
  }
}

export class ReduceDebtCall__Inputs {
  _call: ReduceDebtCall;

  constructor(call: ReduceDebtCall) {
    this._call = call;
  }

  get vaultKey(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ReduceDebtCall__Outputs {
  _call: ReduceDebtCall;

  constructor(call: ReduceDebtCall) {
    this._call = call;
  }
}

export class UpdateNormalizationCall extends ethereum.Call {
  get inputs(): UpdateNormalizationCall__Inputs {
    return new UpdateNormalizationCall__Inputs(this);
  }

  get outputs(): UpdateNormalizationCall__Outputs {
    return new UpdateNormalizationCall__Outputs(this);
  }
}

export class UpdateNormalizationCall__Inputs {
  _call: UpdateNormalizationCall;

  constructor(call: UpdateNormalizationCall) {
    this._call = call;
  }
}

export class UpdateNormalizationCall__Outputs {
  _call: UpdateNormalizationCall;

  constructor(call: UpdateNormalizationCall) {
    this._call = call;
  }
}
