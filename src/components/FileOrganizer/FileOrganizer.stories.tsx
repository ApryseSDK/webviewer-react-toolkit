import { action } from '@storybook/addon-actions';
import React, { useCallback, useState, useEffect, FC } from 'react';
import { File } from '../../hooks/useFile';
import FileOrganizer, { FileOrganizerProps } from '../FileOrganizer';
import Thumbnail from '../Thumbnail';
import docs from './README.md';
import { number, boolean } from '@storybook/addon-knobs';
import { createFile } from '../../storybook-helpers/data/files';
import { forwardAction } from '../../storybook-helpers/knobs/forwardAction';

export default { title: 'FileOrganizer', parameters: { info: docs } };

export const Basic: FC<{ numFiles: number }> = () => {
  const [files, setFiles] = useState<File[]>([]);

  const numFiles = number('number of pages', 2);
  useEffect(() => {
    setFiles(prev => {
      if (prev.length > numFiles) {
        return prev.slice(0, numFiles);
      }
      if (prev.length < numFiles) {
        const newFiles = [];
        for (let index = prev.length; index < numFiles; index++) {
          newFiles.push(createFile(index));
        }
        return [...prev, ...newFiles];
      }
      return prev;
    });
  }, [numFiles]);

  const handleOnMove = useCallback<NonNullable<FileOrganizerProps['onMove']>>((fromIndex, toIndex) => {
    setFiles(prev => {
      const clone = prev.slice();
      const item = clone.splice(fromIndex, 1)[0];
      clone.splice(toIndex, 0, item);
      return clone;
    });
  }, []);

  return (
    <FileOrganizer
      files={files}
      onMove={forwardAction('onMove', handleOnMove)}
      preventArrowsToMove={boolean('preventArrowsToMove', false)}
      onRenderThumbnail={({ file, isDragging, otherDragging, setEditing, index }) => (
        <Thumbnail
          file={file}
          dragging={isDragging}
          otherDragging={otherDragging}
          onClick={action(`file_${index + 1} onClick`)}
          onRename={action(`file_${index + 1} onRename`)}
          onRemove={action(`file_${index + 1} onRemove`)}
          onRotate={action(`file_${index + 1} onRotate`)}
          onEditChanged={forwardAction(`file_${index + 1} onEditChanged`, setEditing)}
        />
      )}
    />
  );
};
