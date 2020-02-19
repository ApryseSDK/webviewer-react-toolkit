import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import readme from './README.md';

export default { title: 'Components/Modal', component: Modal, parameters: { readme } };

export const Basic = () => (
  <Modal
    open={boolean('open', true)}
    closeOnBackgroundClick={boolean('closeOnBackgroundClick', false)}
    closeOnEscape={boolean('closeOnEscape', false)}
    heading={text('heading', 'Modal heading') || 'There must be some header!'}
    onClose={boolean('has onClose', true) ? action('onClose') : undefined}
  >
    {text(
      'children',
      'Modal children contains the description of what the modal is shown for. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua.',
    ) || 'There must be some child!'}
  </Modal>
);

export const WithButtonGroup = () => (
  <Modal
    open={boolean('open', true)}
    closeOnBackgroundClick={boolean('closeOnBackgroundClick', false)}
    closeOnEscape={boolean('closeOnEscape', false)}
    heading={text('heading', 'Modal heading') || 'There must be some header!'}
    onClose={boolean('has onClose', true) ? action('onClose') : undefined}
    buttonGroup={
      <>
        <Button key="1">Accept</Button>
        <Button key="2" buttonStyle="outline">
          Cancel
        </Button>
      </>
    }
  >
    {text(
      'children',
      'Modal children contains the description of what the modal is shown for. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
        'tempor incididunt ut labore et dolore magna aliqua.',
    ) || 'There must be some child!'}
  </Modal>
);
