import { select } from '@storybook/addon-knobs';
import React from 'react';
import { Spinner } from '../Spinner';
import info from './README.md';

export default { title: 'Components/Spinner', component: Spinner, parameters: { info } };

export const Basic = () => (
  <Spinner spinnerSize={select('spinnerSize', ['tiny', 'small', 'default', 'large'], 'default')} />
);
