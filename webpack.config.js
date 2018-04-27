'use strict';

var path = require('path');
var webpack = require('webpack');
 
const autoprefixer = require('autoprefixer')

module.exports = {
  // context: __dirname + '/src',
  entry: [
    // 'webpack-hot-middleware/client?reload=true',
    './src/app.js'
  ],
  output: { 
    path: path.join(__dirname, '/public/'), 
    filename: 'bundle.js' 
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy', 'babel-plugin-transform-object-rest-spread'],
        }
      },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [autoprefixer]
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ]
  }, 
};