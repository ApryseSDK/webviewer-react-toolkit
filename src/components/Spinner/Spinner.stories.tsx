import { select } from '@storybook/addon-knobs';
import React from 'react';
import { Spinner } from '../Spinner';
import readme from './README.md';

export default { title: 'Components/Spinner', component: Spinner, parameters: { readme } };

export const Basic = () => (
  <Spinner spinnerSize={select('spinnerSize', ['tiny', 'small', 'default', 'large'], 'default')} />
);
