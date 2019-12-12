import classnames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { File } from '../../hooks/useFile';
import DraggableWrapper from '../DraggableWrapper';

export interface PageOrganizerProps {
  /**
   * A list of files to render out within the page organizer.
   */
  files: File[];
  /**
   * On render function for generating the thumbnails for the page organizer.
   * If you do not want to build your own, try using the `Thumbnail` component.
   */
  onRenderThumbnail: (params: { file: File; isSelected: boolean; isDragging: boolean; index: number }) => ReactNode;
  /**
   * Array of selected files.
   */
  selected?: File['id'][];
  /**
   * Callback fired when a file is moved within the page organizer.
   */
  onMove?: (fromIndex: number, toIndex: number, file: File) => void;
  /**
   * Classname for outer div.
   */
  className?: string;
}

export const PageOrganizer: FC<PageOrganizerProps> = ({ files, selected, onMove, onRenderThumbnail, className }) => {
  const pageOrganizerClass = classnames('ui__base ui__pageOrganizer', className);

  return (
    <div className={pageOrganizerClass}>
      <DndProvider backend={Backend}>
        {files.map((file, index) => (
          <DraggableWrapper
            key={file.id}
            index={index}
            onMove={(fromIndex, toIndex) => onMove?.(fromIndex, toIndex, file)}
            onRenderChildren={isDragging => {
              const isSelected = selected?.includes(file.id) ?? false;
              return onRenderThumbnail({ file, isSelected, isDragging, index });
            }}
          />
        ))}
      </DndProvider>
    </div>
  );
};
