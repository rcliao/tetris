module.exports = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      text: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
