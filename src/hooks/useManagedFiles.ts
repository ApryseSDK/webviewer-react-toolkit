import { Dispatch, MouseEvent, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { moveMultiFromIndexToIndex, ObjectWithId, separateItemsWithTarget } from '../utils';

export interface UseManagedFilesOptions<F> {
  /**
   * The initial files for managing.
   */
  initialFiles?: F[];
  /**
   * Prevent multiple items from being dragged.
   */
  preventMultiDrag?: boolean;
  /**
   * Allows multi-select without pressing the shift key.
   */
  selectWithoutShift?: boolean;
}

interface UseManagedFilesOutput<F> {
  /**
   * An array of files.
   */
  files: F[];
  /**
   * Do any state manipulation on the files array.
   */
  setFiles: Dispatch<SetStateAction<F[]>>;
  /**
   * An array of every selected ID.
   */
  selectedIds: string[];
  /**
   * Do any state manipulation on the selected IDs array.
   */
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  /**
   * Toggle whether an ID is selected or not.
   * @param id The ID of the selected item to toggle.
   * @param event If provided, will only allow multi-select when shiftKey is true.
   */
  toggleSelectedId(id: string, event?: MouseEvent<HTMLElement>): void;
  /**
   * The number if files being dragged. Can be used to render a drag layer.
   */
  draggingFiles?: F[];
  /**
   * Simply add a file at the index, or to the end if not provided.
   * @param file The file to add.
   * @param index The index to add at.
   */
  addFile(file: F, index?: number): void;
  /**
   * Remove the provided file from the files array.
   * @param file The file to remove.
   */
  removeFile(file: F): void;
  /**
   * You can spread these directly to `FileOrganizer`.
   */
  fileOrganizerProps: {
    files: F[];
    onMove(fromIndex: number, toIndex: number): void;
    onDragChange(id?: string): void;
    onCancelSelect(): void;
    onSelectAll(): void;
  };
  /**
   * You can spread the result of this function directly to `Thumbnail`. It has
   * a boolean for whether the `Thumbnail` is selected, as well as an `onClick`
   * function to select it.
   * @param id The `File` id for the thumbnail.
   */
  getThumbnailSelectionProps(id: string): { selected: boolean; onClick: (event: MouseEvent<HTMLElement>) => void };
}

/**
 * Combines most of the necessary functionality to manage files for the
 * `FileOrganizer` component.
 * @param options Options for managing files.
 */
export function useManagedFiles<F extends ObjectWithId>(options: UseManagedFilesOptions<F> = {}) {
  const { initialFiles, preventMultiDrag } = options;

  const [files, setFiles] = useState(initialFiles ?? []);

  const addFile = useCallback((file: F, index?: number) => {
    setFiles(prev => {
      if (prev.includes(file)) return prev;
      if (index === undefined) return [...prev, file];
      return [...prev.slice(0, index), file, ...prev.slice(index)];
    });
  }, []);

  const removeFile = useCallback((file: F) => {
    setFiles(prev => prev.filter(f => f !== file));
  }, []);

  /* --- Selection. --- */

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectedId = useCallback(
    (id: string, event?: MouseEvent<HTMLElement>) => {
      const canToggle = options.selectWithoutShift || (event ? event.shiftKey : true);
      setSelectedIds(prev => {
        const toggleIndex = prev.indexOf(id);
        if (toggleIndex === -1) {
          if (canToggle) return [...prev, id];
          return [id];
        }
        if (toggleIndex !== -1) {
          if (canToggle) return [...prev.slice(0, toggleIndex), ...prev.slice(toggleIndex + 1)];
          if (prev.length > 1) return [id];
          return [];
        }
        return prev;
      });
    },
    [options.selectWithoutShift],
  );

  const onCancelSelect = useCallback(() => setSelectedIds([]), []);

  const onSelectAll = useCallback(() => setSelectedIds(files.map(file => file.id)), [files]);

  /* --- Multiple drag items. --- */

  const [dragging, setDragging] = useState<{ files: F[]; target: F }>();
  const onDragChange = useCallback(
    (id?: string) => {
      // When drag ends, if dragging was set, insert dragging items back into
      // files array, replacing target.
      if (!id) {
        if (dragging) {
          setFiles(prev => {
            const newIndex = prev.indexOf(dragging.target);
            return [...prev.slice(0, newIndex), ...dragging.files, ...prev.slice(newIndex + 1)];
          });
          setDragging(undefined);
        }
        return;
      }

      // Do nothing if no selected items.
      if (selectedIds.length === 0) return;

      // Select dragging item if drag begins on unselected.
      if (!selectedIds.includes(id)) {
        return setSelectedIds([id]);
      }

      // If multidrag is disabled and more than one item is selected, reduce to
      // only dragged item.
      if (preventMultiDrag && selectedIds.length > 1) {
        return setSelectedIds([id]);
      }

      // If drag begins on selected item and there are multiple, remove files
      // from DOM, and add to dragging list for placement when drag ends.
      if (!preventMultiDrag && selectedIds.length > 1) {
        const [newDraggingFiles, newFiles, target] = separateItemsWithTarget(files, selectedIds, id);
        setDragging({ files: newDraggingFiles, target: target! });
        // FIX: prevents multi-drag errors on virtualized lists.
        requestAnimationFrame(() => setFiles(newFiles));
      }
    },
    [preventMultiDrag, dragging, files, selectedIds],
  );

  /* --- Moving items. --- */

  const onMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      const fromFile = files[fromIndex];
      if (!fromFile) return;

      // Select only moved file if previously unselected, or if multi drag is off.
      if (!selectedIds.includes(fromFile.id) || (preventMultiDrag && selectedIds.length > 1)) {
        setSelectedIds([fromFile.id]);
      }

      setFiles(prev => {
        // If multi drag is permitted, and multiple items are selected, and
        // there are no items being dragged, do a multi move. This will be a
        // keyboard-specific operation, as multi dragging is managed by the
        // dragging handlers.
        if (!preventMultiDrag && selectedIds.includes(fromFile.id) && selectedIds.length > 1 && !dragging) {
          return moveMultiFromIndexToIndex(prev, selectedIds, fromIndex, toIndex);
        }

        // Don't allow "wrapping".
        if (toIndex < 0 || toIndex >= prev.length) return prev;

        const clone = prev.slice();
        const item = clone.splice(fromIndex, 1)[0];
        clone.splice(toIndex, 0, item);
        return clone;
      });
    },
    [dragging, files, preventMultiDrag, selectedIds],
  );

  // Remove selected items if the file is removed.
  useEffect(() => {
    // Do nothing if dragging.
    if (dragging !== undefined) return;
    setSelectedIds(prev => {
      const toRemove = new Set(prev);
      files.forEach(file => {
        if (toRemove.has(file.id)) toRemove.delete(file.id);
      });
      return prev.filter(id => !toRemove.has(id));
    });
  }, [files, dragging]);

  const managedFiles = useMemo<UseManagedFilesOutput<F>>(
    () => ({
      fileOrganizerProps: { files, onMove, onDragChange, onCancelSelect, onSelectAll },
      getThumbnailSelectionProps: (id: string) => ({
        selected: selectedIds.includes(id),
        onClick: (event: MouseEvent<HTMLElement>) => toggleSelectedId(id, event),
      }),
      files,
      setFiles,
      selectedIds,
      setSelectedIds,
      toggleSelectedId,
      addFile,
      removeFile,
      draggingFiles: dragging?.files,
    }),
    [
      addFile,
      dragging,
      files,
      onMove,
      onDragChange,
      removeFile,
      onSelectAll,
      selectedIds,
      toggleSelectedId,
      onCancelSelect,
    ],
  );

  return managedFiles;
}
