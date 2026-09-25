import { createClient, type TransactionSigner } from "@solana/kit";

import { signer } from "@solana/kit-plugin-signer";
import { solanaDevnetRpc } from "@solana/kit-plugin-rpc";

const client = (keypair: TransactionSigner) =>
  createClient().use(signer(keypair)).use(solanaDevnetRpc());

export { client };
