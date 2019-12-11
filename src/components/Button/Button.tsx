import classnames from 'classnames';
import React, { forwardRef, ButtonHTMLAttributes } from 'react';

export enum ButtonStyle {
  Default = 'default',
  Borderless = 'borderless',
  Outline = 'outline',
}

export enum ButtonSize {
  Small = 'small',
  Default = 'default',
  Large = 'large',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Set the visual appearance of the button.
   * @default ButtonStyle.Default
   */
  buttonStyle?: ButtonStyle;
  /**
   * Set the visual appearance of the button.
   * @default ButtonSize.Default
   */
  buttonSize?: ButtonSize;
  /**
   * Defaults to 'button' instead of 'submit' to prevent accidental submissions.
   * @default "button"
   */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { buttonStyle = ButtonStyle.Default, buttonSize = ButtonSize.Default, type = 'button', className, ...buttonProps },
    ref,
  ) => {
    const buttonClass = classnames(
      'ui__base ui__button',
      `ui__button--style-${buttonStyle}`,
      `ui__button--size-${buttonSize}`,
      { ['ui__button--disabled']: buttonProps.disabled },
      className,
    );

    return <button {...buttonProps} className={buttonClass} type={type} ref={ref} />;
  },
);
