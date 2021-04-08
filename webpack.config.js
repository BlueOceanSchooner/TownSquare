const path = require('path');

const entryFile = path.join(__dirname, 'client', 'src', 'index.js');
const outputDir = path.join(__dirname, 'client', 'dist');

module.exports = {
  entry: {
    index: entryFile
  },
  output: {
    path: outputDir,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },

    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
