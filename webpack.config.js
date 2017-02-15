module.exports = {
  entry: __dirname + '/assets/js/App.js',
  module: {
    loaders: [
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
    path: __dirname + '/build'
  }
};
