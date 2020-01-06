import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { File } from '../data/file';
import { moveMultiFromIndexToIndex, separateItemsWithTarget } from '../utils/arrayUtils';

export interface UseManagedFilesOptions {
  initialFiles?: File[];
  preventMultiDrag?: boolean;
}

/**
 * Combines most of the necessary functionality to manage files for the
 * `FileOrganizer` component.
 * @param options Options for managing files.
 */
export default function useManagedFiles(options: UseManagedFilesOptions = {}) {
  const { initialFiles, preventMultiDrag } = options;

  const [files, setFiles] = useState(initialFiles ?? []);

  /* --- Selection. --- */

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectedId = useCallback((id: string, event: MouseEvent<HTMLElement>) => {
    const shiftKeyPressed = event.shiftKey;
    setSelectedIds(prev => {
      const toggleIndex = prev.indexOf(id);
      if (toggleIndex === -1) {
        if (shiftKeyPressed) return [...prev, id];
        return [id];
      }
      if (toggleIndex !== -1) {
        if (shiftKeyPressed) return [...prev.slice(0, toggleIndex), ...prev.slice(toggleIndex + 1)];
        if (prev.length > 1) return [id];
        return [];
      }
      return prev;
    });
  }, []);

  const unselectAll = useCallback(() => setSelectedIds([]), []);

  const selectAll = useCallback(() => setSelectedIds(files.map(file => file.id)), [files]);

  /* --- Multiple drag items. --- */

  const [dragging, setDragging] = useState<{ files: File[]; target: File }>();
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
      if (!selectedIds.includes(id)) return setSelectedIds([id]);

      // If multidrag is disabled and more than one item is selected, reduce to
      // only dragged item.
      if (preventMultiDrag && selectedIds.length > 1) return setSelectedIds([id]);

      // If drag begins on selected item and there are multiple, remove files
      // from DOM, and add to dragging list for placement when drag ends.
      if (!preventMultiDrag && selectedIds.length > 1) {
        const [newDraggingFiles, newFiles, target] = separateItemsWithTarget(files, selectedIds, id);
        setDragging({ files: newDraggingFiles, target: target! });
        setFiles(newFiles);
      }
    },
    [preventMultiDrag, dragging, files, selectedIds],
  );

  /* --- Moving items. --- */

  const moveFile = useCallback(
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

  const managedFiles = useMemo(
    () => ({
      files,
      setFiles,
      moveFile,
      selectedIds,
      toggleSelectedId,
      unselectAll,
      selectAll,
      onDragChange,
      draggingFiles: dragging?.files,
    }),
    [files, moveFile, onDragChange, selectAll, selectedIds, toggleSelectedId, unselectAll, dragging],
  );

  return managedFiles;
}
