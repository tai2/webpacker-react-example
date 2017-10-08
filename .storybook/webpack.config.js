// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const { resolve } = require('path');
const { settings } = require('../config/webpack/configuration.js')

function sassLoaders(modules) {
  return [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
      }
    },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    'resolve-url-loader',
    { loader: 'sass-loader', options: { sourceMap: true } }
  ]
}

function extraRules() {
  const tsRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'awesome-typescript-loader'
  }
  const moduleSassRule = {
    test: /\.(scss|sass)$/i,
    exclude: [
      resolve('app/assets/stylesheets'),
      resolve('node_modules'),
    ],
    use: sassLoaders(true),
  }
  const sassRule = {
    test: /\.(scss|sass)$/i,
    include: [
      resolve('app/assets/stylesheets'),
      resolve('node_modules'),
    ],
    use: sassLoaders(false),
  }
  const assetsRule = {
    test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
    use: [{
      loader: 'file-loader',
    }]
  }

  return [tsRule, moduleSassRule, sassRule, assetsRule]
}

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push(...extraRules())
  storybookBaseConfig.resolve.extensions.push('.ts', '.tsx', 'scss');
  storybookBaseConfig.resolve.modules.unshift(resolve(settings.source_path))
  return storybookBaseConfig
}

