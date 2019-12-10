import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import { File } from '../../hooks/useFile';
import Thumbnail from '../Thumbnail';
import docs from './README.md';

export default { title: 'Thumbnail', parameters: { info: docs } };

const fetchingThumbnail: File = {
  id: 'test',
  name: 'Test name',
  extension: 'pdf',
  originalName: 'Test original name',
};

const fetchedThumbnail: File = {
  id: 'test',
  name: 'Test name',
  extension: 'pdf',
  originalName: 'Test original name',
  thumbnail: 'someThumbnail string',
};

export const basic = () => (
  <Thumbnail
    file={boolean('is fetching thumbnail?', false) ? fetchingThumbnail : fetchedThumbnail}
    selected={boolean('selected', false)}
    onClick={action('onClick')}
  />
);
