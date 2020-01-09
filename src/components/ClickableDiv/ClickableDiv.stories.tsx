import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import ClickableDiv from '../ClickableDiv';
import docs from './README.md';

export default { title: 'ClickableDiv', component: ClickableDiv, parameters: { info: docs } };

export const basic = () => (
  <ClickableDiv
    disabled={boolean('disabled', false)}
    noFocusStyle={boolean('noFocusStyle', false)}
    usePointer={boolean('usePointer', false)}
    onClick={action('onClick')}
  >
    {text('children', 'This is a clickable div!')}
  </ClickableDiv>
);
