import { boolean } from '@storybook/addon-knobs';
import React, { useCallback, useState } from 'react';
import { File } from '../../hooks/useFile';
import testPdfThumbnailRotated from '../../storybook-helpers/images/pdf-preview-2.png';
import testPdfThumbnail from '../../storybook-helpers/images/pdf-preview.png';
import PageOrganizer from '../PageOrganizer';
import Thumbnail from '../Thumbnail';
import docs from './README.md';

export default { title: 'PageOrganizer', parameters: { info: docs } };

const file: File = {
  id: 'file_1',
  name: 'file_1',
  extension: 'pdf',
  originalName: 'file_1',
  thumbnail: testPdfThumbnail,
};

const fileRotated: File = {
  id: 'file_2',
  name: 'file_2',
  extension: 'pdf',
  originalName: 'file_2',
  thumbnail: testPdfThumbnailRotated,
};

export const Basic = () => {
  const [files, setFiles] = useState([file, fileRotated]);

  const handleOnMove = useCallback((fromIndex: number, toIndex: number) => {
    setFiles(prev => {
      console.log('hey');
      const clone = prev.slice();
      const item = clone.splice(fromIndex, 1)[0];
      clone.splice(toIndex, 0, item);
      console.log();
      return clone;
    });
  }, []);

  return (
    <PageOrganizer
      files={files}
      onMove={handleOnMove}
      selected={boolean('has selected files', false) ? [file.id, fileRotated.id] : undefined}
      onRenderThumbnail={({ file, isSelected, isDragging }) => (
        <Thumbnail file={file} selected={isSelected} style={isDragging ? { opacity: 0.4 } : undefined} />
      )}
    />
  );
};
