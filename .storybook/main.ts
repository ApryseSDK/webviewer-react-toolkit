const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.*'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    '@storybook/addon-google-analytics',
  ],
  webpackFinal: async (config: any) => {
    // Sass support with post-css for vendor prefixes.
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
  presets: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: { ignoreDiagnostics: [7005] },
        include: [path.resolve(__dirname, '../')],
      },
    },
  ],
};
