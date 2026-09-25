import {
  AccountRole,
  address,
  getBytesEncoder,
  getStructEncoder,
} from "@solana/kit";
import { client } from "./index.js";
import { getkeypairAndPda, PROGRAM_ID } from "./util.js";
import { INIT_PLAYER_DISCRIMINATOR } from "../generated/src/generated/index.js";

const structEncoder = getStructEncoder([["discriminator", getBytesEncoder()]]);

const {keypair, pda} = await getkeypairAndPda("keypair.json")

const res = await client(keypair).sendTransaction([
  {
    programAddress: PROGRAM_ID,
    accounts: [
      { address: pda[0], role: AccountRole.WRITABLE },
      { address: keypair.address, role: AccountRole.WRITABLE_SIGNER },
      {
        address: address("11111111111111111111111111111111"),
        role: AccountRole.READONLY,
      },
    ],
    data: structEncoder.encode({
      discriminator: INIT_PLAYER_DISCRIMINATOR,
    }),
  },
]);

console.log(res)
