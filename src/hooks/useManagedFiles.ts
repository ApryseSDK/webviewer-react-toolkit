import { useCallback, useMemo, useState } from 'react';
import { File } from '../data/file';

export interface UseManagedFilesOptions {
  initialFiles?: File[];
  preventMultiDrag?: boolean;
}

function replaceTargetWithItems<I>(prev: I[], items: I[], target: I) {
  const newIndex = prev.indexOf(target);
  return [...prev.slice(0, newIndex), ...items, ...prev.slice(newIndex + 1)];
}

/**
 * Separates the ids from the main list and returns separated and remaining.
 * @param allItems
 * @param separateIds
 */
function separateItemsById<I extends { id: string }>(allItems: I[], separateIds: string[]): [I[], I[]] {
  const separated: I[] = [];
  const remaining: I[] = [];

  allItems.forEach(item => {
    if (!separateIds.includes(item.id)) {
      // Keep all unselected files in the files array.
      remaining.push(item);
    } else {
      // Add selected files to the dragging array.
      separated.push(item);
    }
  });

  return [separated, remaining];
}

/**
 * Separates the ids from the main list, but also re-inserts the target back
 * into the remaining items and returns it if it exists.
 * @param allItems
 * @param separateIds
 * @param targetId
 */
function separateItemsWithTarget<I extends { id: string }>(
  allItems: I[],
  separateIds: string[],
  targetId: string,
): [I[], I[], I | undefined] {
  const [separated, remaining] = separateItemsById(allItems, separateIds);

  const target = allItems.find(item => item.id === targetId);
  if (target) {
    const targetIndex = allItems.indexOf(target!);
    remaining.splice(targetIndex, 0, target!);
  }

  return [separated, remaining, target];
}

// function insertItemsWithTargetAtIndex<I extends { id: string }>(prev: I[], items: I[], target: I, index: number): I[] {
// }

/**
 *
 * @param options
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
      // files array.
      if (!id) {
        if (dragging) {
          setFiles(prev => replaceTargetWithItems(prev, dragging.files, dragging.target));
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
        setFiles(newFiles);
        setDragging({ files: newDraggingFiles, target: target! });
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
          const [filesToMove, remainingFiles] = separateItemsById(prev, selectedIds);
          return [...remainingFiles.slice(0, toIndex), ...filesToMove, ...remainingFiles.slice(toIndex)];
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
      numDraggingFiles: dragging?.files.length,
    }),
    [files, moveFile, onDragChange, selectedIds, toggleSelectedId, unselectAll, dragging],
  );

  return managedFiles;
}

export default useManagedFiles;
