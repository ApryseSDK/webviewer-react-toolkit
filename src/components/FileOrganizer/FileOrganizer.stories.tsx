import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useManagedFiles } from '../../hooks';
import { createFile, FakeFile } from '../../storybook-helpers/data/files';
import { forwardAction } from '../../storybook-helpers/knobs/forwardAction';
import { FileOrganizer, FileOrganizerProps } from '../FileOrganizer';
import { Thumbnail } from '../Thumbnail';
import { ThumbnailDragLayer } from '../ThumbnailDragLayer';
import docs from './README.md';

export default { title: 'FileOrganizer', component: FileOrganizer, parameters: { info: { docs, disable: true } } };

/* --- Basic. --- */

const BasicExample: FC<{ onRenderDragLayer?: boolean }> = ({ onRenderDragLayer }) => {
  // This is the index organizing function.
  const [files, setFiles] = useState<FakeFile[]>([]);
  const handleOnMove = useCallback<NonNullable<FileOrganizerProps<FakeFile>['onMove']>>((fromIndex, toIndex) => {
    setFiles(prev => {
      if (toIndex < 0 || toIndex >= prev.length) return prev;
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

  return (
    <FileOrganizer
      files={files}
      onMove={forwardAction('onMove', handleOnMove)}
      preventArrowsToMove={boolean('preventArrowsToMove', false)}
      disableMove={boolean('disableMove', false)}
      onDragChange={action('onDragChange')}
      onRenderDragLayer={onRenderDragLayer ? () => <ThumbnailDragLayer /> : undefined}
      onRenderThumbnail={({ file, isDragging, otherDragging, onEditingChange, index }) => (
        <Thumbnail
          file={file}
          dragging={isDragging}
          otherDragging={otherDragging}
          onClick={action(`file_${index + 1} onClick`)}
          onRename={action(`file_${index + 1} onRename`)}
          onEditingChange={forwardAction(`file_${index + 1} onEditingChange`, onEditingChange)}
        />
      )}
    />
  );
};

export const Basic = () => <BasicExample />;
export const WithCustomDragLayer = () => <BasicExample onRenderDragLayer />;

/* --- Virtualized. --- */

const VirtualizedExample: FC<{ lazy?: boolean; numFiles?: number; virtualizeThreshold?: number }> = ({
  lazy,
  numFiles,
  virtualizeThreshold,
}) => {
  // This is the index organizing function.
  const [files, setFiles] = useState(() =>
    Array.from({ length: numFiles ?? 50 }, (_, index) => createFile(index, { lazy })),
  );
  const handleOnMove = useCallback<NonNullable<FileOrganizerProps<FakeFile>['onMove']>>((fromIndex, toIndex) => {
    setFiles(prev => {
      if (toIndex < 0 || toIndex >= prev.length) return prev;
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
      onDragChange={action('onDragChange')}
      preventArrowsToMove={boolean('preventArrowsToMove', false)}
      disableMove={boolean('disableMove', false)}
      virtualizeThreshold={virtualizeThreshold ?? undefined}
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
export const VirtualizedStressTest = () => <VirtualizedExample lazy numFiles={1000} />;
export const BasicToVirtualized = () => (
  <VirtualizedExample lazy virtualizeThreshold={boolean('is virtualized', false) ? 50 : 51} />
);

/* --- With useManagedHook. --- */

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
          onEditingChange={forwardAction(`file_${index + 1} onEditingChange`, onEditingChange)}
        />
      )}
    />
  );
};

export const UseManagedFilesHook = () => <UseManagedFilesHookExample />;
export const UseManagedFilesHookVirtualized = () => <UseManagedFilesHookExample virtualized />;
