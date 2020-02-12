import classnames from 'classnames';
import React, { FC, HTMLAttributes, MouseEventHandler, ReactNode, useMemo } from 'react';
import { Button } from '../Button';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The heading to display on the toast. Use this for a brief overview of the
   * reason for the toast.
   */
  heading?: ReactNode;
  /**
   * The body of the toast. This is where you can elaborate with more
   * information about the toast.
   */
  children?: ReactNode;
  /**
   * The type of message the toast is displaying. Will change the color and
   * icon of the toast.
   * @default "info"
   */
  toastType?: 'info' | 'success' | 'warning' | 'error';
  /**
   * If provided, toast will have a close button.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Adds an action button to the toast. Will position to the left of the close
   * button if `onClose` was provided.
   */
  action?: {
    text: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
}

export const Toast: FC<ToastProps> = ({
  heading,
  children,
  toastType = 'info',
  onClose,
  action,
  className,
  ...props
}) => {
  const toastClass = classnames('ui__base ui__toast', `ui__toast--type-${toastType}`, className);

  const Icon = useMemo(() => {
    switch (toastType) {
      case 'info':
        return Info;
      case 'success':
        return Success;
      case 'warning':
        return Warning;
      case 'error':
        return Error;
    }
  }, [toastType]);

  return (
    <div className="ui__toast__wrapper">
      <div {...props} className={toastClass}>
        <div className="ui__toast__border" />
        <div className="ui__toast__icon">
          <Icon />
        </div>
        <div className="ui__toast__copy">
          <div className="ui__toast__copy__heading">{heading}</div>
          <div className="ui__toast__copy__body">{children}</div>
        </div>
        {action ? (
          <div className="ui__toast__action">
            <Button className="ui__toast__button" onClick={action.onClick} buttonStyle="borderless">
              {action.text}
            </Button>
          </div>
        ) : null}
        {onClose ? (
          <div className="ui__toast__action">
            <Button className="ui__toast__button ui__toast__button--nopad" onClick={onClose} buttonStyle="borderless">
              <Close />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

function Info() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z" />
      <path d="M11 11H13V17H11zM11 7H13V9H11z" />
    </svg>
  );
}

function Success() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z" />
      <path d="M9.999 13.587L7.7 11.292 6.288 12.708 10.001 16.413 16.707 9.707 15.293 8.293z" />
    </svg>
  );
}

function Warning() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M11.001 10H13.001V15H11.001zM11 16H13V18H11z" />
      <path d="M13.768,4.2C13.42,3.545,12.742,3.138,12,3.138s-1.42,0.407-1.768,1.063L2.894,18.064 c-0.331,0.626-0.311,1.361,0.054,1.968C3.313,20.638,3.953,21,4.661,21h14.678c0.708,0,1.349-0.362,1.714-0.968 c0.364-0.606,0.385-1.342,0.054-1.968L13.768,4.2z M4.661,19L12,5.137L19.344,19H4.661z" />
    </svg>
  );
}

function Error() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M9.172 16.242L12 13.414 14.828 16.242 16.242 14.828 13.414 12 16.242 9.172 14.828 7.758 12 10.586 9.172 7.758 7.758 9.172 10.586 12 7.758 14.828z" />
      <path d="M12,22c5.514,0,10-4.486,10-10S17.514,2,12,2S2,6.486,2,12S6.486,22,12,22z M12,4c4.411,0,8,3.589,8,8s-3.589,8-8,8 s-8-3.589-8-8S7.589,4,12,4z" />
    </svg>
  );
}

function Close() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
    </svg>
  );
}
