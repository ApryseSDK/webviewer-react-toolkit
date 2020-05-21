import classnames from 'classnames';
import React, { CSSProperties, FC, HTMLAttributes, ReactNode, useMemo } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';

export interface DragLayerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The children passed to the drag layer will be rendered whenever an item is
   * drag-and-dropped. You may have to disable their image preview or else you
   * will see both.
   */
  children?: ReactNode;
  /**
   * If not given, will use `currentOffset.x` and `currentOffset.y`. Can return
   * custom translate coordinates. This allows you to always center on mouse
   * position, or translate to any coordinates.
   */
  customTranslate?: (params: { currentOffset: XYCoord; mousePosition: XYCoord }) => { x: number; y: number };
}

export const DragLayer: FC<DragLayerProps> = ({ children, customTranslate, className, ...divProps }) => {
  const { currentOffset, isDragging, mousePosition } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
    mousePosition: monitor.getClientOffset(),
  }));

  const style = useMemo<CSSProperties>(() => {
    if (!currentOffset || !mousePosition) return { display: 'none' };
    const { x, y } = customTranslate?.({ currentOffset, mousePosition }) ?? currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return { transform, WebkitTransform: transform };
  }, [currentOffset, customTranslate, mousePosition]);

  if (!isDragging) return null;

  const dragLayerClass = classnames('ui__base ui__dragLayer', className);

  return (
    <div {...divProps} className={dragLayerClass}>
      <div style={style}>{children}</div>
    </div>
  );
};
