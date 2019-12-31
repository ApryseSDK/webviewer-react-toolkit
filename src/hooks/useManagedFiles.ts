import { useCallback, useState, useMemo } from 'react';
import { File } from '../data/file';

export interface UseManagedFilesOptions {
  initialFiles?: File[];
  preventMultiDrag?: boolean;
}

function useManagedFiles(options: UseManagedFilesOptions = {}) {
  const { initialFiles, preventMultiDrag } = options;

  const [files, setFiles] = useState(initialFiles ?? []);

  const moveFile = useCallback((fromIndex: number, toIndex: number) => {
    setFiles(prev => {
      const clone = prev.slice();
      const item = clone.splice(fromIndex, 1)[0];
      clone.splice(toIndex, 0, item);
      return clone;
    });
  }, []);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const toggleSelectedId = useCallback((id: string) => {
    setSelectedIds(prev => {
      const prevIndex = prev.indexOf(id);
      if (prevIndex === -1) return [...prev, id];
      if (prevIndex !== -1) return [...prev.slice(0, prevIndex), ...prev.slice(prevIndex + 1)];
      return prev;
    });
  }, []);

  const [dragging, setDragging] = useState<{ files: File[]; target: File }>();
  const onDragChange = useCallback(
    (id?: string) => {
      // When drag ends, if dragging was set, insert dragging items back into
      // files array.
      if (!id) {
        if (dragging) {
          const newIndex = files.indexOf(dragging.target);
          setFiles(prev => [...prev.slice(0, newIndex), ...dragging.files, ...prev.slice(newIndex + 1)]);
          setDragging(undefined);
        }
        return;
      }

      // Do nothing if no selected items.
      if (selectedIds.length === 0) return;

      // Unselect all items if drag begins on non-selected item.
      if (!selectedIds.includes(id)) {
        setSelectedIds([]);
        return;
      }

      // If multidrag is disabled and more than one item is selected, reduce to
      // only dragged item.
      if (preventMultiDrag && selectedIds.length > 1) {
        setSelectedIds([id]);
        return;
      }

      // If drag begins on selected item and there are multiple, remove files
      // from DOM, and add to dragging list for placement when drag ends.
      if (!preventMultiDrag && selectedIds.length > 1) {
        let target: File;
        const newFiles: File[] = [];
        const newDraggingFiles: File[] = [];

        files.forEach(file => {
          if (!selectedIds.includes(file.id)) {
            // Keep all unselected files in the files array.
            newFiles.push(file);
          } else {
            // Add selected files to the dragging array.
            newDraggingFiles.push(file);
            // Set matching file as target.
            if (file.id === id) target = file;
          }
        });

        const targetIndex = files.indexOf(target!);
        newFiles.splice(targetIndex, 0, target!);
        setFiles(newFiles);
        setDragging({ files: newDraggingFiles, target: target! });
      }
    },
    [preventMultiDrag, dragging, files, selectedIds],
  );

  const managedFiles = useMemo(
    () => ({
      files,
      moveFile,
      selectedIds,
      toggleSelectedId,
      onDragChange,
    }),
    [files, moveFile, onDragChange, selectedIds, toggleSelectedId],
  );

  return managedFiles;
}

export default useManagedFiles;
