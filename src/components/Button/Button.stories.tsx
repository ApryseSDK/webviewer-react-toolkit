import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import Button from '../Button';
import docs from './README.md';

export default { title: 'Button', info: docs };

export const basic = () => (
  <Button
    someProp={text('someProp', 'Hello, World!')}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  />
);
