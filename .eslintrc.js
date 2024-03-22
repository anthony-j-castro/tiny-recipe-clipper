const path = require("node:path");

module.exports = {
  env: { browser: true, node: true },
  extends: ["@anthony-j-castro/eslint-config"],
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
