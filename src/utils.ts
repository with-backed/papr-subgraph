import { Address } from "@graphprotocol/graph-ts";
import { ERC20Token, ERC721Token } from "../generated/schema";
import { ERC721 as ERC721ABI } from "../generated/SlyFox/ERC721";
import { ERC20 as ERC20ABI } from "../generated/SlyFox/ERC20";

export function loadOrCreateERC721Token(
  contractAddress: Address
): ERC721Token | null {
  var token = ERC721Token.load(contractAddress.toHexString());
  if (token) {
    return token;
  }

  token = new ERC721Token(contractAddress.toHexString());
  const contract = ERC721ABI.bind(contractAddress);
  var callResult = contract.try_symbol();
  if (callResult.reverted) return null;
  token.symbol = callResult.value;

  callResult = contract.try_name();
  if (callResult.reverted) return null;
  token.name = callResult.value;
  token.save();

  return token;
}

export function loadOrCreateERC20Token(
  contractAddress: Address
): ERC20Token | null {
  var token = ERC20Token.load(contractAddress.toHexString());
  if (token) {
    return token;
  }

  token = new ERC20Token(contractAddress.toHexString());
  const contract = ERC20ABI.bind(contractAddress);
  var callResult = contract.try_symbol();
  if (callResult.reverted) return null;
  token.symbol = callResult.value;

  callResult = contract.try_name();
  if (callResult.reverted) return null;
  token.name = callResult.value;

  let callResultDecimals = contract.try_decimals();
  if (callResultDecimals.reverted) return null;
  token.decimals = callResultDecimals.value;
  token.save();

  return token;
}
