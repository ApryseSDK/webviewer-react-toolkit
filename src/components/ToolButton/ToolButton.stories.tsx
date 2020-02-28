import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';
import { Icon } from '../Icon';
import { ToolButton } from '../ToolButton';
import readme from './README.md';

export default { title: 'Components/ToolButton', component: ToolButton, parameters: { readme } };

export const Basic = () => (
  <ToolButton
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
    expandProps={
      boolean('has expandProps?', false)
        ? {
            position: select('expandProps.position', ['bottom', 'right'], 'bottom'),
            onClick: action('expandProps.onClick'),
          }
        : undefined
    }
  >
    <Icon icon="RotateRight" />
  </ToolButton>
);
