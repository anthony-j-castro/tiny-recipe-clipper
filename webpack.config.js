const path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const config = {
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
    new webpack.EnvironmentPlugin({
      BUILD_ENV: null,
    }),
    new HtmlWebpackPlugin({
      chunks: ["popup"],
      template: path.resolve(__dirname, "src/popup/index.html"),
      filename: "popup.html",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      chunks: ["options"],
      template: path.resolve(__dirname, "src/options/index.html"),
      filename: "options.html",
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/manifest.json"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "src/images"),
          to: path.resolve(__dirname, "dist/images"),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
      "~": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  performance: {
    hints: false,
  },
};

module.exports = config;
