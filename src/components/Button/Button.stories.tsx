import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';
import { Button } from '../Button';
import info from './README.md';

export default { title: 'Components/Button', component: Button, parameters: { info } };

export const Basic = () => (
  <Button
    buttonStyle={select('buttonStyle', ['default', 'borderless', 'outline'], 'default')}
    buttonSize={select('buttonSize', ['small', 'default', 'large'], 'default')}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  >
    {text('children', 'Button content')}
  </Button>
);
