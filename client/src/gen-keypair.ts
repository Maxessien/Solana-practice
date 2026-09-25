import { generateKeyPair, writeKeyPair } from "@solana/kit";


const keypair = await generateKeyPair(true)

await writeKeyPair(keypair, "keypair2.json")

console.log("Keypair written to storage")