import classnames from 'classnames';
import React, { FC, ReactNode, useEffect, useRef, HTMLAttributes } from 'react';
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd';

const ItemTypes = { Draggable: 'draggable' };

export interface DraggableWrapperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The current index of the draggable wrapper.
   */
  index: number;
  /**
   * Call instead of providing children if you wish to use the isDragging prop.
   */
  onRenderChildren?: (isDragging: boolean) => ReactNode;
  /**
   * If given, will be called any time the draggable wrapper is moved.
   */
  onMove?: (fromIndex: number, toIndex: number) => void;
  /**
   * If given, will be called every time the draggable wrapper is dragging.
   * This **must** be memoized in order to work properly. If it is not, then
   * this will fire whenever the component updated regardless of whether drag
   * has started or not.
   */
  onDragStart?: () => void;
  /**
   * If given, will be called every time the draggable wrapper is not dragging.
   * This **must** be memoized in order to work properly. If it is not, then
   * this will fire whenever the component updated regardless of whether drag
   * has started or not.
   */
  onDragEnd?: () => void;
}

interface DragItem extends DragObjectWithType {
  index: number;
}

export const DraggableWrapper: FC<DraggableWrapperProps> = ({
  index,
  onMove,
  onRenderChildren,
  children,
  className,
  onDragStart,
  onDragEnd,
  ...divProps
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.Draggable,
    hover(item: DragItem) {
      // Cancel if ref hasn't been set up.
      if (!ref.current) return;

      // Previous index.
      const fromIndex = item.index;

      // Index it has been dragged to.
      const toIndex = index;

      // Cancel if index has not changed.
      if (fromIndex === toIndex) return;

      // Call onMove when index changes.
      onMove?.(fromIndex, toIndex);

      // Set the item index to be the new index.
      item.index = toIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.Draggable, index },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(ref));

  useEffect(() => {
    if (isDragging) onDragStart?.();
    else onDragEnd?.();
  }, [isDragging, onDragStart, onDragEnd]);

  const draggableWrapperClass = classnames('ui__base ui__draggableWrapper', className);

  return (
    <>
      <div {...divProps} ref={ref} className={draggableWrapperClass}>
        {onRenderChildren ? onRenderChildren(isDragging) : children}
      </div>
    </>
  );
};
