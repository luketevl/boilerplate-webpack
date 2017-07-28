const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ImageminPlugin = require('imagemin-webpack-plugin');
const path = require('path');
const  ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: ['./source/js/app.js', './source/scss/main.scss'],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  module: {

    rules: [
      
      /*
      your other rules for JavaScript transpiling go in here
      */
      { // regular css files
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1&minimize',
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract(['css-loader?minimize', 'sass-loader'])
      },
       {
        test: /\.(png|jpg)$/,
        use: 'file-loader',
        include: path.join(__dirname, 'source'),
        },

         {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          { loader: 'file-loader' }
        ]
      }
    ]
  },
  resolve:{
    alias:{
      'images': path.resolve(__dirname, 'source/images'),
      'fonts': path.resolve(__dirname, 'source/fonts')
    }
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: '[name].bundle.css',
      allChunks: true,
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '95-100'
      }
    })
    // new ImageminPlugin({ test: 'images/**' }),
  ],
};