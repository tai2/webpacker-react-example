const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { env } = require('./configuration.js')

function configureExtractTextPlugin(modules) {
  return ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: env.NODE_ENV === 'production',
          modules,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        }
      },
      { loader: 'postcss-loader', options: { sourceMap: true } },
      'resolve-url-loader',
      { loader: 'sass-loader', options: { sourceMap: true } }
    ]
  });
}

module.exports = configureExtractTextPlugin;
