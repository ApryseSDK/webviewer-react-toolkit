const path = require('path');

module.exports = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-docs',
  ],
  presets: [
    '@storybook/preset-scss',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: { ignoreDiagnostics: [7005] },
        include: [path.resolve(__dirname, '../')],
      },
    },
  ],
};
