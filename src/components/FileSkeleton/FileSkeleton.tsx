import classnames from 'classnames';
import React, { FC } from 'react';

export interface FileSkeletonProps {
  /**
   * Classname of the skeleton wrapper
   */
  className?: string;
}

export const FileSkeleton: FC<FileSkeletonProps> = ({ className }) => {
  const fileSkeletonClass = classnames('ui__base ui__fileSkeleton', className);

  return (
    <div className={fileSkeletonClass}>
      <div className="ui__fileSkeleton__block ui__fileSkeleton__block--thumbnail" />
      <div className="ui__fileSkeleton__block ui__fileSkeleton__block--line-sm" />
      <div className="ui__fileSkeleton__block ui__fileSkeleton__block--line-xs" />
      <div className="ui__fileSkeleton__block ui__fileSkeleton__block--line-df" />
      <div className="ui__fileSkeleton__block ui__fileSkeleton__block--line-lgx" />
      <div className="ui__fileSkeleton__block ui__fileSkeleton__block--line-lg" />
      <div className="ui__fileSkeleton__block ui__fileSkeleton__block--line-df" />
    </div>
  );
};
