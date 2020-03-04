import classnames from 'classnames';
import React, { AriaAttributes, FC, HTMLAttributes, MouseEventHandler, useMemo } from 'react';
import { CommonToastProps } from '../../hooks';
import { getStringId } from '../../utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

export interface ToastProps extends CommonToastProps, HTMLAttributes<HTMLDivElement> {
  /**
   * If provided, toast will have a close button.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Provide alongside `onClose` for localized accessibility.
   * @default "Close"
   */
  closeLabel?: AriaAttributes['aria-label'];
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
  message = 'info',
  onClose,
  closeLabel = 'Close',
  action,
  className,
  role = 'status',
  'aria-live': ariaLive = 'polite',
  'aria-atomic': ariaAtomic = true,
  ...props
}) => {
  const headingId = useMemo(() => getStringId('toast_heading'), []);
  const bodyId = useMemo(() => getStringId('toast_body'), []);

  const icon = useMemo(() => {
    switch (message) {
      case 'info':
        return 'Info';
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
    }
  }, [message]);

  const toastClass = classnames('ui__base ui__toast', `ui__toast--message-${message}`, className);

  return (
    <div
      aria-labelledby={heading ? headingId : undefined}
      aria-describedby={children ? bodyId : undefined}
      {...props}
      className={toastClass}
      role={role}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
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
          <IconButton onClick={onClose} aria-label={closeLabel}>
            <Icon icon="Close" />
          </IconButton>
        </div>
      ) : (
        undefined
      )}
    </div>
  );
};
