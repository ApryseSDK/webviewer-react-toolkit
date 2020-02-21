import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useManagedFiles } from '../../hooks';
import { createFile, FakeFile } from '../../storybook-helpers/data/files';
import { forwardAction } from '../../storybook-helpers/knobs/forwardAction';
import { integer } from '../../storybook-helpers/knobs/integer';
import { FileOrganizer, FileOrganizerProps } from '../FileOrganizer';
import { Thumbnail } from '../Thumbnail';
import { ThumbnailDragLayer } from '../ThumbnailDragLayer';
import readme from './README.md';

export default {
  title: 'Components/FileOrganizer',
  component: FileOrganizer,
  parameters: { readme, info: { disable: true } },
};

interface TemplateProps {
  onRenderDragLayer?: boolean;
  numFiles?: number;
  lazy?: boolean;
}

const Template: FC<TemplateProps> = ({ onRenderDragLayer, numFiles = 2, lazy }) => {
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
    return true;
  }, []);

  // This is just a helper for adding or removing files.
  useEffect(() => {
    setFiles(prev => {
      if (prev.length > numFiles) {
        return prev.slice(0, numFiles);
      }
      if (prev.length < numFiles) {
        const newFiles = [];
        for (let index = prev.length; index < numFiles; index++) {
          newFiles.push(createFile(index, { lazy }));
        }
        return [...prev, ...newFiles];
      }
      return prev;
    });
  }, [numFiles, lazy]);

  return (
    <FileOrganizer
      files={files}
      preventArrowsToMove={boolean('preventArrowsToMove', false)}
      preventClickAwayDeselect={boolean('preventClickAwayDeselect', false)}
      disableMove={boolean('disableMove', false)}
      padding={integer('padding', 0)}
      onMove={forwardAction('onMove', handleOnMove)}
      onDragChange={action('onDragChange')}
      onDeselectAll={action('onDeselectAll')}
      onSelectAll={action('onSelectAll')}
      onRenderDragLayer={onRenderDragLayer ? () => <ThumbnailDragLayer /> : undefined}
      onRenderThumbnail={({ onRenderThumbnailProps }) => <Thumbnail {...onRenderThumbnailProps} />}
    />
  );
};

export const Basic = () => {
  const numFiles = number('number of files', 2, { min: 0, max: 16, step: 1, range: true });
  return <Template numFiles={numFiles} />;
};
export const WithCustomDragLayer = () => {
  const numFiles = number('number of files', 2, { min: 0, max: 16, step: 1, range: true });
  return <Template numFiles={numFiles} onRenderDragLayer />;
};
export const StressTestWithLazyThumbnails = () => <Template lazy numFiles={1000} />;

export const UseManagedFilesHook = () => {
  const { fileOrganizerProps, getThumbnailSelectionProps, draggingIds } = useManagedFiles({
    initialFiles: Array.from({ length: 100 }, (_, index) => createFile(index)),
    preventMultiDrag: boolean('preventMultiDrag', false, 'useManagedFiles options'),
    selectWithoutShift: boolean('selectWithoutShift', false, 'useManagedFiles options'),
    preventDeselectOnDragOther: boolean('preventDeselectOnDragOther', false, 'useManagedFiles options'),
    preventSelectOnDrag: boolean('preventSelectOnDrag', false, 'useManagedFiles options'),
  });

  return (
    <FileOrganizer
      {...fileOrganizerProps}
      onRenderDragLayer={() => <ThumbnailDragLayer numFiles={draggingIds.length} />}
      preventArrowsToMove={boolean('preventArrowsToMove', false, 'FileOrganizer')}
      preventClickAwayDeselect={boolean('preventClickAwayDeselect', false, 'FileOrganizer')}
      disableMove={boolean('disableMove', false, 'FileOrganizer')}
      padding={integer('padding', 0, 'FileOrganizer')}
      onRenderThumbnail={({ id, onRenderThumbnailProps }) => (
        <Thumbnail {...getThumbnailSelectionProps(id)} {...onRenderThumbnailProps} />
      )}
    />
  );
};

UseManagedFilesHook.story = { name: 'useManagedFiles Hook' };
