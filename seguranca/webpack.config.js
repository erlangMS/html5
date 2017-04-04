var path = require('path');

module.exports = {
  entry:'./app/main.browser.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename:'./dist/bundle.js'
  },
  resolve: {
    extensions: ['.js','.ts']
  },
  module : {
    loaders: [{
      test: /\.ts/,
      loaders:['ts-loader'],
      exclude: /node_modules/
    }]
  }
}
