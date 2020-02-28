import classnames from 'classnames';
import React, { MouseEvent, ReactNode, ReactText, useRef } from 'react';
import { FileLike } from '../../data';
import { useFile, useFocus } from '../../hooks';
import { ClickableDiv, ClickableDivProps } from '../ClickableDiv';
import { EditableText } from '../EditableText';
import { FileSkeleton } from '../FileSkeleton';
import { Image } from '../Image';
import { ToolButton } from '../ToolButton';

export interface ThumbnailButtonProps<F> {
  key: ReactText;
  onClick: (event: MouseEvent<HTMLButtonElement>, file: F) => void;
  children: ReactNode;
}

export interface ThumbnailProps<F> extends ClickableDivProps {
  /**
   * The file to display the thumbnail from.
   */
  file: F;
  /**
   * Optional label. Will use file name if not provided.
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
   * Set to true while other thumbnails are dragging to prevent changes to
   * appearance due to mouse hover.
   */
  otherDragging?: boolean;
  /**
   * Provide an array of button props to add tool buttons on thumbnail. Each
   * must have a unique ID.
   */
  buttonProps?: ThumbnailButtonProps<F>[];
  /**
   * A node to render on the top-left of the thumbnail.
   */
  selectedIcon?: ReactNode;
  /**
   * Default 500ms. Set to 0 to prevent all throttling. Set the delay for
   * fetching any lazy async items from file.
   */
  throttle?: number;
  /**
   * If true, will prevent throttling.
   */
  isShownOnLoad?: boolean;
  /**
   * Callback fired when the name is edited and saved.
   * @param newName The new name to set on the file.
   * @param file The target file.
   */
  onRename?(newName: string, file: F): void;
  /**
   * Callback fired whenever edit mode changes.
   * @param isEditing Is the target currently editing.
   * @param file The target file.
   */
  onEditingChange?(isEditing: boolean, file: F): void;
}

export function Thumbnail<F extends FileLike>({
  file: _file,
  label,
  selected,
  dragging,
  otherDragging,
  buttonProps,
  selectedIcon,
  onRename,
  onEditingChange,
  throttle,
  isShownOnLoad,
  className,
  disabled,
  onFocus,
  onBlur,
  ...divProps
}: ThumbnailProps<F>) {
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const { focused, handleOnFocus, handleOnBlur } = useFocus(onFocus, onBlur);

  const file = useFile(_file, isShownOnLoad ? 0 : throttle);

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
        <Image
          src={file.thumbnail}
          alt={file.name}
          onRenderLoading={() => <FileSkeleton className="ui__thumbnail__image__skeleton" />}
        />
      </div>
      <div className="ui__thumbnail__controls">
        {buttonProps?.map(({ key, ...buttonPropObject }) => (
          <ToolButton key={key} disabled={disabled} onClick={e => buttonPropObject.onClick(e, file.file)}>
            {buttonPropObject.children}
          </ToolButton>
        ))}
      </div>
      {selectedIcon ? <div className="ui__thumbnail__selectedIcon">{selectedIcon}</div> : undefined}
      <EditableText
        className="ui__thumbnail__label"
        value={label ?? file.name}
        centerText
        disabled={disabled}
        locked={!onRename || otherDragging}
        onSave={handleOnSave}
        onCancel={handleOnCancel}
        onEdit={handleOnEdit}
      />
    </ClickableDiv>
  );
}
