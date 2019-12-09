import { create } from '@storybook/theming';

export default create({
  // Theme base
  base: 'dark',

  // // Size of underlay grid
  // gridCellSize: 8,

  // // Main colors
  // colorPrimary: colorPrimary,
  // colorSecondary: colorSecondary,

  // // UI
  // appBg: 'white',
  // appContentBg: appContentBg,
  // appBorderColor: appBorderColor,
  // appBorderRadius: 5,

  // // Typography
  // fontBase: fontBase,
  // fontCode: 'monospace',

  // // Text colors
  // textColor: textColor,
  // textInverseColor: 'rgba(255,255,255,0.9)',

  // // Toolbar default and active colors
  // barTextColor: barTextColor,
  // barSelectedColor: barSelectedColor,
  // barBg: barBg,

  // // Form colors
  // inputBg: inputBg,
  // inputBorder: inputBorder,
  // inputTextColor: inputTextColor,
  // inputBorderRadius: 5,

  // // Branding
  brandTitle: `${require('../package.json').version}`,
  brandUrl: 'https://github.com/PDFTron/component-library',
  // brandImage: 'https://avatars3.githubusercontent.com/u/5024656?s=200&v=4',
});
