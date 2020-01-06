import { Options as InfoOptions, withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import '../src/index.scss';
import { InfoStyle } from './InfoStyle';
import './style.scss';
import TableComponent from './TableComponent';
import Theme from './Theme';

/**
 * Add global decorators.
 */

// https://www.npmjs.com/package/@storybook/addon-info#options-and-defaults
addDecorator(
  withInfo({
    header: false,
    TableComponent,
    maxPropsIntoLine: 2, // Wrap props if more than one
    styles: InfoStyle,
    inline: true,
  } as InfoOptions) as any,
);
addDecorator(withKnobs);

/**
 * Add global parameters.
 * @see https://storybook.js.org/docs/configurations/options-parameter/#global-options
 */

// @ts-ignore (types are broken)
addParameters({
  options: { theme: Theme, panelPosition: 'right' },
  backgrounds: [
    { name: 'canvas', value: '#eff5f5', default: true },
    { name: 'white', value: '#fff' },
    { name: 'dark-canvas', value: '#161625' },
  ],
});

/**
 * Import stories.
 */

// Automatically import all files ending in *.stories.tsx
configure(require.context('../src', true, /\.stories\.tsx$/), module);
