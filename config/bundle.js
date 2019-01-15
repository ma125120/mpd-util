var path = require("path");

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'production',
  entry: {
    db: './src/db.js',
    fn: './src/fn.js',
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [ resolve('src') ],
        exclude: [ resolve('node_modules') ]
      }
    ]
  }
};
