const withImages = require('next-images')
module.exports = withImages({
  webpack: (config, options) =>
    Object.assign(config, {
      node: config.isServer ? undefined : { fs: 'empty' },
    }),
})