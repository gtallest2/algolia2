const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: './assets/js/App.js',
  module: {
    loaders: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        include: [
          path.resolve('assets/'),
          path.resolve('node_modules/preact-compat/src')
        ],
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(), // minify
    new webpack.optimize.AggressiveMergingPlugin()// merge
  ],
  resolve: {
    'alias': {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'react-addons-css-transition-group': 'preact-css-transition-group'
    }
  }
}
