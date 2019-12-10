import React from 'react';
import { enumSelect } from '../../storybook-helpers/knobs/enumSelect';
import Spinner, { SpinnerSize, SpinnerStyle } from '../Spinner';
import docs from './README.md';

export default { title: 'Spinner', parameters: { info: docs } };

export const basic = () => (
  <Spinner
    spinnerStyle={enumSelect('spinnerStyle', { SpinnerStyle }, SpinnerStyle.Default)}
    spinnerSize={enumSelect('spinnerSize', { SpinnerSize }, SpinnerSize.Default)}
  />
);
