const path = require("node:path");

module.exports = {
  env: { browser: true, node: true },
  extends: [
    "@anthony-j-castro/eslint-config",
    "plugin:react/jsx-runtime",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  overrides: [
    {
      files: ["playwright/**/*.json"],
      parser: "jsonc-eslint-parser",
      rules: {
        "jsonc/sort-keys": "error",
      },
    },
  ],
  plugins: ["jsonc"],
  settings: {
    "import/resolver": {
      alias: {
        map: [["~", path.resolve(__dirname, "src")]],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
      typescript: { project: "tsconfig.json" },
    },
  },
};
