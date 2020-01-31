import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { ToolButton } from '../ToolButton';
import info from './README.md';

export default { title: 'Components/ToolButton', component: ToolButton, parameters: { info } };

export const Basic = () => (
  <ToolButton disabled={boolean('disabled', false)} onClick={action('onClick')}>
    {text('children', '💥')}
  </ToolButton>
);
