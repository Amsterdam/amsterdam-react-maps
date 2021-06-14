const maxAssetSize = 1024 * 1024 * 20;

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
  ],
  webpackFinal: async (config, { configType }) => {

    config.performance = {
      hints: false,
      maxAssetSize: maxAssetSize
    }
 
    // Return the altered config
    return config;
  },
}
