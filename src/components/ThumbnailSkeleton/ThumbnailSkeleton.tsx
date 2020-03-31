import classnames from 'classnames';
import React, { HTMLAttributes } from 'react';
import { FileSkeleton } from '../FileSkeleton';

export function ThumbnailSkeleton({ className, ...divProps }: HTMLAttributes<HTMLDivElement>) {
  const thumbnailClass = classnames('ui__base ui__thumbnailSkeleton', className);

  return (
    <div {...divProps} className={thumbnailClass}>
      <div className="ui__thumbnailSkeleton__image">
        <FileSkeleton className="ui__thumbnailSkeleton__image__skeleton" />
      </div>
      <div className="ui__thumbnailSkeleton__label" />
    </div>
  );
}
