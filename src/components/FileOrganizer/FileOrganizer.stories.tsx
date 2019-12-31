import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import React, { useCallback, useEffect, useState, FC } from 'react';
import { File } from '../../data/file';
import { createFile } from '../../storybook-helpers/data/files';
import { forwardAction } from '../../storybook-helpers/knobs/forwardAction';
import FileOrganizer, { FileOrganizerProps } from '../FileOrganizer';
import Thumbnail from '../Thumbnail';
import ThumbnailDragLayer from '../ThumbnailDragLayer';
import docs from './README.md';
import useManagedFiles from '../../hooks/useManagedFiles';

export default { title: 'FileOrganizer', parameters: { info: docs } };

function useCommonFileOrganizer() {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const setSelected = (id: string) => {
    setSelectedList(prev => {
      const prevIndex = prev.indexOf(id);
      if (prevIndex === -1) return [...prev, id];
      if (prevIndex !== -1) return [...prev.slice(0, prevIndex), ...prev.slice(prevIndex + 1)];
      return prev;
    });
  };

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

  return { selectedList, setSelected, files, handleOnMove };
}

export const Basic = () => {
  const { selectedList, setSelected, files, handleOnMove } = useCommonFileOrganizer();

  return (
    <FileOrganizer
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
          selected={selectedList.includes(file.id)}
          onClick={forwardAction(`file_${index + 1} onClick`, () => setSelected(file.id))}
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
  const { selectedList, setSelected, files, handleOnMove } = useCommonFileOrganizer();

  return (
    <FileOrganizer
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
          selected={selectedList.includes(file.id)}
          onClick={forwardAction(`file_${index + 1} onClick`, () => setSelected(file.id))}
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

const VirtualizedExample: FC<{ lazy?: boolean; dragLayer?: boolean; numFiles?: number }> = ({
  lazy,
  dragLayer,
  numFiles,
}) => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const setSelected = (id: string) => {
    setSelectedList(prev => {
      const prevIndex = prev.indexOf(id);
      if (prevIndex === -1) return [...prev, id];
      if (prevIndex !== -1) return [...prev.slice(0, prevIndex), ...prev.slice(prevIndex + 1)];
      return prev;
    });
  };

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
    <div style={{ height: '70vh' }}>
      <FileOrganizer
        files={files}
        onMove={handleOnMove}
        onDragChange={action('onDragChange')}
        onRenderThumbnail={({ file, isDragging, otherDragging, onEditingChange }) => (
          <Thumbnail
            file={file}
            dragging={isDragging}
            otherDragging={otherDragging}
            selected={selectedList.includes(file.id)}
            onClick={() => setSelected(file.id)}
            onEditingChange={onEditingChange}
          />
        )}
        onRenderDragLayer={dragLayer ? () => <ThumbnailDragLayer /> : undefined}
      />
    </div>
  );
};

export const Virtualized = () => <VirtualizedExample />;
export const VirtualizedLazyThumbnails = () => <VirtualizedExample lazy />;
export const VirtualizedWithCustomDragLayer = () => <VirtualizedExample dragLayer />;
export const BasicToVirtualized = () => (
  <VirtualizedExample lazy numFiles={number('number of files', 50, { min: 0, max: 1000, step: 50, range: true })} />
);

export const WithUseManagedFilesHook = () => {
  const {
    files,
    moveFile,
    selectedIds,
    toggleSelectedId,
    onDragChange,
    unselectAll,
    numDraggingFiles,
  } = useManagedFiles({
    initialFiles: Array.from({ length: 8 }, (_, index) => createFile(index)),
    preventMultiDrag: boolean('preventMultiDrag', false),
  });

  return (
    <FileOrganizer
      files={files}
      onMove={moveFile}
      onDragChange={onDragChange}
      onCancelSelect={unselectAll}
      onRenderDragLayer={() => <ThumbnailDragLayer numFiles={numDraggingFiles} />}
      onRenderThumbnail={({ file, isDragging, otherDragging, onEditingChange, index }) => (
        <Thumbnail
          file={file}
          dragging={isDragging}
          otherDragging={otherDragging}
          selected={selectedIds.includes(file.id)}
          onClick={() => toggleSelectedId(file.id)}
          onRename={action(`file_${index + 1} onRename`)}
          onRemove={action(`file_${index + 1} onRemove`)}
          onRotate={action(`file_${index + 1} onRotate`)}
          onEditingChange={forwardAction(`file_${index + 1} onEditingChange`, onEditingChange)}
        />
      )}
    />
  );
};
