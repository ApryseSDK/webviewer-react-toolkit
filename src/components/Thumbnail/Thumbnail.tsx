import classnames from 'classnames';
import React, { forwardRef, useState, MouseEvent } from 'react';
import { File } from '../../hooks/useFile';
import useOnClick from '../../hooks/useOnClick';
import ClickableDiv, { ClickableDivProps } from '../ClickableDiv';
import EditableText from '../EditableText';
import Spinner from '../Spinner';
import ToolButton from '../ToolButton';
import rotate from '../../icons/rotate_right-24px.svg';
import close from '../../icons/close-24px.svg';

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
  /**
   * Display this thumbnail as a dragging item.
   */
  dragging?: boolean;
  /**
   * Callback fired whenever the remove item button is clicked.
   */
  onRemove?: (file: File, event: MouseEvent<HTMLButtonElement>) => void;
}

export const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ file, label, selected, dragging, onRemove, className, onClick, disabled, ...divProps }, ref) => {
    const [focused, setFocused] = useState(false);

    const handleOnClick = useOnClick(onClick, { blurOnClick: true });

    const thumbnailClass = classnames(
      'ui__base ui__thumbnail',
      {
        ['ui__thumbnail--selected']: selected,
        ['ui__thumbnail--focused']: focused,
        ['ui__thumbnail--disabled']: disabled,
        ['ui__thumbnail--dragging']: dragging,
      },
      className,
    );

    return (
      <ClickableDiv
        {...divProps}
        className={thumbnailClass}
        ref={ref}
        noFocusStyle
        onClick={handleOnClick}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // TODO: prevent highlighting on non-dragged item
        onDragEnter={undefined}
        onDragEnd={undefined}
      >
        <div className="ui__thumbnail__controls">
          <ToolButton disabled={disabled}>
            <img src={rotate} alt={'rotate'} />
          </ToolButton>
          <ToolButton disabled={disabled} onClick={e => onRemove?.(file, e)}>
            <img src={close} alt={'close'} />
          </ToolButton>
        </div>
        <div className="ui__thumbnail__image">
          {file.thumbnail ? <img src={file.thumbnail} alt={file.name} /> : <Spinner />}
        </div>
        <EditableText
          className="ui__thumbnail__label"
          value={label || file.name}
          onRenderText={value => (value ? `${value}.pdf` : '')}
          centerText
          disabled={disabled}
        />
      </ClickableDiv>
    );
  },
);
