import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';
import { action } from '../../storybook-helpers/action/action';
import { Toast } from '../Toast';
import readme from './README.md';

export default { title: 'Components/Toast', component: Toast, parameters: { readme } };

export const Basic = () => (
  <div style={{ display: 'flex' }}>
    <Toast
      message={select('message', ['info', 'success', 'warning', 'error'], 'info')}
      heading={text('heading', 'Information about the toast')}
      onClose={boolean('has onClose', false) ? action('onClose') : undefined}
      action={boolean('has action', false) ? { text: 'Action', onClick: action('action.onClick') } : undefined}
    >
      {text('children', '')}
    </Toast>
  </div>
);
