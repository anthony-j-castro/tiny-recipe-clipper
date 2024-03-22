const path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PopupHtmlPlugin = new HtmlWebpackPlugin({
  chunks: ["popup"],
  template: path.resolve(__dirname, "src/popup/index.html"),
  filename: "popup.html",
  inject: "body",
});

const OptionsHtmlPlugin = new HtmlWebpackPlugin({
  chunks: ["options"],
  template: path.resolve(__dirname, "src/options/index.html"),
  filename: "options.html",
  inject: "body",
});

const config = {
  mode: "production",
  entry: {
    "service-worker": {
      import: path.resolve(__dirname, "src/service-worker/index.ts"),
      filename: "service-worker.js",
    },
    options: {
      import: path.resolve(__dirname, "src/options/index.tsx"),
      filename: "options.js",
    },
    popup: {
      import: path.resolve(__dirname, "src/popup/index.tsx"),
      filename: "popup.js",
    },
    "recipe-scraper": {
      import: path.resolve(
        __dirname,
        "src/content-scripts/recipe-scraper/index.ts",
      ),
      filename: "recipe-scraper.js",
    },
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: [/node_modules/],
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [/node_modules/],
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    PopupHtmlPlugin,
    OptionsHtmlPlugin,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/manifest.json"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

module.exports = config;
