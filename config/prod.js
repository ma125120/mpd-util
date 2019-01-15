var path = require("path");

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'index.js',
    library: {
      root: 'MpdUtil',
      amd: 'mpd-util',
      commonjs: 'mpd-util'
    },
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
