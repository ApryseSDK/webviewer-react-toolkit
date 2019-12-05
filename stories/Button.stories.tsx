import {action} from '@storybook/addon-actions';
import React from 'react';

export default {title: 'Button'};

export const text = () => <button onClick={action('clicked')}>Hello Button</button>;

export const emoji = () => (
  <button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </button>
);
