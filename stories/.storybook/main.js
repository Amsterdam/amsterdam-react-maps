const path = require('path')
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')

const packages = path.resolve(__dirname, '../../', 'packages')
const stories = path.resolve(__dirname, '../', 'src')
module.exports = {
  stories: ['../src/**/*.stories.(tsx|mdx)'],
  addons: [
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-docs/register',
    '@storybook/addon-viewport/register',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(stories|story)\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-react-jsx'],
            presets: ['@babel/preset-env'],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {
            compilers: [createCompiler({})],
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [stories, packages],
      use: [
        {
          loader: 'ts-loader',
        },
      ],
    })

    config.resolve.extensions.push('.ts', '.tsx')

    // Resolve every package to it's src directory
    Object.assign(config.resolve.alias, {
      '@datapunt/arm-core': path.join(packages, 'arm-core', '/src'),
      '@datapunt/arm-cluster': path.join(packages, 'arm-cluster', '/src'),
      '@datapunt/arm-draw': path.join(packages, 'arm-draw', '/src'),
      '@datapunt/arm-nontiled': path.join(packages, 'arm-nontiled', '/src'),
    })

    return config
  },
}
