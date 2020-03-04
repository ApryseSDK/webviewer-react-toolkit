import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';
import { CommonToastProps, useToast } from '../../hooks';
import { integer } from '../../storybook-helpers/knobs/integer';
import { Button } from '../Button';
import { ToastProps } from '../Toast';
import { ToastProvider } from '../ToastProvider';
import readme from './README.md';

export default { title: 'Components/ToastProvider', component: ToastProvider, parameters: { readme } };

const DemoButtons = () => {
  const toast = useToast();
  const children = text('children', '', 'ToastContext.add');
  const hasAction = boolean('has action', false, 'ToastContext.add');
  const closable = boolean('closable', true, 'ToastContext.add');
  const hasTimeout = boolean('has timeout', false, 'ToastContext.add');
  const timeout = hasTimeout ? integer('timeout', 0, 'ToastContext.add') : undefined;

  const pushToast = (message: ToastProps['message']) => {
    toast.add({
      heading: `A new ${message} toast`,
      children,
      message,
      action: hasAction ? { text: 'Fire Alert', onClick: () => alert('Fired action.') } : undefined,
      closable,
      timeout,
    });
  };

  return (
    <div style={{ display: 'grid', justifyContent: 'center', gap: 8 }}>
      <Button onClick={() => pushToast('info')}>Add info Toast</Button>
      <Button onClick={() => pushToast('success')}>Add success Toast</Button>
      <Button onClick={() => pushToast('warning')}>Add warning Toast</Button>
      <Button onClick={() => pushToast('error')}>Add error Toast</Button>
      <Button buttonStyle="outline" onClick={() => toast.remove()}>
        Pop current Toast
      </Button>
    </div>
  );
};

export const Basic = () => (
  <ToastProvider
    defaultTimeout={integer('defaultTimeout', 3000, 'ToastProvider')}
    noTimeout={
      (select(
        'noTimeout',
        ['', 'info', 'success', 'warning', 'error'],
        '',
        'ToastProvider',
      ) as CommonToastProps['message']) || undefined
    }
  >
    <DemoButtons />
  </ToastProvider>
);
