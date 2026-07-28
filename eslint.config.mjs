// Flat ESLint config.
//
// Next 16 removed `next lint`, so this repo's "lint" script had been silently
// broken since the upgrade — it passed "lint" to next as a DIRECTORY name and
// died with "Invalid project directory provided, no such directory:
// .../makoai.studio/lint". Nobody saw it, because no CI ever ran lint here.
// ESLint now runs directly through the CLI against this config.
//
// eslint-config-next 16 exports real flat configs (arrays), so they are
// imported directly — do NOT reach for FlatCompat/@eslint/eslintrc here. The
// compat path both throws on this config ("Converting circular structure to
// JSON") and drags in an extra vulnerable minimatch@3.

import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptConfig from "eslint-config-next/typescript";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts", "public/**"],
  },
  ...coreWebVitals,
  ...typescriptConfig,
];

export default config;
