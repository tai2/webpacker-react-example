const { environment } = require('@rails/webpacker')
const merge = require('webpack-merge')
const { resolve } = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Replace ts-loader with awesome-typescript-loader
environment.loaders.append('typescript', {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: 'awesome-typescript-loader'
})

// Add resolve-url-loader
// see: https://github.com/rails/webpacker/blob/master/docs/css.md#resolve-url-loader
const resolveUrlLoader = {
  loader: 'resolve-url-loader',
  options: {
    attempts: 1
  }
}
environment.loaders.get('sass').use.splice(-1, 0, resolveUrlLoader)
environment.loaders.get('moduleSass').use.splice(-1, 0, resolveUrlLoader)

// Clearer generated classnames
for (const ruleName of ['moduleCss', 'moduleSass']) {
  environment.loaders.get(ruleName).use
    .find(rule => rule.loader === 'css-loader')
    .options.localIdentName = '[folder]-[local]--[hash:base64:5]'
}

// Add bundle analyzer
environment.plugins.append(
  'Analyzer',
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
  })
)

module.exports = environment
