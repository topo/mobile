const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

module.exports = {
  entry: './src/index.js',
  output:{
    path:(isDevServer) ? path.resolve(__dirname) : path.resolve(__dirname, 'build'),
    filename:'bundle-[hash].js',
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
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
      filename:path.join(__dirname, 'index.html'),
      alwaysWriteToDisk: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackHarddiskPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode:'static',
      openAnalyzer:false,
      reportFilename:path.join(__dirname, 'reports','bundle-analyser.html')
    })
  ]
}
