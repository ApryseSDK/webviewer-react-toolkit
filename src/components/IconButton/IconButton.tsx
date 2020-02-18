import classnames from 'classnames';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button } from '../Button';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Defaults to 'button' instead of 'submit' to prevent accidental submissions.
   * @default "button"
   */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ children, className, ...props }, ref) => {
  const iconButtonClass = classnames('ui__base ui__iconButton', className);

  return (
    <Button {...props} className={iconButtonClass} buttonStyle="borderless" ref={ref}>
      {children}
    </Button>
  );
});
