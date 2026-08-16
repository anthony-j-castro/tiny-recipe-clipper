import path from "node:path";
import config from "@anthony-j-castro/eslint-config";
import queryPlugin from "@tanstack/eslint-plugin-query";
import jsonc from "eslint-plugin-jsonc";

export default [
  ...config,
  ...queryPlugin.configs["flat/recommended"],
  {
    ignores: ["dist/*", "playwright/report/*", "playwright/test-results/*"],
  },
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [["~", path.resolve(import.meta.dirname, "src")]],
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
        typescript: { project: "tsconfig.json" },
      },
    },
  },
  {
    files: ["playwright/**/*.json"],
    language: "jsonc/x",
    plugins: { jsonc },
    rules: {
      "jsonc/sort-keys": "error",
    },
  },
  {
    files: ["playwright/**/*"],
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["~/playwright", path.resolve(import.meta.dirname, "playwright")],
            ["~/src", path.resolve(import.meta.dirname, "src")],
          ],
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
      },
    },
  },
];
