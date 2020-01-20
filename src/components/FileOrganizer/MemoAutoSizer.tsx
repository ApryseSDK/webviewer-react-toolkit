import React, { forwardRef, memo, useCallback, useEffect, useMemo } from 'react';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import { File } from '../../data';
import { getItemIndex, THUMBNAIL_WIDTH } from '../../utils';

interface VirtualizedProps {
  files: File[];
  onColumnCountChange: (newColumnCount: number) => void;
  renderItem: (file: File, index: number, style: React.CSSProperties | undefined) => JSX.Element;
}

const MemoGridItem = memo<GridChildComponentProps>(({ columnIndex, rowIndex, style, data }) => {
  const index = getItemIndex(rowIndex, columnIndex, data.columnCount);
  const file = data.files[index];
  if (!file) return null;
  return data.renderItem(file, index, style);
});

const MemoGrid = memo(
  forwardRef<Grid, Size & VirtualizedProps>(({ width, height, files, renderItem, onColumnCountChange }, ref) => {
    const data = useMemo(() => {
      let columnCount = Math.floor(width / THUMBNAIL_WIDTH);
      if (columnCount > files.length) columnCount = files.length;
      return { files, renderItem, columnCount };
    }, [files, renderItem, width]);

    useEffect(() => {
      onColumnCountChange(data.columnCount);
    }, [onColumnCountChange, data.columnCount]);

    return (
      <Grid
        ref={ref}
        columnWidth={THUMBNAIL_WIDTH}
        rowHeight={THUMBNAIL_WIDTH}
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
  }),
);

export const MemoAutoSizer = memo(
  forwardRef<Grid, VirtualizedProps>(({ files, renderItem, onColumnCountChange }, ref) => {
    const onRenderGrid = useCallback(
      ({ width, height }: Size) => (
        <MemoGrid
          ref={ref}
          width={width}
          height={height}
          files={files}
          renderItem={renderItem}
          onColumnCountChange={onColumnCountChange}
        />
      ),
      [files, renderItem, ref, onColumnCountChange],
    );

    return <AutoSizer>{onRenderGrid}</AutoSizer>;
  }),
);
