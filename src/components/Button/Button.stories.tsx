import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';
import { action } from '../../storybook-helpers/action/action';
import { Button } from '../Button';
import readme from './README.md';

export default { title: 'Components/Button', component: Button, parameters: { readme } };

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
