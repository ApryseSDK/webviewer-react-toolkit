import classnames from 'classnames';
import React, { CSSProperties, FC, KeyboardEvent, ReactNode, useCallback, useEffect, useState, Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { File } from '../../data/file';
import useCurrentRef from '../../hooks/useCurrentRef';
import Draggable from '../Draggable';
import DragLayer from '../DragLayer';
import { MemoAutoSizer } from './MemoAutoSizer';

export interface FileOrganizerProps {
  /**
   * A list of files to render out within the page organizer.
   */
  files: File[];
  /**
   * If true, will disable drag-and-drop functionality within the organizer.
   */
  disableMove?: boolean;
  /**
   * Classname for outer div.
   */
  className?: string;
  /**
   * Removes the ability to change indexes with arrow keys. This removes the
   * ability to re-sort accessibly. Generally, left and right arrow keys will
   * call `onMove` if a file is focused.
   */
  preventArrowsToMove?: boolean;
  /**
   * If provided, will virtualize the files to prevent jank when rendering out
   * your thumbnails. This will also allow for lazy loading of thumbnails.
   * @default 100
   */
  virtualizeThreshold?: number;
  /**
   * On render function for generating the thumbnails for the page organizer.
   * If you do not want to build your own, try using the `Thumbnail` component.
   */
  onRenderThumbnail: (onRenderProps: OnRenderThumbnailProps) => ReactNode;
  /**
   * If provided, will call to render a custom drag layer while a thumbnail is
   * being dragged. Otherwise will show a preview of the thumbnail.
   */
  onRenderDragLayer?: () => ReactNode;
  /**
   * Callback fired when a file is moved within the page organizer.
   */
  onMove?: (fromIndex: number, toIndex: number, file: File) => void;
  /**
   * Called whenever dragging begins or ends. If drag ends, the id will be
   * undefined.
   */
  onDragChange?: (id?: string) => void;
}

export interface OnRenderThumbnailProps {
  /** The file to render into a thumbnail. */
  file: File;
  /** The index of this file within the file organizer. */
  index: number;
  /** Is this file being dragged currently. */
  isDragging: boolean;
  /** Are other files being dragged other than this one. */
  otherDragging: boolean;
  /** Is this thumbnail being edited (dependent on you setting `setEditing`). */
  isEditing: boolean;
  /** Are other files being edited other than this one. */
  otherEditing: boolean;
  /** Callback for setting whether the thumbnail is in editing mode. */
  onEditingChange: (isEditing: boolean) => void;
}

export const FileOrganizer: FC<FileOrganizerProps> = ({
  files,
  onMove,
  onDragChange,
  onRenderThumbnail,
  onRenderDragLayer,
  disableMove,
  className,
  preventArrowsToMove,
  virtualizeThreshold = 100,
}) => {
  const [editingId, setEditingId] = useState<string>();
  const [draggingId, setDraggingId] = useState<string>();

  const onDragChangeRef = useCurrentRef(onDragChange);
  useEffect(() => {
    onDragChangeRef.current?.(draggingId);
  }, [draggingId, onDragChangeRef]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, index: number, file: File) => {
      if (preventArrowsToMove || editingId !== undefined) return;
      if (event.key === 'ArrowLeft') {
        if (index === 0) return;
        onMove?.(index, index - 1, file);
        event.preventDefault();
      } else if (event.key === 'ArrowRight') {
        if (index === files.length - 1) return;
        onMove?.(index, index + 1, file);
        event.preventDefault();
      }
    },
    [editingId, files.length, onMove, preventArrowsToMove],
  );

  const renderItem = useCallback(
    (file: File | undefined, index: number, style?: CSSProperties) => {
      if (!file) return <Fragment key={'__null'}>{null}</Fragment>;
      const isEditing = editingId === file.id;
      const otherEditing = editingId !== undefined && editingId === file.id;
      const otherDragging = draggingId !== undefined && draggingId === file.id;
      return (
        <Draggable
          key={file.id}
          index={index}
          style={style}
          hideDragPreview={!!onRenderDragLayer}
          onDragChange={isDragging => setDraggingId(isDragging ? file.id : undefined)}
          disableDrag={isEditing || disableMove}
          onMove={(fromIndex, toIndex) => onMove?.(fromIndex, toIndex, file)}
          onKeyDown={e => handleKeyDown(e, index, file)}
          onRenderChildren={isDragging => {
            return onRenderThumbnail({
              index,
              file,
              isDragging,
              otherDragging,
              isEditing,
              otherEditing,
              onEditingChange: isEditing => setEditingId(isEditing ? file.id : undefined),
            });
          }}
        />
      );
    },
    [disableMove, draggingId, editingId, handleKeyDown, onMove, onRenderDragLayer, onRenderThumbnail],
  );

  const fileOrganizerClass = classnames('ui__base ui__fileOrganizer', className);

  return (
    <DndProvider backend={Backend}>
      <div className={fileOrganizerClass}>
        {files.length >= virtualizeThreshold ? (
          <MemoAutoSizer files={files} renderItem={renderItem} />
        ) : (
          files.map((file, index) => renderItem(file, index))
        )}
        {onRenderDragLayer ? <DragLayer>{onRenderDragLayer()}</DragLayer> : null}
      </div>
    </DndProvider>
  );
};
