const path = require('path')

module.exports = {
  context: __dirname,
  entry: './assets/js/App.js',
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.csv$/,
        loader: 'dsv-loader',
        options: {
          delimiter: ';!'
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build')
  }
}
