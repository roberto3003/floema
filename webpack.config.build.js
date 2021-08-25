const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { merge } = require('webpakc-merge')
const config = require('./webpack.config')

module.exports = merge(config, {

  mode: 'production',
  output: {
	path: path.join(_dirname, 'public')
  },
 
  plugins: [
	new CleanWebpackPlugin()
  ]
})
