import classnames from 'classnames';
import React, { forwardRef, HTMLAttributes, useImperativeHandle, useRef } from 'react';
import { useAccessibleFocus, useKeyForClick, useOnClick } from '../../hooks';
import { Remove } from '../../utils';

export interface ClickableDivProps extends Remove<HTMLAttributes<HTMLDivElement>, 'role'> {
  /**
   * Is the clickable div disabled. Disabled will stop the onClick callback from
   * firing (similar to a button).
   */
  disabled?: boolean;
  /**
   * No style when focused. If true will have no focus outline.
   */
  noFocusStyle?: boolean;
  /**
   * Specify whether clickable div uses a pointer cursor. Otherwise is default.
   */
  usePointer?: boolean;
}

export const ClickableDiv = forwardRef<HTMLDivElement, ClickableDivProps>(
  ({ onClick, onKeyPress, disabled, noFocusStyle, usePointer, className, children, tabIndex, ...divProps }, ref) => {
    const clickableDivRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => clickableDivRef.current!);

    const handleOnClick = useOnClick(onClick, { disabled, stopPropagation: true });

    const handleKeyPress = useKeyForClick(onKeyPress, clickableDivRef);

    const isUserTabbing = useAccessibleFocus();

    const clickableDivClass = classnames(
      'ui__base ui__clickableDiv',
      {
        'ui__clickableDiv--disabled': disabled,
        'ui__clickableDiv--tabbing': isUserTabbing,
        'ui__clickableDiv--noFocusStyle': noFocusStyle,
        'ui__clickableDiv--usePointer': usePointer && !disabled,
      },
      className,
    );

    return (
      <div
        {...divProps}
        role="button"
        tabIndex={disabled ? -1 : tabIndex ?? 0}
        className={clickableDivClass}
        onClick={handleOnClick}
        onKeyPress={handleKeyPress}
        ref={clickableDivRef}
      >
        {children}
      </div>
    );
  },
);
