import path from "node:path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import * as dotenv from "dotenv";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import values from "postcss-modules-values";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";

const __dirname = import.meta.dirname;

dotenv.config({ path: path.resolve(__dirname, ".env") });

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
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // or 'style-loader' for dev
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
                namedExport: false,
              },
              importLoaders: 1, // run postcss-loader before css-loader
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  values, // enables @value directive
                ],
              },
            },
          },
        ],
      },
      {
        test: /(?<!\.module)\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d\.\d\.\d)?$/,
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
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

export default config;
