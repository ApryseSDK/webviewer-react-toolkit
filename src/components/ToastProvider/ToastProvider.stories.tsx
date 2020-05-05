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

  const pushToast = (message: ToastProps['message'], loading?: boolean) => {
    const id = toast.add({
      heading: `A new ${message} toast`,
      children,
      message: loading ? 'loading' : message,
      action: hasAction ? { text: 'Fire Alert', onClick: () => alert('Fired action.') } : undefined,
      closable,
      timeout,
    });

    setTimeout(() => {
      toast.modify(id, { message });
    }, 2000);
  };

  return (
    <div style={{ display: 'grid', justifyContent: 'center', gap: 8 }}>
      <div className="toastprovider__buttons">
        <div>
          <Button onClick={() => pushToast('info')}>Add info Toast</Button>
          <Button onClick={() => pushToast('success')}>Add success Toast</Button>
          <Button onClick={() => pushToast('warning')}>Add warning Toast</Button>
          <Button onClick={() => pushToast('error')}>Add error Toast</Button>
          <Button onClick={() => pushToast('loading')}>Add loading Toast</Button>
        </div>
        <div>
          <Button onClick={() => pushToast('info', true)}>Add delayed info Toast</Button>
          <Button onClick={() => pushToast('success', true)}>Add delayed success Toast</Button>
          <Button onClick={() => pushToast('warning', true)}>Add delayed warning Toast</Button>
          <Button onClick={() => pushToast('error', true)}>Add delayed error Toast</Button>
        </div>
      </div>

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
        ['', 'info', 'success', 'warning', 'error', 'loading'],
        '',
        'ToastProvider',
      ) as CommonToastProps['message']) || undefined
    }
    position={select(
      'position',
      ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'],
      'top-right',
      'ToastProvider',
    )}
    customPadding={boolean('has customPadding', false, 'ToastProvider') ? 100 : undefined}
  >
    <DemoButtons />
  </ToastProvider>
);
