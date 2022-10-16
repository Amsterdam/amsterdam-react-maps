import type { StorybookConfig } from '@storybook/core-common'

const maxAssetSize = 1024 * 1024 * 20

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config, { configType }) => {
    config.performance = {
      hints: false,
      maxAssetSize: maxAssetSize,
    }

    // Return the altered config
    return config
  },
}

module.exports = config
