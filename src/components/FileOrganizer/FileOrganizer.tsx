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
import {
  getRowAndColumnIndex,
  getSibling,
  isScrolledIntoView,
  ObjectWithId,
  THUMBNAIL_WIDTH,
  focusableElementDomString,
} from '../../utils';
import { DndMultiProvider } from '../DndMultiProvider';
import { Draggable } from '../Draggable';
import { DragLayer, DragLayerProps } from '../DragLayer';
import { MemoAutoSizer } from './MemoAutoSizer';

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
   * Prevents clicking on background to deselect all items. Can still use
   * `escape` key.
   */
  preventClickAwayDeselect?: boolean;
  /**
   * The IDs of any files that are being moved along with the primary drag
   * target. Prevents the move-to-location animation of any files with matching
   * IDs, and passes true for `dragging` to the `OnRenderThumbnailProps`.
   */
  draggingIds?: string[];
  /**
   * Use this instead of CSS or `style` to set the outside padding. This is
   * because the virtualization process requires exact padding values to
   * ensure that the elements are positioned properly.
   */
  padding?: number;
  /**
   * On render function for generating the thumbnails for the page organizer.
   * If you do not want to build your own, try using the `Thumbnail` component.
   * @param onRenderProps An object to use in rendering the thumbnail.
   */
  onRenderThumbnail(onRenderProps: OnRenderThumbnailProps<F>): ReactNode;
  /**
   * If provided, will call to render a custom drag layer while a thumbnail is
   * being dragged. Otherwise will show a preview of the thumbnail.
   */
  onRenderDragLayer?(): ReactNode;
  /**
   * Callback fired when a file is moved within the page organizer. Returns
   * whether the move was successful.
   * @param fromIndex The previous index of the item.
   * @param toIndex The next index of the item.
   */
  onMove?(fromIndex: number, toIndex: number): boolean;
  /**
   * Called whenever dragging begins or ends. If drag ends, the id will be
   * undefined.
   * @param id The ID of the dragging item.
   */
  onDragChange?(id?: string): void;
  /**
   * Called whenever `escape` key is pressed while focusing the file organizer,
   * or if background of organizer is clicked.
   */
  onDeselectAll?(): void;
  /**
   * Called whenever all items are selected at once (usually `ctrl` or
   * `command` + `A`).
   */
  onSelectAll?(): void;
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
  preventClickAwayDeselect,
  draggingIds,
  padding,
  className,
  onClick,
  onKeyDown,
  style,
  ...divProps
}: FileOrganizerProps<F>) {
  const fileOrganizerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<Grid>(null);

  const [columnCount, setColumnCount] = useState(0);

  const [editingId, setEditingId] = useState<string>();

  const [draggingId, setDraggingId] = useState<string>();

  // Detect size of first item and use as size throughout.
  const [size, setSize] = useState({ width: THUMBNAIL_WIDTH, height: THUMBNAIL_WIDTH });
  const hasFiles = files.length > 0;
  useEffect(() => {
    if (!fileOrganizerRef.current) return;
    const firstItem = fileOrganizerRef.current.querySelector('div[draggable="true"]');
    if (!firstItem) return;
    const { width, height } = firstItem.getBoundingClientRect();
    setSize(prev => {
      if (prev.width === width && prev.height === height) return prev;
      return { width, height };
    });
  }, [hasFiles]);

  const handleOnDragChange = useCallback(
    (id?: string) => {
      onDragChange?.(id);
      setDraggingId(id);
    },
    [onDragChange],
  );

  const handleItemKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, index: number, _file: F, draggableRef: RefObject<HTMLDivElement>) => {
      let indexDiff = 0;

      switch (event.key) {
        case 'ArrowLeft':
          indexDiff = -1;
          break;
        case 'ArrowRight':
          indexDiff = 1;
          break;
        case 'ArrowUp':
          indexDiff = -1 * columnCount;
          break;
        case 'ArrowDown':
          indexDiff = columnCount;
          break;
        default:
          return; // Return if not one of above keys
      }

      event.preventDefault();

      let hasMoved = false;

      // If meta key was pressed, move to new location.
      if (
        !preventArrowsToMove &&
        (event.metaKey || event.ctrlKey) &&
        !disableMove &&
        editingId === undefined &&
        onMove
      ) {
        hasMoved = true;
        onMove(index, index + indexDiff);
      }

      if (!gridRef.current) return;

      const siblingAtLocation = getSibling(draggableRef.current, indexDiff);

      // If no meta key was pressed, focus item in direction of keys.
      if (siblingAtLocation && !(event.metaKey || event.ctrlKey)) {
        const focusable = siblingAtLocation.querySelector<HTMLElement>(focusableElementDomString);
        if (focusable) {
          hasMoved = true;
          requestAnimationFrame(() => {
            focusable.focus();
          });
        }
      }

      if (!hasMoved) return;

      const { isVisible } = isScrolledIntoView(siblingAtLocation, fileOrganizerRef.current);
      if (isVisible) return;

      // Use react-window scrollToItem api for virtualized items.
      const { rowIndex } = getRowAndColumnIndex(index + indexDiff, columnCount);
      gridRef.current.scrollToItem({ align: 'smart', rowIndex });
    },
    [columnCount, disableMove, editingId, onMove, preventArrowsToMove],
  );

  const pad = Math.max(1, padding || 0);

  const renderItem = useCallback(
    (file: F | undefined, index: number, style?: CSSProperties) => {
      if (!file) return <Fragment key={'__null'}>{null}</Fragment>;
      const isEditing = editingId === file.id;
      const otherDragging = !!(
        (draggingId && draggingId !== file.id) ||
        (draggingIds && draggingIds.length && !draggingIds.includes(file.id))
      );
      const draggableRef = createRef<HTMLDivElement>();
      const isInDragGroup = draggingIds?.includes(file.id) ?? false;
      return (
        <Draggable
          data-file-id={file.id}
          key={file.id}
          index={index}
          style={
            style && {
              ...style,
              top: typeof style.top === 'number' ? style.top + pad : style.top,
              left: typeof style.left === 'number' ? style.left + pad : style.left,
            }
          }
          ref={draggableRef}
          hideDragPreview={!!onRenderDragLayer}
          preventAnimation={isInDragGroup}
          onDragChange={isDragging => handleOnDragChange(isDragging ? file.id : undefined)}
          disableDrag={isEditing || disableMove}
          onMove={onMove}
          onKeyDown={e => handleItemKeyDown(e, index, file, draggableRef)}
          onRenderChildren={isDragging => {
            return onRenderThumbnail({
              onRenderThumbnailProps: {
                file,
                dragging: isDragging || isInDragGroup,
                otherDragging,
                onEditingChange: editing => setEditingId(editing ? file.id : undefined),
              },
              id: file.id,
              index,
            });
          }}
        />
      );
    },
    [
      editingId,
      draggingId,
      draggingIds,
      onRenderDragLayer,
      disableMove,
      onMove,
      pad,
      handleOnDragChange,
      handleItemKeyDown,
      onRenderThumbnail
    ],
  );

  const handleOnClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    event => {
      onClick?.(event);
      if (!preventClickAwayDeselect) onDeselectAll?.();
    },
    [onDeselectAll, onClick, preventClickAwayDeselect],
  );

  const handleOnKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    event => {
      onKeyDown?.(event);
      if (event.key === 'Escape') return onDeselectAll?.();
      if (event.key === 'a' && (event.metaKey || event.ctrlKey)) {
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

  const fileOrganizerClass = classnames('ui__base ui__fileOrganizer', className);

  return (
    <DndMultiProvider>
      <div
        {...divProps}
        className={fileOrganizerClass}
        ref={fileOrganizerRef}
        onClick={handleOnClick}
        onKeyDown={handleOnKeyDown}
        style={style}
        role="grid"
        tabIndex={0}
      >
        <MemoAutoSizer
          ref={gridRef}
          files={files}
          padding={pad}
          size={size}
          renderItem={renderItem}
          onColumnCountChange={setColumnCount}
        />
        {onRenderDragLayer ? (
          <DragLayer customTranslate={customDragLayerTranslate}>
            <div className="ui__fileOrganizer__draglayer" style={{ height: THUMBNAIL_WIDTH, width: THUMBNAIL_WIDTH }}>
              {onRenderDragLayer()}
            </div>
          </DragLayer>
        ) : (
          undefined
        )}
      </div>
    </DndMultiProvider>
  );
}
