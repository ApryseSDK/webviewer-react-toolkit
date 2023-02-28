'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FileOrganizer = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var utils_1 = require('../../utils');
var DndMultiProvider_1 = require('../DndMultiProvider');
var Draggable_1 = require('../Draggable');
var DragLayer_1 = require('../DragLayer');
var MemoAutoSizer_1 = require('./MemoAutoSizer');
var defaultSize = {
  width: utils_1.THUMBNAIL_WIDTH,
  height: utils_1.THUMBNAIL_WIDTH,
};
function FileOrganizer(_a) {
  var files = _a.files,
    onMove = _a.onMove,
    onDragChange = _a.onDragChange,
    onDeselectAll = _a.onDeselectAll,
    onSelectAll = _a.onSelectAll,
    onRenderThumbnail = _a.onRenderThumbnail,
    onRenderDragLayer = _a.onRenderDragLayer,
    disableMove = _a.disableMove,
    preventArrowsToMove = _a.preventArrowsToMove,
    preventClickAwayDeselect = _a.preventClickAwayDeselect,
    draggingIds = _a.draggingIds,
    padding = _a.padding,
    _gridRef = _a.gridRef,
    thumbnailSize = _a.thumbnailSize,
    noProvider = _a.noProvider,
    className = _a.className,
    onClick = _a.onClick,
    onKeyDown = _a.onKeyDown,
    style = _a.style,
    divProps = tslib_1.__rest(_a, [
      'files',
      'onMove',
      'onDragChange',
      'onDeselectAll',
      'onSelectAll',
      'onRenderThumbnail',
      'onRenderDragLayer',
      'disableMove',
      'preventArrowsToMove',
      'preventClickAwayDeselect',
      'draggingIds',
      'padding',
      'gridRef',
      'thumbnailSize',
      'noProvider',
      'className',
      'onClick',
      'onKeyDown',
      'style',
    ]);
  var fileOrganizerRef = (0, react_1.useRef)(null);
  var gridRef = (0, react_1.useRef)(null);
  (0, react_1.useImperativeHandle)(_gridRef, function() {
    return gridRef.current;
  });
  var _b = (0, react_1.useState)(0),
    columnCount = _b[0],
    setColumnCount = _b[1];
  var _c = (0, react_1.useState)(),
    editingId = _c[0],
    setEditingId = _c[1];
  var _d = (0, react_1.useState)(),
    draggingId = _d[0],
    setDraggingId = _d[1];
  // Get the width of the first item, or default if no first item found.
  var hasFiles = files.length > 0;
  var getSize = (0, react_1.useCallback)(
    function() {
      if (!hasFiles) return defaultSize;
      if (!fileOrganizerRef.current) return defaultSize;
      var draggableWrapper = fileOrganizerRef.current.querySelector(
        'div[draggable="true"]',
      );
      var draggableElement =
        draggableWrapper === null || draggableWrapper === void 0
          ? void 0
          : draggableWrapper.firstChild;
      var firstItem =
        draggableElement === null || draggableElement === void 0
          ? void 0
          : draggableElement.firstChild;
      if (!firstItem) return defaultSize;
      return firstItem.getBoundingClientRect();
    },
    [hasFiles],
  );
  // Detect size of first item and use as size throughout.
  var _e = (0, react_1.useState)(function() {
      return thumbnailSize || getSize();
    }),
    size = _e[0],
    setSize = _e[1];
  // Update size when getWidth ref changes (when hasFiles changes).
  (0, react_1.useEffect)(
    function() {
      if (thumbnailSize) return setSize(thumbnailSize);
      if (files.length === 0) return setSize(defaultSize);
      setSize(function(prev) {
        var _a = getSize(),
          width = _a.width,
          height = _a.height;
        if (prev.width === width && prev.height === height) return prev;
        return { width: width, height: height };
      });
      // Watches all files to continuously check width and height.
    },
    [files, getSize, thumbnailSize],
  );
  var handleOnDragChange = (0, react_1.useCallback)(
    function(id) {
      onDragChange === null || onDragChange === void 0
        ? void 0
        : onDragChange(id);
      setDraggingId(id);
    },
    [onDragChange],
  );
  var handleItemKeyDown = (0, react_1.useCallback)(
    function(event, index, _file, draggableRef) {
      var indexDiff = 0;
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
      var hasMoved = false;
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
      var siblingAtLocation = (0, utils_1.getSibling)(
        draggableRef.current,
        indexDiff,
      );
      // If no meta key was pressed, focus item in direction of keys.
      if (siblingAtLocation && !(event.metaKey || event.ctrlKey)) {
        var focusable_1 = siblingAtLocation.querySelector(
          utils_1.focusableElementDomString,
        );
        if (focusable_1) {
          hasMoved = true;
          requestAnimationFrame(function() {
            focusable_1.focus();
          });
        }
      }
      if (!hasMoved) return;
      var isVisible = (0, utils_1.isScrolledIntoView)(
        siblingAtLocation,
        fileOrganizerRef.current,
      ).isVisible;
      if (isVisible) return;
      // Use react-window scrollToItem api for virtualized items.
      var rowIndex = (0, utils_1.getRowAndColumnIndex)(
        index + indexDiff,
        columnCount,
      ).rowIndex;
      gridRef.current.scrollToItem({ align: 'smart', rowIndex: rowIndex });
    },
    [columnCount, disableMove, editingId, onMove, preventArrowsToMove],
  );
  var pad = Math.max(1, padding || 0);
  var renderItem = (0, react_1.useCallback)(
    function(file, index, style) {
      if (!file)
        return react_1.default.createElement(
          react_1.Fragment,
          { key: '__null' },
          null,
        );
      var isEditing = editingId === file.id;
      var otherDragging = !!(
        (draggingId && draggingId !== file.id) ||
        (draggingIds && draggingIds.length && !draggingIds.includes(file.id))
      );
      var draggableRef = (0, react_1.createRef)();
      var isInDragGroup = draggingIds ? draggingIds.includes(file.id) : false;
      return react_1.default.createElement(Draggable_1.Draggable, {
        'data-file-id': file.id,
        key: file.id,
        index: index,
        style:
          style &&
          tslib_1.__assign(tslib_1.__assign({}, style), {
            top: typeof style.top === 'number' ? style.top + pad : style.top,
            left:
              typeof style.left === 'number' ? style.left + pad : style.left,
          }),
        ref: draggableRef,
        hideDragPreview: !!onRenderDragLayer,
        preventAnimation: isInDragGroup,
        onDragChange: function(isDragging) {
          return handleOnDragChange(isDragging ? file.id : undefined);
        },
        disableDrag: isEditing || disableMove,
        onMove: onMove,
        onKeyDown: function(e) {
          return handleItemKeyDown(e, index, file, draggableRef);
        },
        onRenderChildren: function(isDragging) {
          return onRenderThumbnail({
            onRenderThumbnailProps: {
              file: file,
              dragging: isDragging || isInDragGroup,
              otherDragging: otherDragging,
              onEditingChange: function(editing) {
                return setEditingId(editing ? file.id : undefined);
              },
            },
            id: file.id,
            index: index,
          });
        },
      });
    },
    [
      editingId,
      draggingId,
      draggingIds,
      pad,
      onRenderDragLayer,
      disableMove,
      onMove,
      handleOnDragChange,
      handleItemKeyDown,
      onRenderThumbnail,
    ],
  );
  var handleOnClick = (0, react_1.useCallback)(
    function(event) {
      onClick === null || onClick === void 0 ? void 0 : onClick(event);
      if (!preventClickAwayDeselect)
        onDeselectAll === null || onDeselectAll === void 0
          ? void 0
          : onDeselectAll();
    },
    [onDeselectAll, onClick, preventClickAwayDeselect],
  );
  var handleOnKeyDown = (0, react_1.useCallback)(
    function(event) {
      onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
      if (event.key === 'Escape')
        return onDeselectAll === null || onDeselectAll === void 0
          ? void 0
          : onDeselectAll();
      if (event.key === 'a' && (event.metaKey || event.ctrlKey)) {
        onSelectAll === null || onSelectAll === void 0 ? void 0 : onSelectAll();
        event.preventDefault();
      }
    },
    [onDeselectAll, onSelectAll, onKeyDown],
  );
  var customDragLayerTranslate = (0, react_1.useCallback)(function(_a) {
    var mousePosition = _a.mousePosition;
    var x = mousePosition.x - utils_1.THUMBNAIL_WIDTH / 2;
    var y = mousePosition.y - utils_1.THUMBNAIL_WIDTH / 2;
    return { x: x, y: y };
  }, []);
  var fileOrganizerClass = (0, classnames_1.default)(
    'ui__base ui__fileOrganizer',
    className,
  );
  var Wrapper = noProvider
    ? react_1.default.Fragment
    : DndMultiProvider_1.DndMultiProvider;
  return react_1.default.createElement(
    Wrapper,
    null,
    react_1.default.createElement(
      'div',
      tslib_1.__assign({}, divProps, {
        className: fileOrganizerClass,
        ref: fileOrganizerRef,
        onClick: handleOnClick,
        onKeyDown: handleOnKeyDown,
        style: style,
        role: 'grid',
        tabIndex: 0,
      }),
      react_1.default.createElement(MemoAutoSizer_1.MemoAutoSizer, {
        ref: gridRef,
        files: files,
        padding: pad,
        size: size,
        renderItem: renderItem,
        onColumnCountChange: setColumnCount,
      }),
      onRenderDragLayer
        ? react_1.default.createElement(
            DragLayer_1.DragLayer,
            { customTranslate: customDragLayerTranslate },
            react_1.default.createElement(
              'div',
              {
                className: 'ui__fileOrganizer__draglayer',
                style: {
                  height: utils_1.THUMBNAIL_WIDTH,
                  width: utils_1.THUMBNAIL_WIDTH,
                },
              },
              onRenderDragLayer(),
            ),
          )
        : undefined,
    ),
  );
}
exports.FileOrganizer = FileOrganizer;
//# sourceMappingURL=FileOrganizer.js.map
