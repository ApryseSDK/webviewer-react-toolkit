'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MemoAutoSizer = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importStar(require('react'));
var react_virtualized_auto_sizer_1 = tslib_1.__importDefault(
  require('react-virtualized-auto-sizer'),
);
var react_window_1 = require('react-window');
var utils_1 = require('../../utils');
var MemoGridItem = (0, react_1.memo)(function(_a) {
  var columnIndex = _a.columnIndex,
    rowIndex = _a.rowIndex,
    style = _a.style,
    data = _a.data;
  var index = (0, utils_1.getItemIndex)(
    rowIndex,
    columnIndex,
    data.columnCount,
  );
  var file = data.files[index];
  if (!file) return null;
  return data.renderItem(file, index, style);
});
var MemoGrid = (0, react_1.memo)(
  (0, react_1.forwardRef)(function(_a, ref) {
    var width = _a.width,
      height = _a.height,
      files = _a.files,
      padding = _a.padding,
      renderItem = _a.renderItem,
      onColumnCountChange = _a.onColumnCountChange,
      size = _a.size;
    var modifiedHeight = height - 2 * padding;
    var modifiedWidth = width - 2 * padding;
    var data = (0, react_1.useMemo)(
      function() {
        var columnCount = Math.floor(modifiedWidth / size.width);
        if (columnCount > files.length) columnCount = files.length;
        return {
          files: files,
          renderItem: renderItem,
          columnCount: columnCount,
        };
      },
      [modifiedWidth, size.width, files, renderItem],
    );
    (0, react_1.useEffect)(
      function() {
        onColumnCountChange(data.columnCount);
      },
      [onColumnCountChange, data.columnCount],
    );
    return react_1.default.createElement(
      react_window_1.FixedSizeGrid,
      {
        ref: ref,
        columnWidth: size.width,
        rowHeight: size.height,
        height: modifiedHeight,
        width: modifiedWidth,
        style: { padding: padding, height: height, width: width },
        columnCount: data.columnCount,
        rowCount: Math.ceil(files.length / data.columnCount),
        itemData: data,
        itemKey: function(_a) {
          var _b, _c;
          var columnIndex = _a.columnIndex,
            rowIndex = _a.rowIndex;
          var index = (0, utils_1.getItemIndex)(
            rowIndex,
            columnIndex,
            data.columnCount,
          );
          return (_c =
            (_b = files[index]) === null || _b === void 0 ? void 0 : _b.id) !==
            null && _c !== void 0
            ? _c
            : index;
        },
      },
      MemoGridItem,
    );
  }),
);
exports.MemoAutoSizer = (0, react_1.memo)(
  (0, react_1.forwardRef)(function(_a, ref) {
    var files = _a.files,
      padding = _a.padding,
      size = _a.size,
      renderItem = _a.renderItem,
      onColumnCountChange = _a.onColumnCountChange;
    var onRenderGrid = (0, react_1.useCallback)(
      function(_a) {
        var width = _a.width,
          height = _a.height;
        return react_1.default.createElement(MemoGrid, {
          padding: padding,
          ref: ref,
          width: width,
          height: height,
          files: files,
          size: size,
          renderItem: renderItem,
          onColumnCountChange: onColumnCountChange,
        });
      },
      [padding, ref, files, size, renderItem, onColumnCountChange],
    );
    return react_1.default.createElement(
      react_virtualized_auto_sizer_1.default,
      null,
      onRenderGrid,
    );
  }),
);
//# sourceMappingURL=MemoAutoSizer.js.map
