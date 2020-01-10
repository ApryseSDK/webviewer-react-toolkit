import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import close from '../../icons/close-24px.svg';
import rotate from '../../icons/rotate_right-24px.svg';
import { createFile, CreateFileOptions } from '../../storybook-helpers/data/files';
import Thumbnail, { ThumbnailProps } from '../Thumbnail';
import docs from './README.md';

export default { title: 'Thumbnail', component: Thumbnail, parameters: { info: docs } };

const defaultProps = (options?: CreateFileOptions, index = 0, withToolButtons?: boolean): ThumbnailProps => ({
  file: createFile(index, options),
  selected: boolean('selected', false),
  hideExtension: boolean('hideExtension', false),
  disabled: boolean('disabled', false),
  dragging: boolean('dragging', false),
  otherDragging: boolean('otherDragging', false),
  onClick: boolean('has onClick', true) ? action('onClick') : undefined,
  onRename: boolean('has onRename', true) ? action('onRename') : undefined,
  buttonProps: withToolButtons
    ? [
        { children: <img src={rotate} alt={'rotate'} />, onClick: action('rotate onClick') },
        { children: <img src={close} alt={'close'} />, onClick: action('close onClick') },
      ]
    : undefined,
});

export const basic = () => <Thumbnail {...defaultProps()} />;

export const throttled = () => <Thumbnail {...defaultProps({ lazy: true })} />;

export const pending = () => <Thumbnail {...defaultProps({ pending: true })} />;

export const withToolButtons = () => <Thumbnail {...defaultProps(undefined, undefined, true)} />;

export const withLabel = () => <Thumbnail label={text('label', 'some_label')} {...defaultProps()} />;

export const rotated = () => <Thumbnail {...defaultProps(undefined, 1)} />;

export const rotatedThrottled = () => <Thumbnail {...defaultProps({ lazy: true }, 1)} />;
