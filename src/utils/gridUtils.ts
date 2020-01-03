export function getItemIndex(rowIndex: number, columnIndex: number, numColumns: number) {
  return rowIndex * numColumns + columnIndex;
}

export function getRowAndColumnIndex(index: number, numColumns: number) {
  return {
    rowIndex: Math.floor(index / numColumns),
    columnIndex: index % numColumns,
  };
}
