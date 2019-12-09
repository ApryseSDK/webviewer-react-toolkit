import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { enumSelect } from '../../storybook-helpers/knobs/enumSelect';
import Button, { ButtonStyle } from '../Button';
import docs from './README.md';

export default { title: 'Button', parameters: { info: docs } };

export const basic = () => (
  <Button
    buttonStyle={enumSelect('buttonStyle', { ButtonStyle }, ButtonStyle.Default)}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  >
    {text('children', 'Button content')}
  </Button>
);
