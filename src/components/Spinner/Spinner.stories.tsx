import { select } from '@storybook/addon-knobs';
import React from 'react';
import Spinner from '../Spinner';
import docs from './README.md';

export default { title: 'Spinner', component: Spinner, parameters: { info: docs } };

export const basic = () => (
  <Spinner spinnerSize={select('spinnerSize', ['tiny', 'small', 'default', 'large'], 'default')} />
);
