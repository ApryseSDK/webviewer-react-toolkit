import { Dispatch, MouseEvent, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { moveMultiFromIndexToIndex, ObjectWithId } from '../utils';

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
   * Prevent multi select with shift or command/control.
   */
  preventMultiSelect?: boolean;
  /**
   * Prevent selecting the item you are currently dragging.
   */
  preventSelectOnDrag?: boolean;
  /**
   * Prevent deselecting all selected items when you drag an unselected item.
   */
  preventDeselectOnDragOther?: boolean;
  /**
   * Allows multi-select by clicking other files without holding command/control.
   */
  easyMultiSelect?: boolean;
}

export interface UseManagedFilesOutput<F> {
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
  draggingIds: string[];
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
    onMove(fromIndex: number, toIndex: number): boolean;
    onDragChange(id?: string): void;
    onDeselectAll(): void;
    onSelectAll(): void;
    draggingIds: string[];
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
export function useManagedFiles<F extends ObjectWithId>({
  initialFiles,
  preventMultiDrag,
  preventDeselectOnDragOther,
  preventSelectOnDrag,
  preventMultiSelect,
  easyMultiSelect,
}: UseManagedFilesOptions<F> = {}) {
  const [files, setFiles] = useState(initialFiles ?? []);

  const addFile = useCallback((file: F, index?: number) => {
    setFiles((prev) => {
      if (prev.includes(file)) return prev;
      if (index === undefined) return [...prev, file];
      return [...prev.slice(0, index), file, ...prev.slice(index)];
    });
  }, []);

  const removeFile = useCallback((file: F) => setFiles((prev) => prev.filter((f) => f !== file)), []);

  /* --- Selection. --- */

  // Note: this is also an ordered stack, with the most recently selected last.
  // This allows us to do shift-range selection from the most recent.
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectedId = useCallback(
    (id: string, event?: MouseEvent<HTMLElement>) => {
      const multiKey = !preventMultiSelect && (event?.ctrlKey || event?.metaKey || false);
      const rangeKey = !preventMultiSelect && (event?.shiftKey || false);

      setSelectedIds((prev) => {
        const toggleIndex = prev.indexOf(id);

        if (!multiKey && rangeKey && prev.length) {
          const lastSelectedIndex = files.findIndex((f) => f.id === prev[prev.length - 1]);
          const toggleFileIndex = files.findIndex((f) => f.id === id);

          let selectedFiles: F[] = [];

          if (toggleFileIndex < lastSelectedIndex) {
            selectedFiles = files.slice(toggleFileIndex, lastSelectedIndex + 1);
          } else {
            selectedFiles = files.slice(lastSelectedIndex, toggleFileIndex + 1).reverse();
          }

          return selectedFiles.map((f) => f.id);
        }

        if (toggleIndex === -1) {
          if (easyMultiSelect || multiKey) return [...prev, id];
          return [id];
        }
        if (toggleIndex !== -1) {
          if (easyMultiSelect || multiKey) return [...prev.slice(0, toggleIndex), ...prev.slice(toggleIndex + 1)];
          if (prev.length > 1) return [id];
          return [];
        }
        return prev;
      });
    },
    [easyMultiSelect, files, preventMultiSelect],
  );

  const onDeselectAll = useCallback(() => setSelectedIds([]), []);

  const onSelectAll = useCallback(() => setSelectedIds(files.map((file) => file.id)), [files]);

  const _setMovingSelectedId = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        if (prev.includes(id)) return prev;
        if (preventDeselectOnDragOther) return preventSelectOnDrag ? prev : [...prev, id];
        return preventSelectOnDrag ? [] : [id];
      });
    },
    [preventDeselectOnDragOther, preventSelectOnDrag],
  );

  /* --- Multiple drag items. --- */

  const [draggingIds, setDraggingIds] = useState<string[]>([]);
  const onDragChange = useCallback(
    (id?: string) => {
      if (!id) return setDraggingIds([]);

      if (selectedIds.length === 0) return;

      _setMovingSelectedId(id);

      if (!preventMultiDrag) {
        const toDragIds = selectedIds.includes(id) ? selectedIds : [id];
        setDraggingIds(toDragIds);
      } else {
        setDraggingIds([id]);
      }
    },
    [selectedIds, _setMovingSelectedId, preventMultiDrag],
  );

  /* --- Moving items. --- */

  const onMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      const fromFile = files[fromIndex];
      if (!fromFile) return false;

      // Update selections.
      _setMovingSelectedId(fromFile.id);

      // If multi drag is permitted, and multiple items are selected, and
      // there are no items being dragged, do a multi move. This will be a
      // keyboard-specific operation, as multi dragging is managed by the
      // dragging handlers.
      if (!preventMultiDrag && selectedIds.includes(fromFile.id) && selectedIds.length > 1) {
        const next = moveMultiFromIndexToIndex(files, selectedIds, fromIndex, toIndex);
        if (next === files) return false;
        setFiles(next);
        return true;
      }

      // Don't allow "wrapping".
      if (toIndex < 0 || toIndex >= files.length) return false;

      const clone = files.slice();
      const item = clone.splice(fromIndex, 1)[0];
      clone.splice(toIndex, 0, item);
      setFiles(clone);
      return true;
    },
    [_setMovingSelectedId, files, preventMultiDrag, selectedIds],
  );

  // Remove selected items if the file is removed.
  useEffect(() => {
    setSelectedIds((prev) => {
      const toRemove = new Set(prev);
      files.forEach((file) => {
        if (toRemove.has(file.id)) toRemove.delete(file.id);
      });
      return prev.filter((id) => !toRemove.has(id));
    });
  }, [files]);

  const managedFiles = useMemo<UseManagedFilesOutput<F>>(
    () => ({
      fileOrganizerProps: {
        files,
        onMove,
        onDragChange,
        onDeselectAll,
        onSelectAll,
        draggingIds: draggingIds,
      },
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
      draggingIds,
    }),
    [
      addFile,
      draggingIds,
      files,
      onMove,
      onDragChange,
      removeFile,
      onSelectAll,
      selectedIds,
      toggleSelectedId,
      onDeselectAll,
    ],
  );

  return managedFiles;
}
