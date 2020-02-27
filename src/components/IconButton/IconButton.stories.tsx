import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton';
import readme from './README.md';

export default { title: 'Components/IconButton', component: IconButton, parameters: { readme } };

export const Basic = () => (
  <IconButton disabled={boolean('disabled', false)} onClick={action('onClick')}>
    <Icon icon="Close" />
  </IconButton>
);
