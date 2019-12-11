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
  appBorderRadius: 4,

  // Typography
  // fontBase: 'monospace',
  // fontCode: 'monospace',

  // // Text colors
  textColor: 'rgba(240, 240, 255, 0.9)',
  textInverseColor: 'rgba(0, 0, 20, 0.9)',

  // Toolbar default and active colors
  barTextColor: 'rgba(240, 240, 255, 0.6)',
  barSelectedColor: '#00a3e3',
  // barBg: 'white',

  // // Form colors
  // inputBg: 'white',
  // inputBorder: 'white',
  inputTextColor: 'rgba(240, 240, 255, 0.9)',
  inputBorderRadius: 4,

  // Branding
  brandTitle: `${require('../package.json').version}`,
  brandUrl: 'https://github.com/PDFTron/component-library',
  brandImage: logo,
});
