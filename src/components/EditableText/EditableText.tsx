import classnames from 'classnames';
import React, { forwardRef, KeyboardEvent, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import ClickableDiv from '../ClickableDiv';

export interface EditableTextProps {
  /**
   * If provided, value becomes controlled. The component will request to change
   * the value with the onSave callback, and this must be set to change.
   */
  value?: string;
  /**
   * If provided, edit mode becomes controlled. The component will request to
   * enter via the onEdit callback, and this must be set to true to enable.
   */
  editMode?: boolean;
  /**
   * Callback fired whenever the component wishes to enter edit mode.
   */
  onEdit?: () => void;
  /**
   * Callback fired whenever the component wishes to update the value.
   */
  onSave?: (newValue: string) => void;
  /**
   * Callback fired whenever the component wishes to cancel edit mode without
   * saving the new value.
   */
  onCancel?: (originalValue: string) => void;
  /**
   * Classname for outermost div.
   */
  className?: string;
  /**
   * Is the editable text disabled (will not be editable).
   */
  disabled?: boolean;
  /**
   * Render out a custom string to display when not in edit mode.
   */
  onRenderText?: (value: string) => string;
  /**
   * A placeholder to display if there's no value. This will also account for
   * `onRenderText`, so if you want to display this then `onRenderText` must
   * return a falsy value like empty string.
   */
  placeholder?: string;
  /**
   * Center the text within the editable text field.
   */
  centerText?: boolean;
}

export const EditableText = forwardRef<HTMLDivElement, EditableTextProps>(
  (
    {
      value: controlledValue,
      editMode: controlledEditMode,
      onEdit,
      onSave,
      onCancel,
      className,
      disabled,
      onRenderText,
      placeholder,
      centerText,
    },
    ref,
  ) => {
    // Use state if controlled edit mode not provided.
    const [stateEditMode, setStateEditMode] = useState(false);
    const editMode = controlledEditMode ?? stateEditMode;

    // Use state if controlled value not provided.
    const [stateValue, setStateValue] = useState('');
    const value = controlledValue ?? stateValue;

    // Keep edit value in sync with value (controlled or state) and reset when
    // edit mode is cancelled.
    const [editValue, setEditValue] = useState(value);
    useEffect(() => setEditValue(value), [editMode, value]);

    // Focus input whenever edit mode is enabled.
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (editMode) inputRef.current?.focus();
    }, [editMode]);

    const handleOnEdit = useCallback(() => {
      if (controlledEditMode === undefined) setStateEditMode(true);
      onEdit?.();
    }, [onEdit, controlledEditMode]);

    const handleOnCancel = useCallback(() => {
      if (controlledEditMode === undefined) setStateEditMode(false);
      setEditValue(value);
      onCancel?.(value);
    }, [controlledEditMode, onCancel, value]);

    const handleOnSave = useCallback(() => {
      if (controlledValue === undefined) setStateValue(editValue);
      if (controlledEditMode === undefined) setStateEditMode(false);
      onSave?.(editValue);
    }, [controlledEditMode, controlledValue, editValue, onSave]);

    const handleKeyUp = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') handleOnCancel();
        if (event.key === 'Enter') handleOnSave();
      },
      [handleOnSave, handleOnCancel],
    );

    const [valueToDisplay, isPlaceholder] = useMemo(() => {
      const renderedValue = onRenderText ? onRenderText(value) : value;
      if (placeholder && !renderedValue) return [placeholder, true];
      return [renderedValue, false];
    }, [onRenderText, placeholder, value]);

    const editableTextClass = classnames(
      'ui__base ui__editableText',
      { ['ui__editableText--disabled']: disabled },
      { ['ui__editableText--centerText']: centerText },
      className,
    );

    const buttonClass = classnames(
      'ui__editableText__button',
      { ['ui__editableText__button--placeholder']: isPlaceholder },
      className,
    );

    return (
      <div className={editableTextClass}>
        {editMode ? (
          <input
            className="ui__editableText__field"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyUp={handleKeyUp}
            ref={inputRef}
            onBlur={handleOnSave}
          />
        ) : (
          <ClickableDiv className={buttonClass} disabled={disabled} onClick={handleOnEdit} ref={ref} usePointer>
            {valueToDisplay}
          </ClickableDiv>
        )}
      </div>
    );
  },
);
