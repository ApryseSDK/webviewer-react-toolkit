import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { File } from '../../data/file';
import useManagedFiles from '../../hooks/useManagedFiles';
import { createFile } from '../../storybook-helpers/data/files';
import { forwardAction } from '../../storybook-helpers/knobs/forwardAction';
import FileOrganizer, { FileOrganizerProps } from '../FileOrganizer';
import Thumbnail from '../Thumbnail';
import ThumbnailDragLayer from '../ThumbnailDragLayer';
import docs from './README.md';

export default { title: 'FileOrganizer', parameters: { info: docs } };

function useCommonFileOrganizer() {
  // This is the index organizing function.
  const [files, setFiles] = useState<File[]>([]);
  const handleOnMove = useCallback<NonNullable<FileOrganizerProps['onMove']>>((fromIndex, toIndex) => {
    setFiles(prev => {
      const clone = prev.slice();
      const item = clone.splice(fromIndex, 1)[0];
      clone.splice(toIndex, 0, item);
      return clone;
    });
  }, []);

  // This is just a helper for adding or removing files.
  const numFiles = number('number of files', 2, { min: 0, max: 16, step: 1, range: true });
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

  return { files, handleOnMove };
}

export const Basic = () => {
  const { files, handleOnMove } = useCommonFileOrganizer();

  return (
    <FileOrganizer
      style={{ height: '70vh', margin: -32 }}
      files={files}
      onMove={forwardAction('onMove', handleOnMove)}
      preventArrowsToMove={boolean('preventArrowsToMove', false)}
      disableMove={boolean('disableMove', false)}
      onDragChange={action('onDragChange')}
      onRenderThumbnail={({ file, isDragging, otherDragging, onEditingChange, index }) => (
        <Thumbnail
          file={file}
          dragging={isDragging}
          otherDragging={otherDragging}
          onClick={action(`file_${index + 1} onClick`)}
          onRename={action(`file_${index + 1} onRename`)}
          onRemove={action(`file_${index + 1} onRemove`)}
          onRotate={action(`file_${index + 1} onRotate`)}
          onEditingChange={forwardAction(`file_${index + 1} onEditingChange`, onEditingChange)}
        />
      )}
    />
  );
};

export const WithCustomDragLayer = () => {
  const { files, handleOnMove } = useCommonFileOrganizer();

  return (
    <FileOrganizer
      style={{ height: '70vh', margin: -32 }}
      files={files}
      onMove={forwardAction('onMove', handleOnMove)}
      preventArrowsToMove={boolean('preventArrowsToMove', false)}
      disableMove={boolean('disableMove', false)}
      onDragChange={action('onDragChange')}
      onRenderThumbnail={({ file, isDragging, otherDragging, onEditingChange, index }) => (
        <Thumbnail
          file={file}
          dragging={isDragging}
          otherDragging={otherDragging}
          onClick={action(`file_${index + 1} onClick`)}
          onRename={action(`file_${index + 1} onRename`)}
          onRemove={action(`file_${index + 1} onRemove`)}
          onRotate={action(`file_${index + 1} onRotate`)}
          onEditingChange={forwardAction(`file_${index + 1} onEditingChange`, onEditingChange)}
        />
      )}
      onRenderDragLayer={() => <ThumbnailDragLayer />}
    />
  );
};

const VirtualizedExample: FC<{ lazy?: boolean; numFiles?: number }> = ({ lazy, numFiles }) => {
  // This is the index organizing function.
  const [files, setFiles] = useState<File[]>(() =>
    Array.from({ length: 1000 }, (_, index) => createFile(index, { lazy })),
  );
  const handleOnMove = useCallback<NonNullable<FileOrganizerProps['onMove']>>((fromIndex, toIndex) => {
    setFiles(prev => {
      const clone = prev.slice();
      const item = clone.splice(fromIndex, 1)[0];
      clone.splice(toIndex, 0, item);
      return clone;
    });
  }, []);

  useEffect(() => {
    if (numFiles === undefined) return;
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

  return (
    <FileOrganizer
      style={{ height: '70vh', margin: -32 }}
      files={files}
      onMove={forwardAction('onMove', handleOnMove)}
      onDragChange={action('onDragChange')}
      preventArrowsToMove={boolean('preventArrowsToMove', false)}
      disableMove={boolean('disableMove', false)}
      onRenderThumbnail={({ file, isDragging, otherDragging, onEditingChange, isShownOnLoad }) => (
        <Thumbnail
          file={file}
          dragging={isDragging}
          otherDragging={otherDragging}
          onEditingChange={onEditingChange}
          throttle={isShownOnLoad ? 0 : undefined}
        />
      )}
    />
  );
};

export const Virtualized = () => <VirtualizedExample />;
export const VirtualizedLazyThumbnails = () => <VirtualizedExample lazy />;
export const BasicToVirtualized = () => (
  <VirtualizedExample lazy numFiles={number('number of files', 25, { min: 0, max: 100, step: 25, range: true })} />
);

const UseManagedFilesHookExample: FC<{ virtualized?: boolean }> = ({ virtualized }) => {
  const {
    files,
    moveFile,
    selectedIds,
    toggleSelectedId,
    onDragChange,
    unselectAll,
    selectAll,
    draggingFiles,
  } = useManagedFiles({
    initialFiles: Array.from({ length: virtualized ? 100 : 25 }, (_, index) => createFile(index)),
    preventMultiDrag: boolean('useManagedFiles.options preventMultiDrag', false),
  });

  return (
    <FileOrganizer
      style={{ height: '70vh', margin: -32 }}
      files={files}
      onMove={moveFile}
      onDragChange={onDragChange}
      onCancelSelect={unselectAll}
      onSelectAll={selectAll}
      onRenderDragLayer={() => <ThumbnailDragLayer numFiles={draggingFiles?.length} />}
      preventArrowsToMove={boolean('preventArrowsToMove', false)}
      disableMove={boolean('disableMove', false)}
      onRenderThumbnail={({ file, isDragging, otherDragging, onEditingChange, index }) => (
        <Thumbnail
          file={file}
          dragging={isDragging}
          otherDragging={otherDragging}
          selected={selectedIds.includes(file.id)}
          onClick={event => toggleSelectedId(file.id, event)}
          onRename={action(`file_${index + 1} onRename`)}
          onRemove={action(`file_${index + 1} onRemove`)}
          onRotate={action(`file_${index + 1} onRotate`)}
          onEditingChange={forwardAction(`file_${index + 1} onEditingChange`, onEditingChange)}
        />
      )}
    />
  );
};

export const UseManagedFilesHook = () => <UseManagedFilesHookExample />;
export const UseManagedFilesHookVirtualized = () => <UseManagedFilesHookExample virtualized />;
