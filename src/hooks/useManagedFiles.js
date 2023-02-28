'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useManagedFiles = void 0;
var tslib_1 = require('tslib');
var react_1 = require('react');
var utils_1 = require('../utils');
/**
 * Combines most of the necessary functionality to manage files for the
 * `FileOrganizer` component.
 * @param options Options for managing files.
 */
function useManagedFiles(_a) {
  var _b = _a === void 0 ? {} : _a,
    initialFiles = _b.initialFiles,
    preventMultiDrag = _b.preventMultiDrag,
    preventDeselectOnDragOther = _b.preventDeselectOnDragOther,
    preventSelectOnDrag = _b.preventSelectOnDrag,
    preventMultiSelect = _b.preventMultiSelect,
    easyMultiSelect = _b.easyMultiSelect;
  var _c = (0, react_1.useState)(
      initialFiles !== null && initialFiles !== void 0 ? initialFiles : [],
    ),
    files = _c[0],
    setFiles = _c[1];
  var addFile = (0, react_1.useCallback)(function(file, index) {
    setFiles(function(prev) {
      if (prev.includes(file)) return prev;
      if (index === undefined)
        return tslib_1.__spreadArray(
          tslib_1.__spreadArray([], prev, true),
          [file],
          false,
        );
      return tslib_1.__spreadArray(
        tslib_1.__spreadArray(
          tslib_1.__spreadArray([], prev.slice(0, index), true),
          [file],
          false,
        ),
        prev.slice(index),
        true,
      );
    });
  }, []);
  var removeFile = (0, react_1.useCallback)(function(file) {
    return setFiles(function(prev) {
      return prev.filter(function(f) {
        return f !== file;
      });
    });
  }, []);
  /* --- Selection. --- */
  // Note: this is also an ordered stack, with the most recently selected last.
  // This allows us to do shift-range selection from the most recent.
  var _d = (0, react_1.useState)([]),
    selectedIds = _d[0],
    setSelectedIds = _d[1];
  var toggleSelectedId = (0, react_1.useCallback)(
    function(id, event) {
      var multiKey =
        !preventMultiSelect &&
        ((event === null || event === void 0 ? void 0 : event.ctrlKey) ||
          (event === null || event === void 0 ? void 0 : event.metaKey) ||
          false);
      var rangeKey =
        !preventMultiSelect &&
        ((event === null || event === void 0 ? void 0 : event.shiftKey) ||
          false);
      setSelectedIds(function(prev) {
        var toggleIndex = prev.indexOf(id);
        if (!multiKey && rangeKey && prev.length) {
          var lastSelectedIndex = files.findIndex(function(f) {
            return f.id === prev[prev.length - 1];
          });
          var toggleFileIndex = files.findIndex(function(f) {
            return f.id === id;
          });
          var selectedFiles = [];
          if (toggleFileIndex < lastSelectedIndex) {
            selectedFiles = files.slice(toggleFileIndex, lastSelectedIndex + 1);
          } else {
            selectedFiles = files
              .slice(lastSelectedIndex, toggleFileIndex + 1)
              .reverse();
          }
          return selectedFiles.map(function(f) {
            return f.id;
          });
        }
        if (toggleIndex === -1) {
          if (easyMultiSelect || multiKey)
            return tslib_1.__spreadArray(
              tslib_1.__spreadArray([], prev, true),
              [id],
              false,
            );
          return [id];
        }
        if (toggleIndex !== -1) {
          if (easyMultiSelect || multiKey)
            return tslib_1.__spreadArray(
              tslib_1.__spreadArray([], prev.slice(0, toggleIndex), true),
              prev.slice(toggleIndex + 1),
              true,
            );
          if (prev.length > 1) return [id];
          return [];
        }
        return prev;
      });
    },
    [easyMultiSelect, files, preventMultiSelect],
  );
  var onDeselectAll = (0, react_1.useCallback)(function() {
    return setSelectedIds([]);
  }, []);
  var onSelectAll = (0, react_1.useCallback)(
    function() {
      return setSelectedIds(
        files.map(function(file) {
          return file.id;
        }),
      );
    },
    [files],
  );
  var _setMovingSelectedId = (0, react_1.useCallback)(
    function(id) {
      setSelectedIds(function(prev) {
        if (prev.includes(id)) return prev;
        if (preventDeselectOnDragOther)
          return preventSelectOnDrag
            ? prev
            : tslib_1.__spreadArray(
                tslib_1.__spreadArray([], prev, true),
                [id],
                false,
              );
        return preventSelectOnDrag ? [] : [id];
      });
    },
    [preventDeselectOnDragOther, preventSelectOnDrag],
  );
  /* --- Multiple drag items. --- */
  var _e = (0, react_1.useState)([]),
    draggingIds = _e[0],
    setDraggingIds = _e[1];
  var onDragChange = (0, react_1.useCallback)(
    function(id) {
      if (!id) return setDraggingIds([]);
      if (selectedIds.length === 0) return;
      _setMovingSelectedId(id);
      if (!preventMultiDrag) {
        var toDragIds = selectedIds.includes(id) ? selectedIds : [id];
        setDraggingIds(toDragIds);
      } else {
        setDraggingIds([id]);
      }
    },
    [selectedIds, _setMovingSelectedId, preventMultiDrag],
  );
  /* --- Moving items. --- */
  var onMove = (0, react_1.useCallback)(
    function(fromIndex, toIndex) {
      var fromFile = files[fromIndex];
      if (!fromFile) return false;
      // Update selections.
      _setMovingSelectedId(fromFile.id);
      // If multi drag is permitted, and multiple items are selected, and
      // there are no items being dragged, do a multi move. This will be a
      // keyboard-specific operation, as multi dragging is managed by the
      // dragging handlers.
      if (
        !preventMultiDrag &&
        selectedIds.includes(fromFile.id) &&
        selectedIds.length > 1
      ) {
        var next = (0, utils_1.moveMultiFromIndexToIndex)(
          files,
          selectedIds,
          fromIndex,
          toIndex,
        );
        if (next === files) return false;
        setFiles(next);
        return true;
      }
      // Don't allow "wrapping".
      if (toIndex < 0 || toIndex >= files.length) return false;
      var clone = files.slice();
      var item = clone.splice(fromIndex, 1)[0];
      clone.splice(toIndex, 0, item);
      setFiles(clone);
      return true;
    },
    [_setMovingSelectedId, files, preventMultiDrag, selectedIds],
  );
  // Remove selected items if the file is removed.
  (0, react_1.useEffect)(
    function() {
      setSelectedIds(function(prev) {
        var toRemove = new Set(prev);
        files.forEach(function(file) {
          if (toRemove.has(file.id)) toRemove.delete(file.id);
        });
        return prev.filter(function(id) {
          return !toRemove.has(id);
        });
      });
    },
    [files],
  );
  var managedFiles = (0, react_1.useMemo)(
    function() {
      return {
        fileOrganizerProps: {
          files: files,
          onMove: onMove,
          onDragChange: onDragChange,
          onDeselectAll: onDeselectAll,
          onSelectAll: onSelectAll,
          draggingIds: draggingIds,
        },
        getThumbnailSelectionProps: function(id) {
          return {
            selected: selectedIds.includes(id),
            onClick: function(event) {
              return toggleSelectedId(id, event);
            },
          };
        },
        files: files,
        setFiles: setFiles,
        selectedIds: selectedIds,
        setSelectedIds: setSelectedIds,
        toggleSelectedId: toggleSelectedId,
        addFile: addFile,
        removeFile: removeFile,
        draggingIds: draggingIds,
      };
    },
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
exports.useManagedFiles = useManagedFiles;
//# sourceMappingURL=useManagedFiles.js.map
