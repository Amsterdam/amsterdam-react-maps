const CheckerPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const dist = path.resolve(__dirname, 'dist')

const modernModules = [
  path.resolve(__dirname, 'node_modules/@datapunt/asc-assets'),
  path.resolve(__dirname, 'node_modules/@datapunt/asc-ui'),
  path.resolve(__dirname, 'node_modules/@datapunt/react-maps'),
  path.resolve(__dirname, 'packages/arm-core'),
  path.resolve(__dirname, 'packages/arm-draw'),
  path.resolve(__dirname, 'packages/arm-nontiled'),
  path.resolve(__dirname, 'packages/arm-cluster'),
]
const srcPath = path.resolve(__dirname, 'examples')
module.exports = {
  entry: {
    app: ['./examples/src/index.tsx'],
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
        test: /\.(j|t)sx?$/,
        include: [srcPath, ...modernModules],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: {
                      esmodules: false,
                    },
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                [
                  'babel-plugin-styled-components',
                  {
                    pure: true,
                  },
                ],
              ],
            },
          },
        ],
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
      template: './examples/public/index.html',
    }),
  ],
}
