// `npm run dev`: regenerates the styles on every change in the CSS of
// @imdz/styles (linked with `npm link` while developing) and recompiles
// dist/ on every change in src/.
import { spawn } from "node:child_process";
import { realpathSync } from "node:fs";
import { join } from "node:path";

const styles = join(realpathSync("node_modules/@imdz/styles"), "src");

const children = [
  spawn(process.execPath, [`--watch-path=${styles}`, "scripts/build-styles.mjs"], {
    stdio: "inherit",
  }),
  spawn("npx", ["tsc", "-p", "tsconfig.json", "--watch", "--preserveWatchOutput"], {
    stdio: "inherit",
    shell: true,
  }),
];

for (const child of children) {
  child.on("exit", (code) => {
    for (const other of children) if (other !== child) other.kill();
    process.exit(code ?? 0);
  });
}
