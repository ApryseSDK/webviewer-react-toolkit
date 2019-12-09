import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import Thumbnail from '../Thumbnail';

export default { title: 'Thumbnail' };

export const basic = () => (
  <Thumbnail
    someProp={text('someProp', 'Hello, World!')}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  />
);
