const withImages = require('next-images')
require('dotenv').config()
const webpack = require('webpack')

module.exports = withImages({
  webpack: (config, options) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return Object.assign(config, {
      node: config.isServer ? undefined : { fs: 'empty' },
    })
  }
})