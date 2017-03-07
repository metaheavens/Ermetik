'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const {extractor, production} = require('./webpack.vars')
const pkg = require(path.resolve(__dirname, '../package.json'))

module.exports = {
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.css']
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: extractor.extract({ 
          fallback :'style-loader',
          use:"css-loader"
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.ejs'),
      title: pkg.name,
      inject: 'head',
      minify: {
        collapseWhitespace: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    extractor
  ]
}