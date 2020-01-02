import { useCallback, useMemo, useState } from 'react';
import { File } from '../data/file';
import { separateItemsWithTarget, moveMultiFromIndexToIndex } from '../utils/arrayUtils';

export interface UseManagedFilesOptions {
  initialFiles?: File[];
  preventMultiDrag?: boolean;
}

/**
 * Combines most of the necessary functionality to manage files for the
 * `FileOrganizer` component.
 * @param options Options for managing files.
 */
function useManagedFiles(options: UseManagedFilesOptions = {}) {
  const { initialFiles, preventMultiDrag } = options;

  const [files, setFiles] = useState(initialFiles ?? []);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const toggleSelectedId = useCallback((id: string) => {
    setSelectedIds(prev => {
      const prevIndex = prev.indexOf(id);
      if (prevIndex === -1) return [...prev, id];
      if (prevIndex !== -1) return [...prev.slice(0, prevIndex), ...prev.slice(prevIndex + 1)];
      return prev;
    });
  }, []);
  const unselectAll = useCallback(() => setSelectedIds([]), []);

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

      // Unselect all items if drag begins on non-selected item.
      if (!selectedIds.includes(id)) return setSelectedIds([]);

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

  const moveFile = useCallback(
    (fromIndex: number, toIndex: number) => {
      const fromFile = files[fromIndex];

      if (!fromFile) return;

      if (!selectedIds.includes(fromFile.id)) {
        setSelectedIds([]);
      } else if (preventMultiDrag && selectedIds.length > 1) {
        setSelectedIds([fromFile.id]);
      }

      // If preventMultiDrag is false, selectedIds is many, dragging is undefined
      setFiles(prev => {
        if (!preventMultiDrag && selectedIds.includes(fromFile.id) && selectedIds.length > 1 && !dragging) {
          return moveMultiFromIndexToIndex(prev, selectedIds, fromIndex, toIndex);
        }

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
      onDragChange,
      draggingFiles: dragging?.files,
    }),
    [files, moveFile, onDragChange, selectedIds, toggleSelectedId, unselectAll, dragging],
  );

  return managedFiles;
}

export default useManagedFiles;
