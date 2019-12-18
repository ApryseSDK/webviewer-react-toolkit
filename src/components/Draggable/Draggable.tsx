import classnames from 'classnames';
import React, { FC, HTMLAttributes, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd';
import { Motion, spring, SpringHelperConfig } from 'react-motion';

import { getEmptyImage } from 'react-dnd-html5-backend';

const ItemTypes = { Draggable: 'draggable' };

export interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
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
   * Called whenever the dnd property `isDragging` changes.
   */
  onDragChange?: (isDragging: boolean) => void;
  /**
   * Prevent this draggable wrapper from dragging.
   */
  disableDrag?: boolean;
  /**
   * Hides the snapshot preview of the item while dragging. The most common use
   * case would be if you're implementing a custom drag layer and you don't want
   * the preview snapshot to clash with it.
   */
  hideDragPreview?: boolean;
}

interface DragItem extends DragObjectWithType {
  index: number;
}

// Quick animation with no "bounce".
const SPRING: SpringHelperConfig = { stiffness: 300, damping: 30 };

export const Draggable: FC<DraggableProps> = ({
  index,
  onRenderChildren,
  onMove,
  onDragChange,
  disableDrag,
  hideDragPreview,
  children,
  className,
  style,
  ...divProps
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  /* --- Drag and drop settings. --- */

  const [, drop] = useDrop({
    accept: ItemTypes.Draggable,
    hover(item: DragItem) {
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

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.Draggable, index },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
    canDrag: !disableDrag,
  });

  useEffect(() => {
    if (hideDragPreview) preview(getEmptyImage(), { captureDraggingState: true });
  }, [hideDragPreview, preview]);

  useEffect(() => {
    onDragChange?.(isDragging);
  }, [onDragChange, isDragging]);

  drag(drop(divRef));

  /* --- Animation settings. --- */

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const prevIndex = useRef(index);

  // Find the difference in position between new index and previous index. Then,
  // get the difference in position and set that as the starting point for the
  // animation.
  useEffect(() => {
    if (!divRef.current) return;

    // Get the item occupying the previous index location.
    const prev = divRef.current.parentElement?.children.item(prevIndex.current);

    // Get the coordinates of the previous item.
    const { left: prevLeft, top: prevTop } = prev?.getBoundingClientRect() ?? {};

    // Get the coordinates of the current item.
    const { left, top } = divRef.current.getBoundingClientRect();

    // Get the deltas.
    const deltaX = prevLeft === undefined ? 0 : prevLeft - left;
    const deltaY = prevTop === undefined ? 0 : prevTop - top;

    // Set the coordinates to the distance divided by 10 for snappy animation.
    setCoords({ x: deltaX / 10, y: deltaY / 10 });

    // Store index for next swap.
    prevIndex.current = index;
  }, [index]);

  // Whenever coords change, revert back to zero.
  useEffect(() => {
    if (coords.x === 0 && coords.y === 0) return;
    requestAnimationFrame(() => setCoords({ x: 0, y: 0 }));
  }, [coords]);

  // Only animate if returning back to 0. Otherwise, snap to translate so that
  // the animation looks like it's moving from it's previous location.
  const motionStyle = useMemo(
    () => ({
      x: coords.x === 0 && !isDragging ? spring(coords.x, SPRING) : coords.x,
      y: coords.y === 0 && !isDragging ? spring(coords.y, SPRING) : coords.y,
    }),
    [coords.x, coords.y, isDragging],
  );

  const draggableClass = classnames('ui__base ui__draggable', className, {
    ['ui__draggable--dragging']: isDragging,
  });

  return (
    <Motion style={motionStyle}>
      {({ x, y }) => (
        <div
          {...divProps}
          ref={divRef}
          className={draggableClass}
          style={{
            ...style,
            WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
            transform: `translate3d(${x}px, ${y}px, 0)`,
          }}
        >
          {onRenderChildren ? onRenderChildren(isDragging) : children}
        </div>
      )}
    </Motion>
  );
};
