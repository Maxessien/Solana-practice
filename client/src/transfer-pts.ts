import {
  AccountRole,
  address,
  getAddressEncoder,
  getBytesEncoder,
  getStructEncoder,
  getU64Encoder,
  type AccountLookupMeta,
  type AccountMeta,
  type Instruction,
} from "@solana/kit";
import { client } from "./index.js";
import { getkeypairAndPda, PROGRAM_ID } from "./util.js";
import { TRANSFER_POINTS_DISCRIMINATOR } from "../generated/src/generated/index.js";

const { pda, keypair } = await getkeypairAndPda("keypair2.json");

const player1Pda = "FCqFVuBVtrpsPFVaSRNHXJV9r1MNErLPGw12gW2JjBiy";

const cl = client(keypair);

// console.log(address(player1Pda), pda[0], cl.payer.address)

const accts: (AccountLookupMeta<string, string> | AccountMeta<string>)[] = [
  {
    address: address(player1Pda),
    role: AccountRole.WRITABLE,
  },
  {
    address: pda[0], role: AccountRole.WRITABLE },
  { address: cl.payer.address, role: AccountRole.WRITABLE_SIGNER },
];

const structEncoder = getStructEncoder([
  ["discriminator", getBytesEncoder()],
  ["amount", getU64Encoder()],
]);

const instruction: Instruction = {
  accounts: accts,
  programAddress: PROGRAM_ID,
  data: structEncoder.encode({
    amount: 50,
    discriminator: TRANSFER_POINTS_DISCRIMINATOR,
  }),
};

const res = await cl.sendTransaction([instruction]);

console.log(res);
