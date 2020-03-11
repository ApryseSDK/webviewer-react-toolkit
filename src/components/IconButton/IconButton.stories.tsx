import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import { action } from '../../storybook-helpers/action/action';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton';
import readme from './README.md';

export default { title: 'Components/IconButton', component: IconButton, parameters: { readme } };

export const Basic = () => (
  <IconButton disabled={boolean('disabled', false)} onClick={action('onClick')}>
    <Icon icon="Close" />
  </IconButton>
);
