const path = require("path");
const lib_name = require("./package.json").name;

module.exports = {
  entry: "./src/index.ts",
  mode: "none",
  module: {
    rules: [
      {
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ ".ts" ]
  },
  output: {
    filename: lib_name + ".js",
    path: path.resolve(__dirname, "dist"),
    library: lib_name,
    libraryTarget: "umd",
    // Workaround for Webpack 4. See https://github.com/webpack/webpack/issues/6522#issuecomment-371120689
    globalObject: "typeof self !== \"undefined\" ? self : this"
  }
};
