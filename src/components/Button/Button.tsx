import classnames from 'classnames';
import React, {forwardRef, ButtonHTMLAttributes} from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Set the internals of the button.
   * @default "Default value"
   */
  someProp?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({someProp = 'Default value', className, ...buttonProps}, ref) => {
    const buttonClass = classnames('ui__button', className, {
      ['ui__button--disabled']: buttonProps.disabled,
    });

    return (
      <button className={buttonClass} {...buttonProps} ref={ref}>
        {someProp}
      </button>
    );
  },
);
