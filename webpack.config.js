const path = require("path");
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WebpackNotifierPlugin = require("webpack-notifier");

const libName = require("./package.json").name;
const targetFileName = `${libName}.js`

var PROD = JSON.parse(process.env.PROD || false);

module.exports = {
  entry: "./src/index.ts",
  mode: "none",
  devtool: "source-map",
  plugins: [
    new WebpackNotifierPlugin({
      title: targetFileName,
      alwaysNotify: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.jison$/,
        use: "./loaders/jison-loader.js"
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ ".ts", ".jison" ]
  },
  output: {
    filename: targetFileName,
    path: path.resolve(__dirname, "dist"),
    library: libName,
    libraryTarget: "umd",
    // Workaround for Webpack 4. See https://github.com/webpack/webpack/issues/6522#issuecomment-371120689
    globalObject: "typeof self !== \"undefined\" ? self : this"
  }
};

if (PROD) {
  // https://webpack.js.org/concepts/mode/#mode-production
  module.exports.plugins.push(
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        keep_classnames: true
      }
    })
  );
  module.exports.plugins.push(
    new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify("production")})
  );
  module.exports.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin()
  );
  module.exports.plugins.push(
    new webpack.NoEmitOnErrorsPlugin()
  );
}

