import { create } from '@storybook/theming';

/* prettier-ignore */
const colors = {
  // Theme color variables
  colorBrandPrimary:     '#f13e5f',
  colorBrandSecondary:   '#333d51',
  monochromaticLight:    '#fff',
  monochromaticMidLight: '#f6f8fa',
  monochromaticMid:      '#eef2f5',
  monochromaticMidDark:  '#202734',
  monochromaticDark:     '#333d51',

  // Validation color variables
  validationNeutral:     '#2196f3',
  validationSuccess:     '#71d420',
  validationWarning:     '#ff8c00',
  validationError:       '#f13e5f',

  // Font color variables
  fontColorLight:        '#fff',
  fontColorMid:          '#828b9d',
  fontColorDark:         '#333d51',
}

export default create({
  // Theme base
  base: 'light',

  // Size of underlay grid
  gridCellSize: 8,

  // Main colors
  colorPrimary: colors.colorBrandPrimary,
  colorSecondary: colors.colorBrandPrimary,

  // UI
  appBg: 'white',
  appContentBg: colors.monochromaticMid,
  appBorderColor: colors.monochromaticDark,
  appBorderRadius: 5,

  // Typography
  fontBase: '"Montserrat", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: colors.fontColorDark,
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: colors.fontColorLight,
  barSelectedColor: colors.colorBrandPrimary,
  barBg: colors.colorBrandSecondary,

  // Form colors
  inputBg: colors.monochromaticLight,
  inputBorder: colors.validationNeutral,
  inputTextColor: colors.fontColorDark,
  inputBorderRadius: 5,

  // Branding
  brandTitle: `${require('../package.json').version}`,
  brandUrl: 'https://github.com/webnifico/exploration-storybook',
  brandImage: undefined,
});
