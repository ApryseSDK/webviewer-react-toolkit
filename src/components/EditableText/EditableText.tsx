import classnames from 'classnames';
import React, { forwardRef, KeyboardEvent, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useAccessibleFocus } from '../../hooks';
import { ClickableDiv, ClickableDivProps } from '../ClickableDiv';

export interface EditableTextProps extends ClickableDivProps {
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
   * Classname for outermost div.
   */
  className?: string;
  /**
   * Lock the text in view mode. Similar to disabled, but without the reduced
   * opacity.
   */
  locked?: boolean;
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
  /**
   * Always show a border, and highlight on hover.
   */
  bordered?: boolean;
  /**
   * Callback fired whenever the component wishes to enter edit mode.
   */
  onEdit?(): void;
  /**
   * Callback fired whenever the component wishes to update the value.
   * @param newValue The new value to save.
   */
  onSave?(newValue: string): void;
  /**
   * Callback fired whenever the component wishes to cancel edit mode without
   * saving the new value.
   * @param originalValue The original value to revert to.
   */
  onCancel?(originalValue: string): void;
  /**
   * Render out a custom string to display when not in edit mode.
   * @param value The value of the editable text.
   */
  onRenderText?(value: string): string;
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
      locked,
      onRenderText,
      placeholder,
      centerText,
      bordered,
      ...clickableDivProps
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const buttonRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => buttonRef.current as HTMLDivElement);

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

    const [noFocusTransition, setNoFocusTransition] = useState(false);

    // Focus input whenever edit mode is enabled, and button when disabled.
    const firstRender = useRef(true);
    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;
      } else if (editMode) {
        inputRef.current?.focus();
        setNoFocusTransition(true);
      } else {
        buttonRef.current?.focus();
        setNoFocusTransition(false);
      }
    }, [editMode]);

    const handleOnEdit = () => {
      if (controlledEditMode === undefined) setStateEditMode(true);
      onEdit?.();
    };

    const handleOnCancel = () => {
      if (controlledEditMode === undefined) setStateEditMode(false);
      setEditValue(value);
      onCancel?.(value);
    };

    const handleOnSave = () => {
      if (controlledValue === undefined) setStateValue(editValue);
      if (controlledEditMode === undefined) setStateEditMode(false);
      onSave?.(editValue);
    };

    const handleOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleOnSave();
        event.stopPropagation();
      }
    };

    const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        handleOnCancel();
      }
      event.stopPropagation();
    };

    const [valueToDisplay, isPlaceholder] = useMemo(() => {
      const renderedValue = onRenderText ? onRenderText(value) : value;
      if (placeholder && !renderedValue) return [placeholder, true];
      return [renderedValue, false];
    }, [onRenderText, placeholder, value]);

    const isUserTabbing = useAccessibleFocus();

    const editableTextClass = classnames(
      'ui__base ui__editableText',
      {
        'ui__editableText--disabled': disabled,
        'ui__editableText--locked': locked,
        'ui__editableText--centerText': centerText,
        'ui__editableText--bordered': bordered,
      },
      className,
    );

    const buttonClass = classnames('ui__editableText__button', {
      'ui__editableText__button--placeholder': isPlaceholder,
      'ui__editableText__button--noFocusTransition': noFocusTransition,
    });

    const fieldClass = classnames('ui__editableText__field', {
      'ui__editableText__field--tabbing': isUserTabbing,
    });

    return (
      <div className={editableTextClass}>
        {editMode ? (
          <input
            className={fieldClass}
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyPress={handleOnKeyPress}
            onKeyDown={handleOnKeyDown}
            ref={inputRef}
            onBlur={handleOnSave}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <ClickableDiv
            {...clickableDivProps}
            className={buttonClass}
            disabled={disabled || locked}
            onClick={handleOnEdit}
            ref={buttonRef}
            usePointer
          >
            <span>{valueToDisplay}</span>
          </ClickableDiv>
        )}
      </div>
    );
  },
);
