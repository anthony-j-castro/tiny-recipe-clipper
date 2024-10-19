const path = require("node:path");
const config = require("@anthony-j-castro/eslint-config");
const queryPlugin = require("@tanstack/eslint-plugin-query");
const jsonc = require("eslint-plugin-jsonc");
const globals = require("globals");
const jsoncParser = require("jsonc-eslint-parser");

module.exports = [
  ...config,
  ...queryPlugin.configs["flat/recommended"],
  {
    ignores: ["dist/*", "playwright/report/**", "playwright/test-results/**"],
  },
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [["~", path.resolve(__dirname, "src")]],
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
        typescript: { project: "tsconfig.json" },
      },
    },
  },
  {
    files: ["eslint.config.js", "webpack.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["playwright/**/*.json"],
    languageOptions: {
      parser: jsoncParser,
    },
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
            ["~/playwright", path.resolve(__dirname, "playwright")],
            ["~/src", path.resolve(__dirname, "src")],
          ],
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
      },
    },
  },
];
