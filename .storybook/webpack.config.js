// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const { resolve } = require('path');

const config = require('@rails/webpacker/package/config');
const environment = require('../config/webpack/environment')

module.exports = (storybookBaseConfig, configType) => {
  // Here reusing webpacker's style rules. It needs setting hmr config true in
  // webpacker.yml. Otherwise ExtractTextPlugin will be used and result in runtime
  // errors in storybook.
  const rules = [
    environment.loaders.get('style'),
    environment.loaders.get('moduleStyle'),
    environment.loaders.get('typescript'),
    environment.loaders.get('file'),
  ]
  storybookBaseConfig.module.rules.push(...rules)
  storybookBaseConfig.resolve.extensions.push('.ts', '.tsx', 'scss');
  storybookBaseConfig.resolve.modules.unshift(resolve(config.source_path))
  return storybookBaseConfig
}

