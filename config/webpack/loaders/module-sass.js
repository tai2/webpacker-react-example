const configureExtractTextPlugin = require('../extracttext.js')
const { resolve } = require('path');

module.exports = {
  test: /\.(scss|sass|css)$/i,
  exclude: [
    resolve('app/assets/stylesheets'),
    resolve('node_modules'),
  ],
  use: configureExtractTextPlugin(true),
}
