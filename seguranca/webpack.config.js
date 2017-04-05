var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}
