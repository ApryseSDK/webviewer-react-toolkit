import {Options as InfoOptions, withInfo} from '@storybook/addon-info';
import {withKnobs} from '@storybook/addon-knobs';
import {addDecorator, addParameters, configure} from '@storybook/react';
import {InfoStyle} from './InfoStyle';
import TableComponent from './TableComponent';
import Theme from './Theme';

import './style.scss';
import '../src/index.scss';

/**
 * Add global decorators.
 */

// https://www.npmjs.com/package/@storybook/addon-info#options-and-defaults
addDecorator(
  withInfo({
    header: false,
    TableComponent,
    maxPropsIntoLine: 1, // Wrap props if more than one
    styles: InfoStyle,
    // inline: true,
  } as InfoOptions) as any,
);
addDecorator(withKnobs);

/**
 * Add global parameters.
 * @see https://storybook.js.org/docs/configurations/options-parameter/#global-options
 */

// @ts-ignore (types are broken)
addParameters({
  options: {theme: Theme, panelPosition: 'right'},
  backgrounds: [{name: 'white', value: '#fff'}],
});

/**
 * Import stories.
 */

// Automatically import all files ending in *.stories.tsx
configure(require.context('../src', true, /\.stories\.tsx$/), module);
