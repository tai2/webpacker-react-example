const { environment } = require('@rails/webpacker')
const merge = require('webpack-merge')
const { resolve } = require('path')

const globalStylePaths = [
  resolve('app/assets/stylesheets'),
  resolve('node_modules')
]

function enableCssModules(cssLoader) {
  const cssModuleOptions = {
    modules: true,
    sourceMap: true,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  }
  cssLoader.options = merge(cssLoader.options, cssModuleOptions)
}

// Replace ts-loader with awesome-typescript-loader
environment.loaders.set('typescript', {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: 'awesome-typescript-loader'
})

// Limit this loader to specific paths
const styleLoader = environment.loaders.get('style')
styleLoader.include = globalStylePaths

// Add modularized css loader for client components
delete require.cache[require.resolve('@rails/webpacker/package/loaders/style')]
const moduleStyleLoader = require('@rails/webpacker/package/loaders/style')
moduleStyleLoader.exclude = globalStylePaths
enableCssModules(moduleStyleLoader.use.find(el => el.loader === 'css-loader'))
environment.loaders.set('moduleStyle', moduleStyleLoader)

module.exports = environment
