const path = require('path');

module.exports = {
  entry: './index.ts',
  mode: "development",
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'alg.js',
    path: path.resolve(__dirname, 'dist'),
    library: "alg",
    libraryTarget: "umd"
  }
};
