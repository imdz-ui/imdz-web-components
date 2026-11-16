// `npm run dev`: regenerates the styles on every change in the CSS of
// @imdz/styles (linked with `npm link` while developing). The components in
// src/ are plain JS: nothing to compile.
import { spawn } from "node:child_process";
import { realpathSync } from "node:fs";
import { join } from "node:path";

const styles = join(realpathSync("node_modules/@imdz/styles"), "src");

const child = spawn(process.execPath, [`--watch-path=${styles}`, "scripts/build-styles.mjs"], {
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 0));
