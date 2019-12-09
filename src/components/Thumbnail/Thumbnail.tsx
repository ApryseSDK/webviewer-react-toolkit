import classnames from 'classnames';
import React, { forwardRef } from 'react';
import { File } from '../../hooks/useFile';
import ClickableDiv, { ClickableDivProps } from '../ClickableDiv';

export interface ThumbnailProps extends ClickableDivProps {
  /**
   * The file to display the thumbnail from.
   */
  file: File;
  label?: string;
  selected?: boolean;
}

export const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ file, label, selected, className, ...divProps }, ref) => {
    const thumbnailClass = classnames('ui__base ui__thumbnail', className, {
      ['ui__thumbnail--selected']: selected,
    });

    return (
      <ClickableDiv {...divProps} className={thumbnailClass} ref={ref}>
        <div className="ui__thumbnail__controls">Controls</div>
        <div className="ui__thumbnail__image">
          {file.thumbnail ? <img src={file.thumbnail} alt={file.name} /> : 'loading'}
        </div>
        <div className="ui__thumbnail__label">{label || file.name}</div>
      </ClickableDiv>
    );
  },
);
