import { create } from '@storybook/theming';
// @ts-ignore
import logo from './logo.png';

export default create({
  // Theme base
  base: 'dark',

  // Size of underlay grid
  // gridCellSize: 8,

  // Main colors
  colorPrimary: '#00a3e3',
  colorSecondary: '#00a3e3',

  // UI
  // appBg: 'white',
  // appContentBg: 'white',
  // appBorderColor: 'white',
  // appBorderRadius: 25,

  // Typography
  // fontBase: 'monospace',
  // fontCode: 'monospace',

  // // Text colors
  // textColor: textColor,
  // textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  // barTextColor: 'white',
  barSelectedColor: '#00a3e3',
  // barBg: 'white',

  // // Form colors
  // inputBg: 'white',
  // inputBorder: 'white',
  // inputTextColor: 'white',
  // inputBorderRadius: 0,

  // Branding
  brandTitle: `${require('../package.json').version}`,
  brandUrl: 'https://github.com/PDFTron/component-library',
  brandImage: logo,
});
