import classnames from 'classnames';
import React, { forwardRef, HTMLAttributes, MouseEvent, KeyboardEvent, useRef, useImperativeHandle } from 'react';
import { Omit } from '../../utils/typeUtils';

export interface ClickableDivProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'tabIndex'> {
  /**
   * Is the clickable div disabled.
   */
  disabled?: boolean;
  /**
   * No style when focused.
   */
  noFocusStyle?: boolean;
}

export const ClickableDiv = forwardRef<HTMLDivElement, ClickableDivProps>(
  ({ onClick, onKeyUp, disabled, noFocusStyle, className, children, ...buttonProps }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => divRef.current!);

    const clickableDivClass = classnames(
      'ui__base ui__clickableDiv',
      {
        ['ui__clickableDiv--disabled']: disabled,
        ['ui__clickableDiv--noFocusStyle']: noFocusStyle,
      },
      className,
    );

    const handleOnClick = (event: MouseEvent<HTMLDivElement>) => {
      if (!disabled) onClick?.(event);
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
      // Fire click on space or enter press.
      if (event.key === ' ' || event.key === 'Enter') divRef.current?.click();
      onKeyUp?.(event);
    };

    return (
      <div
        {...buttonProps}
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={clickableDivClass}
        onClick={handleOnClick}
        onKeyUp={handleKeyUp}
        ref={divRef}
      >
        {children}
      </div>
    );
  },
);
