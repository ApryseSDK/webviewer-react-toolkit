import classnames from 'classnames';
import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Motion, PlainStyle, spring, SpringHelperConfig } from 'react-motion';
import { useCurrentRef } from '../../hooks';
import { getSibling } from '../../utils';

const ItemTypes = { Draggable: 'draggable' };

export interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The current index of the draggable wrapper.
   */
  index: number;
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
  /**
   * Prevent the move-to-location animation of this draggable.
   */
  preventAnimation?: boolean;
  /**
   * Call instead of providing children if you wish to use the `isDragging`
   * prop.
   * @param isDragging Is the child dragging.
   */
  onRenderChildren?(isDragging: boolean): ReactNode;
  /**
   * If given, will be called any time the draggable wrapper is moved. Returns
   * whether the move was successful.
   * @param fromIndex The previous index of the item.
   * @param toIndex The next index of the item.
   */
  onMove?(fromIndex: number, toIndex: number): boolean;
  /**
   * Called whenever the dnd property `isDragging` changes.
   * @param isDragging Is the child dragging.
   */
  onDragChange?(isDragging: boolean): void;
}

interface DragItem extends DragObjectWithType {
  index: number;
}

// Quick animation with no "bounce".
const SPRING: SpringHelperConfig = { stiffness: 300, damping: 30 };

export const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  (
    {
      index,
      disableDrag,
      hideDragPreview,
      preventAnimation,
      onRenderChildren,
      onMove,
      onDragChange,
      children,
      className,
      ...divProps
    },
    ref,
  ) => {
    const draggableRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => draggableRef.current!);

    /* --- Drag and drop settings. --- */

    const [, drop] = useDrop({
      accept: ItemTypes.Draggable,
      hover(dragItem: DragItem) {
        // Previous index.
        const fromIndex = dragItem.index;

        // Index it has been dragged to.
        const toIndex = index;

        // Cancel if index has not changed.
        if (fromIndex === toIndex) return;

        // Call onMove when index changes.
        const success = onMove?.(fromIndex, toIndex);

        // Set the item index to be the new index.
        if (success) dragItem.index = toIndex;
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

    // Call onDragChange whenever isDragging changes.
    const onDragChangeRef = useCurrentRef(onDragChange);
    useEffect(() => {
      if (isDragging && onDragChangeRef.current) {
        onDragChangeRef.current?.(true);
        return () => onDragChangeRef.current?.(false); // eslint-disable-line react-hooks/exhaustive-deps
      }
      return;
    }, [isDragging, onDragChangeRef]);

    drag(drop(draggableRef));

    /* --- Animation settings. --- */

    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const prevIndex = useRef(index);

    // Find the difference in position between new index and previous index. Then,
    // get the difference in position and set that as the starting point for the
    // animation.
    useEffect(() => {
      if (!draggableRef.current) return;

      // Get sibling that occupies previous spot to find params.
      const indexDiff = prevIndex.current - index;
      const prev = getSibling(draggableRef.current, indexDiff);

      // Get the coordinates of the previous item.
      const { left: prevLeft, top: prevTop } = prev?.getBoundingClientRect() ?? {};

      // Get the coordinates of the current item.
      const { left, top } = draggableRef.current.getBoundingClientRect();

      // Get the deltas.
      const deltaX = prevLeft === undefined ? 0 : prevLeft - left;
      const deltaY = prevTop === undefined ? 0 : prevTop - top;

      // Set the coordinates to the distance.
      setCoords({ x: deltaX / 6, y: deltaY / 6 });

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
        x: coords.x === 0 && !isDragging && !preventAnimation ? spring(coords.x, SPRING) : coords.x,
        y: coords.y === 0 && !isDragging && !preventAnimation ? spring(coords.y, SPRING) : coords.y,
      }),
      [coords.x, coords.y, preventAnimation, isDragging],
    );

    const draggableClass = classnames('ui__base ui__draggable', className);

    const onMotionRender = useCallback(
      ({ x, y }: PlainStyle) => {
        const inMotion = !!(x || y);

        return (
          <div {...divProps} ref={draggableRef} className={draggableClass}>
            <div
              style={{
                WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                transform: `translate3d(${x}px, ${y}px, 0)`,
              }}
              className={classnames('ui__draggable__animated', {
                'ui__draggable__animated--inMotion': inMotion,
              })}
            >
              {onRenderChildren ? onRenderChildren(isDragging) : children}
            </div>
          </div>
        );
      },
      [children, divProps, draggableClass, isDragging, onRenderChildren],
    );

    return <Motion style={motionStyle}>{onMotionRender}</Motion>;
  },
);
