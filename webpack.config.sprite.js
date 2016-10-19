var path = require('path')
var webpack = require('webpack')
var SvgStore = require('webpack-svgstore-plugin')

var sourcePath = path.join(__dirname, 'assets', 'icons')
var distPath = path.join(__dirname, 'assets', 'sprite', 'svg')

var config = {
  output: {
    path: distPath,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new SvgStore(path.join(sourcePath, '*.svg'), '', {
      name: 'sprite.svg',
      prefix: '',
      svgoOptions: {}
    })
  ]
}

module.exports = config
