import {
  fetchEncodedAccount,
  getAddressDecoder,
  getStructDecoder,
  getU64Decoder,
} from "@solana/kit";
import { client } from "./index.js";
import { getkeypairAndPda } from "./util.js";


const {keypair, pda} = await getkeypairAndPda("keypair2.json")

const acct = await fetchEncodedAccount(client(keypair).rpc, pda[0]);

const structDecoder = getStructDecoder([
  ["points", getU64Decoder()],
  ["authority", getAddressDecoder()],
]);

console.log(
  acct.exists ? structDecoder.decode(acct.data.slice(8)) : "Not found",
);
