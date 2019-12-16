import classnames from 'classnames';
import React, { forwardRef, MouseEvent, useState } from 'react';
import { File } from '../../hooks/useFile';
import close from '../../icons/close-24px.svg';
import rotate from '../../icons/rotate_right-24px.svg';
import ClickableDiv, { ClickableDivProps } from '../ClickableDiv';
import EditableText from '../EditableText';
import Spinner from '../Spinner';
import ToolButton from '../ToolButton';

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
   * Do not add the file's extension onto the end of the label.
   */
  hideExtension?: boolean;
  /**
   * Display thumbnail with selected props.
   */
  selected?: boolean;
  /**
   * Display this thumbnail as a dragging item.
   */
  dragging?: boolean;
  /**
   * Callback fired when the rotate button is clicked. If not given, will have
   * no rotate button.
   */
  onRotate?: (file: File, event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback fired when the remove button is clicked. If not given, will have
   * no remove button
   */
  onRemove?: (file: File, event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback fired when the name is edited and saved.
   */
  onRename?: (file: File, newName: string) => void;
}

export const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  (
    { file, label, hideExtension, selected, dragging, onRotate, onRemove, onRename, className, disabled, ...divProps },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

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
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // TODO: prevent highlighting on non-dragged item
        onDragEnter={undefined}
        onDragEnd={undefined}
      >
        <div className="ui__thumbnail__controls">
          {onRotate ? (
            <ToolButton disabled={disabled} onClick={e => onRotate(file, e)}>
              <img src={rotate} alt={'rotate'} />
            </ToolButton>
          ) : (
            undefined
          )}
          {onRemove ? (
            <ToolButton disabled={disabled} onClick={e => onRemove(file, e)}>
              <img src={close} alt={'close'} />
            </ToolButton>
          ) : (
            undefined
          )}
        </div>
        <div className="ui__thumbnail__image">
          {file.thumbnail ? <img src={file.thumbnail} alt={file.name} /> : <Spinner />}
        </div>
        <EditableText
          className="ui__thumbnail__label"
          value={label ?? file.name}
          onRenderText={hideExtension ? undefined : value => value && `${value}.${file.extension}`}
          centerText
          disabled={disabled}
          locked={!onRename}
          onSave={s => onRename?.(file, s)}
        />
      </ClickableDiv>
    );
  },
);
