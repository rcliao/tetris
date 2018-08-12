module.exports = {
  entry: './src/index.ts',
  output: {
    filename: './app.bundle.js'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }]
  },
  devtool: 'inline-source-map'
}
