const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { assert } = require("console");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    port: 8082,
    liveReload: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Weather App | Odin Project",
      template: "./src/index.html",
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  optimization: {
    runtimeChunk: "single",
  },
  target: "web",
  watchOptions: {
    ignored: /node_modules/, // Exclude node_modules directory from watching
    poll: true, // Check for changes every 1000 milliseconds (1 second)
  },
};
