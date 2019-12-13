import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import { File } from '../../hooks/useFile';
import testPdfThumbnail from '../../storybook-helpers/images/pdf-preview.png';
import testPdfThumbnailRotated from '../../storybook-helpers/images/pdf-preview-2.png';
import Thumbnail from '../Thumbnail';
import docs from './README.md';

export default { title: 'Thumbnail', parameters: { info: docs } };

const filePending: File = {
  id: 'test',
  name: 'test_name',
  extension: 'pdf',
  originalName: 'original_name',
  thumbnail: undefined,
};

const file: File = {
  id: 'test',
  name: 'test_name',
  extension: 'pdf',
  originalName: 'original_name',
  thumbnail: testPdfThumbnail,
};

const fileRotated: File = {
  id: 'test',
  name: 'test_name',
  extension: 'pdf',
  originalName: 'original_name',
  thumbnail: testPdfThumbnailRotated,
};

export const basic = () => (
  <Thumbnail
    file={boolean('is fetching thumbnail?', false) ? filePending : file}
    selected={boolean('selected', false)}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  />
);

export const rotated = () => (
  <Thumbnail
    file={boolean('is fetching thumbnail?', false) ? filePending : fileRotated}
    selected={boolean('selected', false)}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  />
);
