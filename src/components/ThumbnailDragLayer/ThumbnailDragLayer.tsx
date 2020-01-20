import classnames from 'classnames';
import React, { FC, HTMLAttributes, useEffect } from 'react';

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
        {numFiles === 1 ? <SinglePage /> : <MultiPage />}
        {numFiles > 1 ? (
          <div className="ui__thumbnailDragLayer__numFiles">
            <span className="ui__thumbnailDragLayer__numFiles__wrapper">{numFiles}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

function MultiPage() {
  return (
    <svg className="ui__thumbnailDragLayer__icon" width="24px" height="24px" viewBox="0 0 24 24">
      <path
        fill="#ABB0C4"
        d="M20.3,9.5 L20.3,20.3 C20.3,21.2 19.6,22 18.6,22 L11.1,22 L11.1,20.3 L18.6,20.3 L18.6,9.5 L20.3,9.5 Z M15.3,18.7 L5.3,18.7 C4.4,18.7 3.6,18 3.6,17 L3.6,3.7 C3.7,2.7 4.4,2 5.3,2 L12,2 L17,7 L17,17 C17,17.9 16.3,18.7 15.3,18.7 Z M12,7.8 L15.3,7.8 L11.1,3.6 L11.1,7.8 C11.2,7.8 11.5,7.8 12,7.8 Z"
        id="path-1"
      />
    </svg>
  );
}

function SinglePage() {
  return (
    <svg className="ui__thumbnailDragLayer__icon" width="24px" height="24px" viewBox="0 0 24 24">
      <path
        fill="#ABB0C4"
        d="M14,2 L6,2 C4.9,2 4,2.9 4,4 L4,20 C4,21.1 4.9,22 6,22 L18,22 C19.1,22 20,21.1 20,20 L20,8 L14,2 Z M14,9 C13.4,9 13,9 13,9 L13,4 L18,9 L14,9 Z"
        id="path-1"
      />
    </svg>
  );
}
