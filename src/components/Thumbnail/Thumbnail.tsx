import classnames from 'classnames';
import React, { forwardRef, MouseEvent, useEffect, useImperativeHandle, useRef } from 'react';
import { File } from '../../data/file';
import useFile from '../../hooks/useFile';
import useFocus from '../../hooks/useFocus';
import close from '../../icons/close-24px.svg';
import rotate from '../../icons/rotate_right-24px.svg';
import ClickableDiv, { ClickableDivProps } from '../ClickableDiv';
import EditableText from '../EditableText';
import FileSkeleton from '../FileSkeleton';
import Image from '../Image';
import ToolButton from '../ToolButton';

export interface ThumbnailProps extends ClickableDivProps {
  /**
   * The file to display the thumbnail from.
   */
  file: File;
  /**
   * Optional label. Will use file name if not provided.
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
   * Set to true while other thumbnails are dragging to prevent changes to
   * appearance due to mouse hover.
   */
  otherDragging?: boolean;
  /**
   * Callback fired when the rotate button is clicked. If not given, will have
   * no rotate button.
   */
  onRotate?: (event: MouseEvent<HTMLButtonElement>, file: File) => void;
  /**
   * Callback fired when the remove button is clicked. If not given, will have
   * no remove button
   */
  onRemove?: (event: MouseEvent<HTMLButtonElement>, file: File) => void;
  /**
   * Callback fired when the name is edited and saved.
   */
  onRename?: (newName: string, file: File) => void;
  /**
   * Callback fired whenever edit mode changes.
   */
  onEditingChange?: (isEditing: boolean, file: File) => void;
  /**
   * If provided, can set the delay for fetching any lazy async items from file.
   */
  throttle?: number;
}

export const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  (
    {
      file: _file,
      label,
      hideExtension,
      selected,
      dragging,
      otherDragging,
      onRotate,
      onRemove,
      onRename,
      onEditingChange,
      throttle,
      className,
      disabled,
      onFocus,
      onBlur,
      ...divProps
    },
    ref,
  ) => {
    const thumbnailRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => thumbnailRef.current!);

    const { focused, handleOnFocus, handleOnBlur } = useFocus(onFocus, onBlur);

    useEffect(() => {
      if (!selected && focused && thumbnailRef.current) {
        thumbnailRef.current.focus();
      }
    }, [focused, selected]);

    const file = useFile(_file, throttle);

    const handleOnSave = (newName: string) => {
      onRename?.(newName, file.file);
      onEditingChange?.(false, file.file);
    };

    const handleOnCancel = () => {
      onEditingChange?.(false, file.file);
    };

    const handleOnEdit = () => {
      onEditingChange?.(true, file.file);
    };

    const onRenderText = (value: string) => {
      if (!value) return '';
      return `${value}.${file.extension}`;
    };

    const thumbnailClass = classnames(
      'ui__base ui__thumbnail',
      {
        'ui__thumbnail--selected': selected,
        'ui__thumbnail--focused': focused,
        'ui__thumbnail--disabled': disabled,
        'ui__thumbnail--dragging': dragging,
        'ui__thumbnail--otherDragging': otherDragging,
      },
      className,
    );

    return (
      <ClickableDiv
        {...divProps}
        className={thumbnailClass}
        ref={thumbnailRef}
        noFocusStyle
        disabled={disabled}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      >
        <div className="ui__thumbnail__image">
          <Image src={file.thumbnail} alt={file.name} onRenderLoading={() => <FileSkeleton />} />
        </div>
        <div className="ui__thumbnail__controls">
          {onRotate ? (
            <ToolButton disabled={disabled} onClick={e => onRotate(e, file.file)} tabIndex={selected ? undefined : -1}>
              <img src={rotate} alt={'rotate'} />
            </ToolButton>
          ) : (
            undefined
          )}
          {onRemove ? (
            <ToolButton disabled={disabled} onClick={e => onRemove(e, file.file)} tabIndex={selected ? undefined : -1}>
              <img src={close} alt={'close'} />
            </ToolButton>
          ) : (
            undefined
          )}
        </div>
        <EditableText
          className="ui__thumbnail__label"
          value={label ?? file.name}
          onRenderText={hideExtension ? undefined : onRenderText}
          centerText
          disabled={disabled}
          locked={!onRename || otherDragging}
          onSave={handleOnSave}
          onCancel={handleOnCancel}
          onEdit={handleOnEdit}
          tabIndex={selected ? undefined : -1}
        />
      </ClickableDiv>
    );
  },
);
