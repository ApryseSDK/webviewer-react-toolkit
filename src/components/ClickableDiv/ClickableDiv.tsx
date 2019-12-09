import classnames from 'classnames';
import React, { forwardRef, HTMLAttributes, MouseEvent, KeyboardEvent, useRef, useImperativeHandle } from 'react';
import { Omit } from '../../utils/typeUtils';

export interface ClickableDivProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'tabIndex'> {
  /**
   * Is the clickable div disabled.
   */
  disabled?: boolean;
}

export const ClickableDiv = forwardRef<HTMLDivElement, ClickableDivProps>(
  ({ onClick, onKeyUp, disabled, className, children, ...buttonProps }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => divRef.current!);

    const clickableDivClass = classnames('ui__base ui__clickableDiv', className, {
      ['ui__clickableDiv--disabled']: disabled,
    });

    const handleOnClick = (event: MouseEvent<HTMLDivElement>) => {
      if (!disabled) onClick?.(event);
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
      // Fire click on space press.
      if (event.key === ' ') divRef.current?.click();
      onKeyUp?.(event);
    };

    return (
      <div
        {...buttonProps}
        role="button"
        tabIndex={0}
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
