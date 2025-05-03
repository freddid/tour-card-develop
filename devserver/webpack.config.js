const webpack = require("webpack");
const path = require("path");
module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },

  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../public"),
    },
    compress: true,
    port: 8080,
  },
};