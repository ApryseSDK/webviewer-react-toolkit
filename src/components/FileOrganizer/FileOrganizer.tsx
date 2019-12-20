import classnames from 'classnames';
import React, { FC, KeyboardEvent, ReactNode, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { File } from '../../data/file';
import Draggable from '../Draggable';
import DragLayer from '../DragLayer';

export interface FileOrganizerProps {
  /**
   * A list of files to render out within the page organizer.
   */
  files: File[];
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
   * If true, will disable drag-and-drop functionality within the organizer.
   */
  disableMove?: boolean;
  /**
   * Callback fired when a file is moved within the page organizer.
   */
  onMove?: (fromIndex: number, toIndex: number, file: File) => void;
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
  onRenderThumbnail,
  onRenderDragLayer,
  disableMove,
  className,
  preventArrowsToMove,
}) => {
  const [editingList, setEditingList] = useState<string[]>([]);
  const setEditing = (id: string, isEditing: boolean) => {
    setEditingList(prev => {
      const prevIndex = prev.indexOf(id);
      if (isEditing && prevIndex === -1) return [...prev, id];
      if (!isEditing && prevIndex !== -1) return [...prev.slice(0, prevIndex), ...prev.slice(prevIndex + 1)];
      return prev;
    });
  };

  const [draggingList, setDraggingList] = useState<string[]>([]);
  const setDragging = (id: string, isDragging: boolean) => {
    setDraggingList(prev => {
      const prevIndex = prev.indexOf(id);
      if (isDragging && prevIndex === -1) return [...prev, id];
      if (!isDragging && prevIndex !== -1) return [...prev.slice(0, prevIndex), ...prev.slice(prevIndex + 1)];
      return prev;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number, file: File) => {
    if (preventArrowsToMove) return;
    if (editingList.includes(file.id)) return;
    if (event.key === 'ArrowLeft') {
      if (index === 0) return;
      onMove?.(index, index - 1, file);
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      if (index === files.length - 1) return;
      onMove?.(index, index + 1, file);
      event.preventDefault();
    }
  };

  const fileOrganizerClass = classnames('ui__base ui__fileOrganizer', className);

  return (
    <DndProvider backend={Backend}>
      <div className={fileOrganizerClass}>
        {files.map((file, index) => {
          const isEditing = editingList.includes(file.id);
          const otherEditing = editingList.length > 0 && !editingList.includes(file.id);
          const otherDragging = draggingList.length > 0 && !draggingList.includes(file.id);
          return (
            <Draggable
              key={file.id}
              index={index}
              hideDragPreview={!!onRenderDragLayer}
              onDragChange={dragging => setDragging(file.id, dragging)}
              disableDrag={isEditing || disableMove}
              onMove={(fromIndex, toIndex) => onMove?.(fromIndex, toIndex, file)}
              onKeyDown={e => handleKeyDown(e, index, file)}
              onRenderChildren={isDragging => {
                return onRenderThumbnail({
                  file,
                  isDragging,
                  otherDragging,
                  isEditing,
                  otherEditing,
                  onEditingChange: editing => setEditing(file.id, editing),
                  index,
                });
              }}
            />
          );
        })}
        {onRenderDragLayer ? <DragLayer>{onRenderDragLayer()}</DragLayer> : null}
      </div>
    </DndProvider>
  );
};
