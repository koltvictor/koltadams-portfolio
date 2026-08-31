import { defineConfig } from "vite";
import { resolve } from "node:path";
import { readdirSync, existsSync } from "node:fs";

// Every writing/<slug>/index.html becomes a page at /writing/<slug>/.
// Adding a post = one folder with an index.html. No config edits.
const posts = existsSync("writing")
  ? Object.fromEntries(
      readdirSync("writing", { withFileTypes: true })
        .filter((d) => d.isDirectory() && existsSync(`writing/${d.name}/index.html`))
        .map((d) => [`writing-${d.name}`, resolve(__dirname, `writing/${d.name}/index.html`)])
    )
  : {};

export default defineConfig({
  build: {
    rollupOptions: {
      input: { main: resolve(__dirname, "index.html"), ...posts },
    },
  },
});
