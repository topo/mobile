const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output:{
    path:path.resolve(__dirname, 'build'),
    filename:'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 9001
  },
  module: {
    rules: [
      {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
    ],

  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.join(__dirname, 'src', 'index.html'),
      filename:path.join(__dirname, 'index.html')
    }),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'topo-mobile',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: false,
        navigateFallback: path.resolve(__dirname,'index.html'),
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    ),
  ]
}
