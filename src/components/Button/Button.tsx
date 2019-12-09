import classnames from 'classnames';
import React, { forwardRef, ButtonHTMLAttributes } from 'react';

export enum ButtonStyle {
  Default = 'default',
  Borderless = 'borderless',
  Outline = 'outline',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Set the visual appearance of the button.
   * @default ButtonStyle.Default
   */
  buttonStyle?: ButtonStyle;
  /**
   * Defaults to 'button' instead of 'submit' to prevent accidental submissions.
   * @default "button"
   */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ buttonStyle = ButtonStyle.Default, type = 'button', className, ...buttonProps }, ref) => {
    const buttonClass = classnames('ui__base ui__button', className, `ui__button--${buttonStyle}`, {
      ['ui__button--disabled']: buttonProps.disabled,
    });

    return <button {...buttonProps} className={buttonClass} type={type} ref={ref} />;
  },
);
