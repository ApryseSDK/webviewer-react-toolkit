'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getRowAndColumnIndex = exports.getItemIndex = void 0;
function getItemIndex(rowIndex, columnIndex, numColumns) {
  return rowIndex * numColumns + columnIndex;
}
exports.getItemIndex = getItemIndex;
function getRowAndColumnIndex(index, numColumns) {
  return {
    rowIndex: Math.floor(index / numColumns),
    columnIndex: index % numColumns,
  };
}
exports.getRowAndColumnIndex = getRowAndColumnIndex;
//# sourceMappingURL=gridUtils.js.map
