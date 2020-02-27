import classnames from 'classnames';
import React, { AriaAttributes, FC, HTMLAttributes, MouseEventHandler, useMemo } from 'react';
import { CommonToastProps } from '../../hooks';
import { Close } from '../../icons';
import { getStringId } from '../../utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

export interface ToastProps extends CommonToastProps, HTMLAttributes<HTMLDivElement> {
  /**
   * If provided, toast will have a close button.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  /** @default "status" */
  role?: HTMLAttributes<HTMLDivElement>['role'];
  /** @default "polite" */
  'aria-live'?: AriaAttributes['aria-live'];
  /** @default true */
  'aria-atomic'?: AriaAttributes['aria-atomic'];
}

export const Toast: FC<ToastProps> = ({
  heading,
  children,
  toastType = 'info',
  onClose,
  action,
  className,
  role = 'status',
  'aria-live': ariaLive = 'polite',
  'aria-atomic': ariaAtomic = true,
  ...props
}) => {
  const headingId = useMemo(() => getStringId('modal_heading', 8), []);
  const bodyId = useMemo(() => getStringId('modal_body', 8), []);

  const icon = useMemo(() => {
    switch (toastType) {
      case 'info':
        return 'Info';
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
    }
  }, [toastType]);

  const toastClass = classnames('ui__base ui__toast', `ui__toast--type-${toastType}`, className);

  return (
    <div
      {...props}
      className={toastClass}
      role={role}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
      aria-labelledby={headingId}
      aria-describedby={bodyId}
    >
      <div className="ui__toast__border" />
      <Icon icon={icon} className="ui__toast__icon" />
      <div className="ui__toast__copy">
        {heading ? (
          <div className="ui__toast__copy__heading" id={headingId}>
            {heading}
          </div>
        ) : (
          undefined
        )}
        {children ? (
          <div className="ui__toast__copy__body" id={bodyId}>
            {children}
          </div>
        ) : (
          undefined
        )}
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
          <IconButton onClick={onClose} aria-label="Close">
            <Close />
          </IconButton>
        </div>
      ) : (
        undefined
      )}
    </div>
  );
};
