import classnames from 'classnames';
import React, { FC, HTMLAttributes, MouseEventHandler, useMemo } from 'react';
import { CommonToastProps } from '../../hooks';
import { Close, Error, Info, Success, Warning } from '../../icons';
import { Button } from '../Button';
import { IconButton } from '../IconButton';

export interface ToastProps extends CommonToastProps, HTMLAttributes<HTMLDivElement> {
  /**
   * If provided, toast will have a close button.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
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
    <div {...props} className={toastClass}>
      <div className="ui__toast__border" />
      <div className="ui__toast__icon">
        <Icon />
      </div>
      <div className="ui__toast__copy">
        {heading ? <div className="ui__toast__copy__heading">{heading}</div> : undefined}
        {children ? <div className="ui__toast__copy__body">{children}</div> : undefined}
      </div>
      {action ? (
        <div className="ui__toast__action">
          <Button className="ui__toast__button" onClick={action.onClick} buttonStyle="borderless">
            {action.text}
          </Button>
        </div>
      ) : (
        undefined
      )}
      {onClose ? (
        <div className="ui__toast__action">
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
      ) : (
        undefined
      )}
    </div>
  );
};
