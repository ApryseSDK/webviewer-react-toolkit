import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';
import { Toast } from '../Toast';
import readme from './README.md';

export default { title: 'Components/Toast', component: Toast, parameters: { readme } };

export const Basic = () => (
  <Toast
    toastType={select('toastType', ['info', 'success', 'warning', 'error'], 'info')}
    heading={text('heading', 'Key information about the toast')}
    onClose={boolean('has onClose', false) ? action('onClose') : undefined}
    action={boolean('has action', false) ? { text: 'Action', onClick: action('action.onClick') } : undefined}
  >
    {text('children', 'The optional body contains more details about the toast.')}
  </Toast>
);
