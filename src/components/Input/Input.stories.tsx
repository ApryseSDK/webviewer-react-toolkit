import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';
import { Input } from '../Input';
import readme from './README.md';

export default { title: 'Components/Input', component: Input, parameters: { readme } };

export const Basic = () => (
  <Input
    message={select('message', ['default', 'warning', 'error'], 'default')}
    messageText={text('messageText', '')}
    fillWidth={boolean('fillWidth', false)}
    padMessageText={boolean('padMessageText', false)}
    disabled={boolean('disabled', false)}
  />
);
