const CheckerPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const dist = path.resolve(__dirname, 'dist')

module.exports = {
  entry: {
    app: ['./example/src/index.tsx'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'source-map',
  output: {
    filename: 'app.[id].js',
    path: dist,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: {
                plugins: [
                  { removeViewBox: false },
                  { removeDimensions: true },
                  { removeDoctype: true },
                  { removeComments: true },
                  { removeMetadata: true },
                  { removeEditorsNSData: true },
                  { cleanupIDs: true },
                  { removeRasterImages: true },
                  { removeUselessDefs: true },
                  { removeUnknownsAndDefaults: true },
                  { removeUselessStrokeAndFill: true },
                  { removeHiddenElems: true },
                  { removeEmptyText: true },
                  { removeEmptyAttrs: true },
                  { removeEmptyContainers: true },
                  { removeUnusedNS: true },
                  { removeDesc: true },
                  { prefixIds: true },
                ],
              },
            },
          },
          'url-loader',
        ],
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
    port: 3001,
    historyApiFallback: true,
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: './example/public/index.html',
    }),
  ],
}
