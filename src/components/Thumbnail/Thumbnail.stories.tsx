import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import Thumbnail from '../Thumbnail';
import docs from './README.md';
import { createFile } from '../../storybook-helpers/data/files';

export default { title: 'Thumbnail', parameters: { info: docs } };

export const basic = () => (
  <Thumbnail
    file={boolean('is fetching thumbnail?', false) ? createFile(0, true) : createFile(0)}
    selected={boolean('selected', false)}
    hideExtension={boolean('hideExtension', false)}
    disabled={boolean('disabled', false)}
    onClick={boolean('has onClick', true) ? action('onClick') : undefined}
    onRename={boolean('has onRename', true) ? action('onRename') : undefined}
    onRemove={boolean('has onRemove', true) ? action('onRemove') : undefined}
    onRotate={boolean('has onRotate', true) ? action('onRotate') : undefined}
  />
);

export const withLabel = () => (
  <Thumbnail
    file={boolean('is fetching thumbnail?', false) ? createFile(0, true) : createFile(0)}
    label={text('label', 'some_label')}
    selected={boolean('selected', false)}
    hideExtension={boolean('hideExtension', false)}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
    onRename={action('onRename')}
    onRemove={action('onRemove')}
    onRotate={action('onRotate')}
  />
);

export const rotated = () => (
  <Thumbnail
    file={boolean('is fetching thumbnail?', false) ? createFile(1, true) : createFile(1)}
    selected={boolean('selected', false)}
    hideExtension={boolean('hideExtension', false)}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
    onRename={action('onRename')}
    onRemove={action('onRemove')}
    onRotate={action('onRotate')}
  />
);
