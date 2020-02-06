const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: ['./example/src/index.tsx'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|ico|json)$/i,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'example/public'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: './example/public/index.html',
    }),
  ],
}
