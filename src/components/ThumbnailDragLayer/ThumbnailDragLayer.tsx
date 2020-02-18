import classnames from 'classnames';
import React, { HTMLAttributes, useEffect } from 'react';
import { MultiPage, SinglePage } from '../../icons';

export interface ThumbnailDragLayerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Must be a positive integer (1, 2, 3...) or falsy to default.
   * @default 1
   */
  numFiles?: number;
}

export const ThumbnailDragLayer = ({ numFiles = 1, className, ...divProps }: ThumbnailDragLayerProps) => {
  numFiles = numFiles || 1;
  useEffect(() => {
    if (!Number.isInteger(numFiles)) throw new RangeError('numFiles must be an integer');
    if (!Number.isFinite(numFiles)) throw new RangeError('numFiles must not be infinite');
    if (numFiles <= 0) throw new RangeError('numFiles must be a positive integer');
  }, [numFiles]);

  const thumbnailDragLayerClass = classnames('ui__base ui__thumbnailDragLayer', className);

  return (
    <div {...divProps} className={thumbnailDragLayerClass}>
      <div className="ui__thumbnailDragLayer__wrapper">
        {numFiles === 1 ? (
          <SinglePage className="ui__thumbnailDragLayer__icon" />
        ) : (
          <MultiPage className="ui__thumbnailDragLayer__icon" />
        )}
        {numFiles > 1 ? (
          <div className="ui__thumbnailDragLayer__numFiles">
            <span className="ui__thumbnailDragLayer__numFiles__wrapper">{numFiles}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
