import classnames from 'classnames';
import React, { FC, KeyboardEvent, ReactNode, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { File } from '../../hooks/useFile';
import Draggable from '../Draggable';

export interface OnRenderThumbnailProps {
  file: File;
  isDragging: boolean;
  otherDragging: boolean;
  setEditing: (isEditing: boolean) => void;
  isEditing: boolean;
  otherEditing: boolean;
  index: number;
}

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

export const FileOrganizer: FC<FileOrganizerProps> = ({
  files,
  onMove,
  onRenderThumbnail,
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

  const FileOrganizerClass = classnames('ui__base ui__fileOrganizer', className);

  return (
    <div className={FileOrganizerClass}>
      <DndProvider backend={Backend}>
        {files.map((file, index) => {
          const isEditing = editingList.includes(file.id);
          return (
            <Draggable
              key={file.id}
              index={index}
              onDragChange={dragging => setDragging(file.id, dragging)}
              disableDrag={isEditing}
              onMove={(fromIndex, toIndex) => onMove?.(fromIndex, toIndex, file)}
              onKeyDown={e => handleKeyDown(e, index, file)}
              onRenderChildren={isDragging => {
                const otherDragging = draggingList.length > 0 && !draggingList.includes(file.id);
                const otherEditing = editingList.length > 0 && !editingList.includes(file.id);
                return onRenderThumbnail({
                  file,
                  isDragging,
                  otherDragging,
                  isEditing,
                  otherEditing,
                  setEditing: editing => setEditing(file.id, editing),
                  index,
                });
              }}
            />
          );
        })}
      </DndProvider>
    </div>
  );
};
