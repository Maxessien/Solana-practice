import {
  address,
  createKeyPairSignerFromBytes,
  getAddressEncoder,
  getProgramDerivedAddress,
} from "@solana/kit";
import { readFile } from "fs/promises";

const PROGRAM_ID = address("6r6mzziDKMbkfcfMdwuEoMdCDX8PFbHyGfsqJSm7Kb5V");

const getkeypairAndPda = async (keypairFile?: string) => {
  const CURR_KEY_PAIR_FILE = keypairFile ?? "keypair.json";

  const file = JSON.parse((await readFile(CURR_KEY_PAIR_FILE)).toString());

  const bytes = Uint8Array.from(file);
  const encoder = new TextEncoder();

  const keypair = await createKeyPairSignerFromBytes(bytes);
  const pda = await getProgramDerivedAddress({
    programAddress: PROGRAM_ID,
    seeds: [
      encoder.encode("player"),
      getAddressEncoder().encode(keypair.address),
    ],
  });

  return {keypair, pda}
};


export {PROGRAM_ID, getkeypairAndPda}