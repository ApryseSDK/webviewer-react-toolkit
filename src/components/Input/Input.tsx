import classnames from 'classnames';
import React, { forwardRef, InputHTMLAttributes, ReactNode, useMemo } from 'react';
import { useFocus } from '../../hooks';
import { AvailableIcons, Icon } from '../Icon';

type InputTypes =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  // | 'file'
  | 'month'
  | 'number'
  | 'password'
  // | 'range'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Messaging feedback for the input. This can be used for displaying feedback
   * inside of forms.
   * @default "default"
   */
  message?: 'default' | 'warning' | 'error';
  /**
   * Text to display under the input describing the message.
   */
  messageText?: string;
  /**
   * Should this input fill the width of the parent container.
   */
  fillWidth?: boolean;
  /**
   * A class for the wrapper div which encompases the input and icon and warning
   * texrt. Use this to do things like add margin-bottom to the entire input for
   * alignment in forms.
   */
  wrapperClassName?: string;
  /**
   * If true, will add padding below the input to compensate for message text
   * being absent. This prevents UI jumping when message text appears.
   */
  padMessageText?: boolean;
  /**
   * A custom element to place on the right of the input.
   */
  rightElement?: ReactNode;
  /**
   * A custom element to place on the left of the input.
   */
  leftElement?: ReactNode;
  /**
   * A smaller subset of all possible input types.
   * @default "text"
   */
  type?: InputTypes;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      message = 'default',
      messageText,
      fillWidth,
      wrapperClassName,
      padMessageText,
      className,
      onFocus,
      onBlur,
      rightElement,
      leftElement,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const { focused, handleOnFocus, handleOnBlur } = useFocus(onFocus, onBlur);

    const rightIcon = useMemo(() => {
      if (rightElement) return rightElement;

      let icon: AvailableIcons | undefined = undefined;
      switch (message) {
        case 'warning':
          icon = 'Warning';
          break;
        case 'error':
          icon = 'Error';
          break;
      }

      return icon ? <Icon className="ui__input__icon" icon={icon} /> : undefined;
    }, [message, rightElement]);

    const wrapperClass = classnames(
      'ui__base ui__input__wrapper',
      {
        'ui__input__wrapper--fill': fillWidth,
        'ui__input__wrapper--pad': padMessageText && !messageText,
      },
      wrapperClassName,
    );
    const mainClass = classnames('ui__input', `ui__input--message-${message}`, { 'ui__input--focused': focused });
    const inputClass = classnames('ui__input__input', { 'ui__input__input--disabled': props.disabled }, className);

    return (
      <div className={wrapperClass}>
        <div className={mainClass}>
          {leftElement}
          <input
            {...props}
            type={type}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            className={inputClass}
            ref={ref}
          />
          {rightIcon}
        </div>
        {messageText ? <div className="ui__input__messageText">{messageText}</div> : undefined}
      </div>
    );
  },
);
