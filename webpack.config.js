const path = require('path')

const webpack = require('webpack')

const CopyPlugin = require('copy-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const dirApp = path.join(__dirname, 'app')
const dirShared = path.join(__dirname, 'shared')
const dirStyles = path.join(__dirname, 'styles')
const dirNode = 'node_modules'

module.exports = {
  entry: [
	path.join(dirApp, 'index.js'),
	path.join(dirStyles, 'index.scss')
  ],

  resolve: {
	modules: [
	  dirApp,
	  dirStyles,
	  dirShared,
	  dirNode
	]
  },
  plugins: [
	new webpack.DefinePlugin({
	  IS_DEVELOPMENT
	}),
	new CopyPlugin({
	  patterns: [
		{
		  from: 'shared',
		  to: ''
		}
	  ]
	}),
	new MiniCssExtractPlugin({
	  filename: '[name].css',
	  chunkFilename: '[id].css'
	})
  ],
  module: {
	rules: [
	  {
		test: /\.js$/,
		use: {
		  loader: 'babel-loader'
		}
	  },
	  {
		test: /\.scss$/,
		use: [
		  {loader: MiniCssExtractPlugin.loader,
			options: {
			  publicPath: ''
			}
		  },
		  {
			loader: 'css-loader'
		  },
		  {
			loader: 'postcss-loader'
		  },
		  {
			loader: 'sass-loader'
		  }
		]
	  },
	  {
		test: /\.(jpe?g|png|gif|svg|wof2?|fnt|webp)$/,
		loader: 'file-loader',
		options: {
		 name (file) {
			return '[hash]'
		  }
		}
	  }
	]
  }
}
