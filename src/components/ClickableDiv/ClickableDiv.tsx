import classnames from 'classnames';
import React, { forwardRef, HTMLAttributes, useImperativeHandle, useRef } from 'react';
import useKeyForClick from '../../hooks/useKeyForClick';
import useOnClick from '../../hooks/useOnClick';
import { Omit } from '../../utils/typeUtils';

export interface ClickableDivProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
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

    const handleKeyUp = useKeyForClick(onKeyPress, clickableDivRef);

    const clickableDivClass = classnames(
      'ui__base ui__clickableDiv',
      {
        'ui__clickableDiv--disabled': disabled,
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
        onKeyPress={handleKeyUp}
        ref={clickableDivRef}
      >
        {children}
      </div>
    );
  },
);
