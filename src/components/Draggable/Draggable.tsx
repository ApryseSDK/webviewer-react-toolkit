import classnames from 'classnames';
import React, { FC, HTMLAttributes, ReactNode, useEffect, useRef, useState, useMemo } from 'react';
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd';
import { Motion, spring, SpringHelperConfig } from 'react-motion';

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
}

interface DragItem extends DragObjectWithType {
  index: number;
}

const SPRING: SpringHelperConfig = { stiffness: 300, damping: 30 };

export const Draggable: FC<DraggableProps> = ({
  index,
  onMove,
  onRenderChildren,
  children,
  className,
  style,
  ...divProps
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  // TODO: drag shield when dragging...

  const [, drop] = useDrop({
    accept: ItemTypes.Draggable,
    hover(item: DragItem) {
      // Cancel if ref hasn't been set up.
      if (!divRef.current) return;

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

  drag(drop(divRef));

  // Find the difference in position between new index and previous index. Then,
  // get the difference in position and set that as the starting point for the
  // animation.
  const prevIndex = useRef(index);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!divRef.current) return;
    const parent = divRef.current.parentElement;
    const prev = parent?.children.item(prevIndex.current);
    const { left: prevLeft, top: prevTop } = prev?.getBoundingClientRect() ?? {};
    const { left, top } = divRef.current.getBoundingClientRect();
    setCoords({
      x: prevLeft === undefined ? 0 : (prevLeft - left) / 3,
      y: prevTop === undefined ? 0 : (prevTop - top) / 3,
    });
    prevIndex.current = index;
  }, [index]);

  // Whenever coords change, revert back to zero.
  useEffect(() => {
    if (coords.x === 0 && coords.y === 0) return;
    setCoords(prev => ({ ...prev, x: 0, y: 0 }));
  }, [coords]);

  // Only animate if returning back to 0. Otherwise, snap to translate so that
  // the animation looks like it's moving from it's previous location.
  const motionStyle = useMemo(
    () => ({
      x: coords.x === 0 ? spring(coords.x, SPRING) : coords.x,
      y: coords.y === 0 ? spring(coords.y, SPRING) : coords.y,
    }),
    [coords.x, coords.y],
  );

  const draggableClass = classnames('ui__base ui__draggable', className);

  return (
    <Motion style={motionStyle}>
      {({ x, y }) => (
        <div
          {...divProps}
          ref={divRef}
          className={draggableClass}
          style={{
            ...style,
            zIndex: isDragging ? 2 : undefined,
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
