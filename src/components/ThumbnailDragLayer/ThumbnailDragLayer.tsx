import classnames from 'classnames';
import React, { FC, HTMLAttributes, useEffect } from 'react';
import single_page from '../../icons/single_page-24px.svg';
import multi_page from '../../icons/multi_page-24px.svg';

export interface ThumbnailDragLayerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Must be a positive integer (1, 2, 3...).
   * @default 1
   */
  numFiles?: number;
}

export const ThumbnailDragLayer: FC<ThumbnailDragLayerProps> = ({ numFiles = 1, className, ...divProps }) => {
  useEffect(() => {
    if (!Number.isInteger(numFiles)) throw new RangeError('numFiles must be an integer');
    if (!Number.isFinite(numFiles)) throw new RangeError('numFiles must not be infinite');
    if (numFiles <= 0) throw new RangeError('numFiles must be a positive integer');
  }, [numFiles]);

  const thumbnailDragLayerClass = classnames('ui__base ui__thumbnailDragLayer', className);

  return (
    <div {...divProps} className={thumbnailDragLayerClass}>
      <div className="ui__thumbnailDragLayer__wrapper">
        <img className="ui__thumbnailDragLayer__icon" src={numFiles === 1 ? single_page : multi_page} alt="pages" />
        {numFiles > 1 ? (
          <div className="ui__thumbnailDragLayer__numFiles">
            <span className="ui__thumbnailDragLayer__numFiles__wrapper">{numFiles}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
