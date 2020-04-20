import classnames from 'classnames';
import React, { FC } from 'react';

export interface FilePlaceholderProps {
  /**
   * Classname of the placeholder wrapper.
   */
  className?: string;
  /**
   * The file extension to display on the placeholder.
   */
  extension?: string;
}

export const FilePlaceholder: FC<FilePlaceholderProps> = ({ className, extension }) => {
  const filePlaceholderClass = classnames('ui__base ui__filePlaceholder', className);

  const formattedExtension = extension && `.${extension.replace(/^\./, '')}`;

  return (
    <div className={filePlaceholderClass}>
      <div className="ui__filePlaceholder__block ui__filePlaceholder__block--thumbnail" />
      <div className="ui__filePlaceholder__block ui__filePlaceholder__block--line-sm" />
      <div className="ui__filePlaceholder__block ui__filePlaceholder__block--line-xs" />
      <div className="ui__filePlaceholder__block ui__filePlaceholder__block--line-df" />
      <div className="ui__filePlaceholder__block ui__filePlaceholder__block--line-lgx" />
      <div className="ui__filePlaceholder__block ui__filePlaceholder__block--line-lg" />
      <div className="ui__filePlaceholder__block ui__filePlaceholder__block--line-df" />

      {formattedExtension ? <div className="ui__filePlaceholder__extension">{formattedExtension}</div> : undefined}
    </div>
  );
};
