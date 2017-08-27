const configureExtractTextPlugin = require('../extracttext.js')
const { resolve } = require('path');
const { env } = require('../configuration.js')

module.exports = {
  test: /\.(scss|sass|css)$/i,
  exclude: [
    resolve('app/assets/stylesheets'),
    resolve('node_modules'),
  ],
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        minimize: env.NODE_ENV === 'production',
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
      }
    },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    'resolve-url-loader',
    { loader: 'sass-loader', options: { sourceMap: true } }
  ]
}
