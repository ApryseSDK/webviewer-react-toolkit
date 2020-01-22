import classnames from 'classnames';
import React, {
  createRef,
  CSSProperties,
  Fragment,
  HTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { useCurrentRef } from '../../hooks';
import { getRowAndColumnIndex, getSibling, isScrolledIntoView, ObjectWithId, THUMBNAIL_WIDTH } from '../../utils';
import { DndMultiProvider } from '../DndMultiProvider';
import { Draggable } from '../Draggable';
import { DragLayer, DragLayerProps } from '../DragLayer';
import { MemoAutoSizer } from './MemoAutoSizer';

/* eslint-disable jsx-a11y/interactive-supports-focus */

export interface FileOrganizerProps<F> extends HTMLAttributes<HTMLDivElement> {
  /**
   * A list of files to render out within the page organizer.
   */
  files: F[];
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
   * If the number of files exceeds this threshold, will virtualize the files
   * outside of the view in order to prevent jank when rendering out your
   * thumbnails. This will also allow for lazy loading of thumbnails that are
   * out of view.
   * @default 50
   */
  virtualizeThreshold?: number;
  /**
   * Prevents clicking on background to deselect all items. Can still use
   * `escape` key.
   */
  preventClickAwayDeselect?: boolean;
  /**
   * On render function for generating the thumbnails for the page organizer.
   * If you do not want to build your own, try using the `Thumbnail` component.
   */
  onRenderThumbnail: (onRenderProps: OnRenderThumbnailProps<F>) => ReactNode;
  /**
   * If provided, will call to render a custom drag layer while a thumbnail is
   * being dragged. Otherwise will show a preview of the thumbnail.
   */
  onRenderDragLayer?: () => ReactNode;
  /**
   * Callback fired when a file is moved within the page organizer.
   */
  onMove?: (fromIndex: number, toIndex: number) => void;
  /**
   * Called whenever dragging begins or ends. If drag ends, the id will be
   * undefined.
   */
  onDragChange?: (id?: string) => void;
  /**
   * Called whenever `escape` key is pressed while focusing the file organizer,
   * or if background of organizer is clicked.
   */
  onDeselectAll?: () => void;
  /**
   * Called whenever all items are selected at once (usually `ctrl` or `command`
   * + `A`).
   */
  onSelectAll?: () => void;
}

export interface OnRenderThumbnailProps<F> {
  /**
   * This can be spread directly to the `Thumbnail`.
   */
  onRenderThumbnailProps: {
    /** The file to render into a thumbnail. */
    file: F;
    /** Is this file being dragged currently. */
    dragging: boolean;
    /** Are other files being dragged other than this one. */
    otherDragging: boolean;
    /** Callback for setting whether the thumbnail is in editing mode. */
    onEditingChange: (isEditing: boolean) => void;
    /** Is this thumbnail shown on initial load. Use to turn off throttling. */
    isShownOnLoad: boolean;
  };
  /** ID of the file. */
  id: string;
  /** The index of this file within the file organizer. */
  index: number;
}

export function FileOrganizer<F extends ObjectWithId>({
  files,
  onMove,
  onDragChange,
  onDeselectAll,
  onSelectAll,
  onRenderThumbnail,
  onRenderDragLayer,
  disableMove,
  preventArrowsToMove,
  virtualizeThreshold = 50,
  preventClickAwayDeselect,
  className,
  onClick,
  onKeyDown,
  ...divProps
}: FileOrganizerProps<F>) {
  const fileOrganizerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<Grid>(null);

  const isVirtualized = files.length >= virtualizeThreshold;

  const [columnCount, setColumnCount] = useState(0);

  const [editingId, setEditingId] = useState<string>();
  const [draggingId, setDraggingId] = useState<string>();

  const onDragChangeRef = useCurrentRef(onDragChange);
  useEffect(() => {
    onDragChangeRef.current?.(draggingId);
  }, [draggingId, onDragChangeRef]);

  // Detect all shown items and set as array of IDs to notify onRenderThumbnail.
  // Set to null if all IDs are shown (no virtualization).
  const [initialShownIds, setInitialShownIds] = useState<string[] | null>([]);
  useEffect(() => {
    if (!isVirtualized) return setInitialShownIds(null);
    requestAnimationFrame(() => {
      if (!fileOrganizerRef.current) return;
      const itemsInView = fileOrganizerRef.current.querySelectorAll('div[draggable="true"]');
      const ids: string[] = [];
      itemsInView.forEach(draggableItem => ids.push(draggableItem.id));
      setInitialShownIds(ids);
    });
  }, [isVirtualized]);

  const handleItemKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, index: number, _file: F, draggableRef: RefObject<HTMLDivElement>) => {
      if (preventArrowsToMove || disableMove || editingId !== undefined || !onMove) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      const indexDiff = event.key === 'ArrowLeft' ? -1 : 1;

      onMove(index, index + indexDiff);
      event.preventDefault();

      const newLocation = getSibling(draggableRef.current, indexDiff);
      const { isVisible, isAbove, isBelow } = isScrolledIntoView(newLocation, fileOrganizerRef.current);

      if (isVisible) return;

      // Use scrollIntoView for non-virtualized items.
      if (!isVirtualized) {
        if (isAbove) newLocation?.scrollIntoView(true);
        if (isBelow) newLocation?.scrollIntoView(false);
        return;
      }

      if (!gridRef.current) return;

      // Use react-window scrollToItem api for virtualized items.
      const { rowIndex } = getRowAndColumnIndex(index + indexDiff, columnCount);
      gridRef.current.scrollToItem({ align: 'smart', rowIndex });
    },
    [editingId, disableMove, onMove, preventArrowsToMove, isVirtualized, columnCount],
  );

  const renderItem = useCallback(
    (file: F | undefined, index: number, style?: CSSProperties) => {
      if (!file) return <Fragment key={'__null'}>{null}</Fragment>;
      const isEditing = editingId === file.id;
      const otherDragging = draggingId !== undefined && draggingId === file.id;
      const draggableRef = createRef<HTMLDivElement>();
      return (
        <Draggable
          key={file.id}
          id={file.id}
          index={index}
          style={style}
          ref={draggableRef}
          hideDragPreview={!!onRenderDragLayer}
          onDragChange={isDragging => setDraggingId(isDragging ? file.id : undefined)}
          disableDrag={isEditing || disableMove}
          onMove={onMove}
          onKeyDown={e => handleItemKeyDown(e, index, file, draggableRef)}
          onRenderChildren={isDragging => {
            return onRenderThumbnail({
              onRenderThumbnailProps: {
                file,
                dragging: isDragging,
                otherDragging,
                onEditingChange: editing => setEditingId(editing ? file.id : undefined),
                isShownOnLoad: !initialShownIds || initialShownIds.includes(file.id),
              },
              id: file.id,
              index,
            });
          }}
        />
      );
    },
    [
      disableMove,
      draggingId,
      editingId,
      handleItemKeyDown,
      onMove,
      onRenderDragLayer,
      onRenderThumbnail,
      initialShownIds,
    ],
  );

  const handleOnClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    event => {
      onClick?.(event);
      if (!preventClickAwayDeselect && event.target === fileOrganizerRef.current) onDeselectAll?.();
    },
    [onDeselectAll, onClick, preventClickAwayDeselect],
  );

  const handleOnKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    event => {
      onKeyDown?.(event);
      if (event.key === 'Escape') return onDeselectAll?.();
      if (event.key === 'a' && event.metaKey) {
        onSelectAll?.();
        event.preventDefault();
      }
    },
    [onDeselectAll, onSelectAll, onKeyDown],
  );

  const customDragLayerTranslate = useCallback<NonNullable<DragLayerProps['customTranslate']>>(({ mousePosition }) => {
    const x = mousePosition.x - THUMBNAIL_WIDTH / 2;
    const y = mousePosition.y - THUMBNAIL_WIDTH / 2;
    return { x, y };
  }, []);

  const fileOrganizerClass = classnames(
    'ui__base ui__fileOrganizer',
    { 'ui__fileOrganizer--virtualized': isVirtualized },
    className,
  );

  return (
    <DndMultiProvider>
      <div
        {...divProps}
        className={fileOrganizerClass}
        ref={fileOrganizerRef}
        onClick={handleOnClick}
        onKeyDown={handleOnKeyDown}
        role="grid"
      >
        {isVirtualized ? (
          <MemoAutoSizer ref={gridRef} files={files} renderItem={renderItem} onColumnCountChange={setColumnCount} />
        ) : (
          files.map((file, index) => renderItem(file, index))
        )}
        {onRenderDragLayer ? (
          <DragLayer customTranslate={customDragLayerTranslate}>{onRenderDragLayer()}</DragLayer>
        ) : null}
      </div>
    </DndMultiProvider>
  );
}
