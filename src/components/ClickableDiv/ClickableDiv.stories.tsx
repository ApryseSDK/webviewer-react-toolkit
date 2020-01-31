import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { ClickableDiv } from '../ClickableDiv';
import info from './README.md';

export default { title: 'Components/ClickableDiv', component: ClickableDiv, parameters: { info } };

export const Basic = () => (
  <ClickableDiv
    disabled={boolean('disabled', false)}
    noFocusStyle={boolean('noFocusStyle', false)}
    usePointer={boolean('usePointer', false)}
    onClick={action('onClick')}
  >
    {text('children', 'This is a clickable div!')}
  </ClickableDiv>
);
