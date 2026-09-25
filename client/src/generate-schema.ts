import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url'; // 💡 Import pathToFileURL
import { createFromRoot } from 'codama';
import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import { renderVisitor } from '@codama/renderers-js';

// Resolve directory roots properly for modern Node ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateClient() {
  const idlPath = path.join(__dirname, 'idl.json');
  const outputFolder = path.join(__dirname, 'generated');

  console.log("Reading raw Anchor IDL blueprint...");
  
  // WINDOWS PATH FIX: Convert "C:\projects\..." into a clean "file:///C:/projects/..." URL
  const idlFileUrl = pathToFileURL(idlPath).href;

  // Dynamically load your json layout using the safe file URL format
  const idlSchema = await import(idlFileUrl, { with: { type: 'json' } });

  // Assemble the Codama workspace tree
  const codama = createFromRoot(rootNodeFromAnchor(idlSchema.default));

  console.log("Rendering tree-shakeable @solana/kit TypeScript client modules...");
  
  // 3. Trigger the visitor conversion sequence directly on the workspace graph
  await codama.accept(renderVisitor(outputFolder));

  console.log("Type-safe TypeScript SDK successfully generated inside src/generated!");
}

generateClient().catch(console.error);
