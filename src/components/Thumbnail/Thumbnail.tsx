import classnames from 'classnames';
import React, { forwardRef, useState } from 'react';
import { ToolButton } from '..';
import { File } from '../../hooks/useFile';
import useOnClick from '../../hooks/useOnClick';
import ClickableDiv, { ClickableDivProps } from '../ClickableDiv';
import Spinner from '../Spinner';
import close from '../../icons/close-24px.svg';
import rotate from '../../icons/rotate_right-24px.svg';

export interface ThumbnailProps extends ClickableDivProps {
  /**
   * The file to display the thumbnail from.
   */
  file: File;
  /**
   * Optional label. Will fallback to file name if not provided.
   */
  label?: string;
  /**
   * Display thumbnail with selected props.
   */
  selected?: boolean;
}

export const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ file, label, selected, className, onClick, ...divProps }, ref) => {
    const [focused, setFocused] = useState(false);

    const thumbnailClass = classnames(
      'ui__base ui__thumbnail',
      {
        ['ui__thumbnail--selected']: selected,
        ['ui__thumbnail--focused']: focused,
      },
      className,
    );

    const handleOnClick = useOnClick(onClick, { blurOnClick: true });

    return (
      <ClickableDiv
        {...divProps}
        className={thumbnailClass}
        ref={ref}
        noFocusStyle
        onClick={handleOnClick}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <div className="ui__thumbnail__controls">
          <ToolButton>
            <img src={rotate} alt={'rotate'} />
          </ToolButton>
          <ToolButton>
            <img src={close} alt={'close'} />
          </ToolButton>
        </div>
        <div className="ui__thumbnail__image">
          {file.thumbnail ? <img src={file.thumbnail} alt={file.name} /> : <Spinner />}
        </div>
        <div className="ui__thumbnail__label">{label || file.name}</div>
      </ClickableDiv>
    );
  },
);
