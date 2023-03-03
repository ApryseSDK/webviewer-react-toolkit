import { boolean, select, text } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { action } from '../../storybook-helpers/action/action';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import readme from './README.md';
import { Search } from '../../icons';

export default { title: 'Components/Input', component: Input, parameters: { readme } };

const getTypeSelect = () => {
  return select(
    'type',
    [
      'color',
      'date',
      'datetime-local',
      'email',
      // 'file',
      'month',
      'number',
      'password',
      // 'range',
      'search',
      'tel',
      'text',
      'time',
      'url',
      'week',
    ],
    'text',
  );
};

export const Basic = () => (
  <Input
    type={getTypeSelect()}
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
    type={getTypeSelect()}
    message={select('message', ['default', 'warning', 'error'], 'default')}
    messageText={text('messageText', '')}
    fillWidth={boolean('fillWidth', false)}
    padMessageText={boolean('padMessageText', false)}
    disabled={boolean('disabled', false)}
    onChange={action('onChange')}
  />
);

export const SearchExample = () => <Input type="search" leftElement={<Search />} />;

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
