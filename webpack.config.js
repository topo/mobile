const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const manifest = {
  name: "Topolitique",
  short_name:"TOPO",
  description:"Média étudiant de l'Université de Genève",
  background_color:"#C30E00",
  crossorigin:"use-credentials",

}

module.exports = {
  entry: './src/index.js',
  output:{
    path:path.resolve(__dirname),
    filename:'[chunkhash].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
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
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],

  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.join(__dirname, 'src', 'index.html'),
      filename:path.join(__dirname, 'index.html')
    }),
    new WebpackPwaManifest(manifest)
  ]
}
