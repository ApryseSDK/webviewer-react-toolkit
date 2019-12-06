import {action} from '@storybook/addon-actions';
import {text, boolean} from '@storybook/addon-knobs';
import React from 'react';
import Button from '../Button';

export default {title: 'Button'};

export const basic = () => (
  <Button disabled={boolean('disabled', false)} onClick={action('onClick')}>
    {text('children', 'Button body')}
  </Button>
);
