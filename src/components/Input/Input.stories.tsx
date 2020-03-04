import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import readme from './README.md';

export default { title: 'Components/Input', component: Input, parameters: { readme } };

export const Basic = () => (
  <Input
    type={select('type', ['date', 'email', 'number', 'password', 'search', 'text'], 'text')}
    message={select('message', ['default', 'warning', 'error'], 'default')}
    messageText={text('messageText', '')}
    fillWidth={boolean('fillWidth', false)}
    padMessageText={boolean('padMessageText', false)}
    disabled={boolean('disabled', false)}
    onChange={action('onChange')}
  />
);

export const Controlled = () => (
  <Input
    value={text('value', '')}
    type={select('type', ['date', 'email', 'number', 'password', 'search', 'text'], 'text')}
    message={select('message', ['default', 'warning', 'error'], 'default')}
    messageText={text('messageText', '')}
    fillWidth={boolean('fillWidth', false)}
    padMessageText={boolean('padMessageText', false)}
    disabled={boolean('disabled', false)}
    onChange={action('onChange')}
  />
);

export const SearchExample = () => (
  <Input
    type="search"
    rightElement={
      <IconButton aria-label="Search" onClick={action('IconButton onClick')}>
        <Icon icon="Search" />
      </IconButton>
    }
  />
);

export const PasswordExample = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      message={select('message', ['default', 'warning', 'error'], 'default')}
      messageText={text('messageText', '')}
      rightElement={
        <IconButton
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword(s => !s)}
        >
          <Icon icon={showPassword ? 'Hide' : 'Show'} />
        </IconButton>
      }
    />
  );
};
