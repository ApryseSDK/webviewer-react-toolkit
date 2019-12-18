import classnames from 'classnames';
import React, { CSSProperties, FC, HTMLAttributes, useMemo, ReactNode } from 'react';
import { useDragLayer } from 'react-dnd';

export interface DragLayerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The children passed to the drag layer will be rendered whenever an item is
   * drag-and-dropped. You may have to disable their image preview or else you
   * will see both.
   */
  children?: ReactNode;
}

export const DragLayer: FC<DragLayerProps> = ({ children, className, ...divProps }) => {
  const { isDragging, currentOffset } = useDragLayer(monitor => ({
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const style = useMemo<CSSProperties>(() => {
    if (!currentOffset) return { display: 'none' };
    const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
    return { transform, WebkitTransform: transform };
  }, [currentOffset]);

  if (!isDragging) return null;

  const dragLayerClass = classnames('ui__base ui__dragLayer', className);

  return (
    <div {...divProps} className={dragLayerClass}>
      <div style={style}>{children}</div>
    </div>
  );
};
