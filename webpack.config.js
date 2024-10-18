import path from "node:path";
import { fileURLToPath } from "node:url";
import { CopyPlugin } from "copy-webpack-plugin";
import dotenv from "dotenv";
import HtmlPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default {
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
      ROLLBAR_ACCESS_TOKEN: null,
    }),
    new HtmlPlugin({
      chunks: ["popup"],
      template: path.resolve(__dirname, "src/popup/index.html"),
      filename: "popup.html",
      inject: "body",
    }),
    new HtmlPlugin({
      chunks: ["options"],
      template: path.resolve(__dirname, "src/options/index.html"),
      filename: "options.html",
      inject: "body",
    }),
    new CopyPlugin({
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
