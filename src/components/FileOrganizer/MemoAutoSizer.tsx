import React, { memo, useCallback, useMemo } from 'react';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import { File } from '../../data/file';

const THUMBNAIL_WIDTH = 250;

interface VirtualizedProps {
  files: File[];
  renderItem: (file: File, index: number, style: React.CSSProperties | undefined) => JSX.Element;
}

function getItemIndex(rowIndex: number, columnIndex: number, numColumns: number) {
  return rowIndex * numColumns + columnIndex;
}

const MemoGridItem = memo<GridChildComponentProps>(({ columnIndex, rowIndex, style, data }) => {
  const index = getItemIndex(rowIndex, columnIndex, data.columnCount);
  const file = data.files[index];
  if (!file) return null;
  return data.renderItem(file, index, style);
});

const MemoGrid = memo<Size & VirtualizedProps>(({ width, height, files, renderItem }) => {
  const data = useMemo(() => {
    let columnCount = Math.floor(width / THUMBNAIL_WIDTH);
    if (columnCount > files.length) columnCount = files.length;
    return { files, renderItem, columnCount };
  }, [files, renderItem, width]);

  return (
    <Grid
      columnWidth={250}
      rowHeight={250}
      height={height}
      width={width}
      columnCount={data.columnCount}
      rowCount={Math.ceil(files.length / data.columnCount)}
      itemData={data}
      itemKey={({ columnIndex, rowIndex }) => {
        const index = getItemIndex(rowIndex, columnIndex, data.columnCount);
        return files[index]?.id ?? index;
      }}
    >
      {MemoGridItem}
    </Grid>
  );
});

export const MemoAutoSizer = memo<VirtualizedProps>(({ files, renderItem }) => {
  const onRenderGrid = useCallback(
    ({ width, height }: Size) => <MemoGrid width={width} height={height} files={files} renderItem={renderItem} />,
    [files, renderItem],
  );

  return <AutoSizer>{onRenderGrid}</AutoSizer>;
});
