import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import Thumbnail from '../Thumbnail';
import docs from './README.md';
import { createFile } from '../../storybook-helpers/data/files';

export default { title: 'Thumbnail', parameters: { info: docs } };

export const basic = () => (
  <Thumbnail
    file={boolean('is fetching thumbnail?', false) ? createFile(0, true) : createFile(0)}
    selected={boolean('selected', false)}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  />
);

export const rotated = () => (
  <Thumbnail
    file={boolean('is fetching thumbnail?', false) ? createFile(1, true) : createFile(1)}
    selected={boolean('selected', false)}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  />
);
