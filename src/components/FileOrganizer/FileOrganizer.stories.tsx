import { boolean, number } from '@storybook/addon-knobs';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import { useManagedFiles } from '../../hooks';
import { action } from '../../storybook-helpers/action/action';
import { createFile, FakeFile } from '../../storybook-helpers/data/files';
import { forwardAction } from '../../storybook-helpers/knobs/forwardAction';
import { integer } from '../../storybook-helpers/knobs/integer';
import { Button } from '../Button';
import { FileOrganizer, FileOrganizerProps } from '../FileOrganizer';
import { Icon } from '../Icon';
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
  editable?: boolean;
  scrollToTop?: boolean;
  customSizedThumbnail?: boolean;
}

const Template: FC<TemplateProps> = ({
  onRenderDragLayer,
  numFiles = 2,
  editable,
  scrollToTop,
  customSizedThumbnail,
}) => {
  // This is the index organizing function.
  const [files, setFiles] = useState<FakeFile[]>(() => {
    const newFiles = [];
    for (let index = 0; index < numFiles; index++) {
      newFiles.push(createFile(index));
    }
    return newFiles;
  });
  const handleOnMove = useCallback<NonNullable<FileOrganizerProps<FakeFile>['onMove']>>((fromIndex, toIndex) => {
    setFiles((prev) => {
      if (toIndex < 0 || toIndex >= prev.length) return prev;
      const clone = prev.slice();
      const item = clone.splice(fromIndex, 1)[0];
      clone.splice(toIndex, 0, item);
      return clone;
    });
    return true;
  }, []);

  const gridRef = useRef<FixedSizeGrid>(null);
  const onScrollToTop = () => {
    gridRef.current?.scrollTo({ scrollTop: 0, scrollLeft: 0 });
  };

  const [largerSize, setLargerSize] = useState(false);
  const changeSize = () => setLargerSize((prev) => !prev);
  const size = largerSize ? { width: 200, height: 250 } : { width: 150, height: 200 };

  // This is just a helper for adding or removing files.
  useEffect(() => {
    setFiles((prev) => {
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
    <>
      <FileOrganizer
        files={files}
        gridRef={gridRef}
        preventArrowsToMove={boolean('preventArrowsToMove', false)}
        preventClickAwayDeselect={boolean('preventClickAwayDeselect', false)}
        disableMove={boolean('disableMove', false)}
        padding={integer('padding', 0)}
        onMove={forwardAction('onMove', handleOnMove)}
        onDragChange={action('onDragChange')}
        onDeselectAll={action('onDeselectAll')}
        onSelectAll={action('onSelectAll')}
        thumbnailSize={customSizedThumbnail ? size : undefined}
        onRenderDragLayer={onRenderDragLayer ? () => <ThumbnailDragLayer /> : undefined}
        onRenderThumbnail={({ onRenderThumbnailProps, index }) =>
          customSizedThumbnail ? (
            <div
              style={{
                ...size,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'lightblue',
                border: '1px solid orange',
              }}
            >
              Thumbnail {index + 1}
            </div>
          ) : (
            <Thumbnail
              {...onRenderThumbnailProps}
              onRename={editable ? () => {} : undefined}
              buttonProps={
                editable
                  ? [
                      {
                        children: <Icon icon="Close" />,
                        onClick: () => {},
                        key: 0,
                      },
                    ]
                  : undefined
              }
            />
          )
        }
      />
      {scrollToTop && <Button onClick={onScrollToTop}>Scroll to top</Button>}
      {customSizedThumbnail && <Button onClick={changeSize}>Change thumbnail size</Button>}
    </>
  );
};

export const Basic = () => {
  const numFiles = number('number of files', 2, { min: 0, max: 16, step: 1, range: true });
  return <Template numFiles={numFiles} />;
};
export const EditableWithButtons = () => {
  const numFiles = number('number of files', 2, { min: 0, max: 16, step: 1, range: true });
  return <Template numFiles={numFiles} editable />;
};
export const WithCustomDragLayer = () => {
  const numFiles = number('number of files', 2, { min: 0, max: 16, step: 1, range: true });
  return <Template numFiles={numFiles} onRenderDragLayer />;
};
export const DifferentThumbnailSize = () => {
  const numFiles = number('number of files', 2, { min: 0, max: 16, step: 1, range: true });
  return <Template numFiles={numFiles} customSizedThumbnail />;
};
export const WithGridRef = () => {
  return <Template numFiles={100} scrollToTop />;
};

export const UseManagedFilesHook = () => {
  const { fileOrganizerProps, getThumbnailSelectionProps, draggingIds } = useManagedFiles({
    initialFiles: Array.from({ length: 1000 }, (_, index) => createFile(index)),
    preventMultiDrag: boolean('preventMultiDrag', false, 'useManagedFiles options'),
    preventMultiSelect: boolean('preventMultiSelect', false, 'useManagedFiles options'),
    preventDeselectOnDragOther: boolean('preventDeselectOnDragOther', false, 'useManagedFiles options'),
    preventSelectOnDrag: boolean('preventSelectOnDrag', false, 'useManagedFiles options'),
    easyMultiSelect: boolean('easyMultiSelect', false, 'useManagedFiles options'),
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
