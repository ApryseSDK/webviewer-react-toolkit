import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { createFile, CreateFileOptions, FakeFile } from '../../storybook-helpers/data/files';
import { Icon } from '../Icon';
import { Thumbnail, ThumbnailProps } from '../Thumbnail';
import readme from './README.md';

export default { title: 'Components/Thumbnail', component: Thumbnail, parameters: { readme } };

const defaultProps = (options?: CreateFileOptions, index = 0, withToolButtons?: boolean): ThumbnailProps<FakeFile> => ({
  file: createFile(index, options),
  selected: boolean('selected', false),
  disabled: boolean('disabled', false),
  dragging: boolean('dragging', false),
  otherDragging: boolean('otherDragging', false),
  onClick: boolean('has onClick', true) ? action('onClick') : undefined,
  onRename: boolean('has onRename', true) ? action('onRename') : undefined,
  buttonProps: withToolButtons
    ? [
        { children: <Icon icon="RotateRight" />, onClick: action('rotate onClick'), key: 0 },
        { children: <Icon icon="Close" />, onClick: action('close onClick'), key: 1 },
      ]
    : undefined,
});

export const Basic = () => <Thumbnail {...defaultProps()} />;

export const Throttled = () => <Thumbnail {...defaultProps({ lazy: true })} />;

export const Pending = () => <Thumbnail {...defaultProps({ pending: true })} />;

export const WithToolButtons = () => <Thumbnail {...defaultProps(undefined, undefined, true)} />;

export const WithLabel = () => <Thumbnail label={text('label', 'some_label')} {...defaultProps()} />;

export const WithSelectedIcon = () => (
  <Thumbnail
    {...defaultProps()}
    selectedIcon={<div style={{ color: 'red', fontSize: 20 }}>{text('selectedIcon', 'Selected Icon')}</div>}
  />
);

export const Rotated = () => <Thumbnail {...defaultProps(undefined, 1)} />;

export const RotatedThrottled = () => <Thumbnail {...defaultProps({ lazy: true }, 1)} />;
