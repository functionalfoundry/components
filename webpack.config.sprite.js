var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var SvgStore = require('webpack-svgstore-plugin')

var distPath = path.join(__dirname, 'assets', 'sprite')
var sourcePath = path.join(__dirname, 'assets', 'icons')

var config = {
  output: {
    path: distPath,
    filename: '[name].js',
    chunkFilename: '[chunkhash].[id].js',
    publicPath: '/lib/'
  },

  plugins: [
    new SvgStore(path.join(sourcePath, '*.svg'), path.join('svg'), {
      svg: {
        xmlns: 'http://www.w3.org/2000/svg',
        style: 'position: absolute; width: 0; height: 0'
      },
      name: 'sprite.svg',
      chunk: 'index',
      prefix: '',
      svgoOptions: {}
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js/,
        loaders: ['babel']
      },
    ]
  }
}

module.exports = config
