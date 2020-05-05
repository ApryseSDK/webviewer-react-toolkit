import classnames from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AddToast, CommonToastProps, ToastContext, ToastContextValue, useCurrentRef } from '../../hooks';
import { Overlay } from '../Overlay';
import { Toast } from '../Toast';

export interface ToastProviderProps {
  /**
   * If provided, added toasts will disappear in this timeout. This is
   * overridden if the `timeout` property is specified for an added toast.
   */
  defaultTimeout?: number;
  /**
   * Specify toast types that should have no timeout by default. Provide a toast
   * type, or array of types. This could be used to persist error toasts until
   * they are cleared manually.
   */
  noTimeout?: CommonToastProps['message'] | CommonToastProps['message'][];
  /**
   * Specify the location where the toasts will appear from.
   * @default "top-right"
   */
  position?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
  /**
   * If provided, will position the toast this number of pixels away from the
   * edge of the screen. This only applies on the y axis, you will have to use
   * `className` to add any other styles.
   */
  customPadding?: number;
  /**
   * Custom classname for the div that wraps the toast. This can be used to add
   * custom padding or override the animations.
   */
  className?: string;
}

interface ToastQueueItem extends AddToast {
  toastId: number;
}

let toastIdSequence = 1;

export const ToastProvider: FC<ToastProviderProps> = ({
  defaultTimeout,
  noTimeout,
  position = 'top-right',
  customPadding,
  className,
  children,
}) => {
  const [toasts, setToasts] = useState<ToastQueueItem[]>([]);
  const [closing, setClosing] = useState(false);

  const [hovered, setHovered] = useState(false);
  const onHover = useCallback(() => setHovered(true), []);
  const onBlur = useCallback(() => setHovered(false), []);

  const _pop = useCallback(() => {
    setClosing(true);
  }, []);
  useEffect(() => {
    if (closing) {
      const timeoutId = window.setTimeout(() => {
        setToasts(prev => prev.slice(1));
        setClosing(false);
      }, 250);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }
    return;
  }, [closing]);

  const { toastId, closable = true, timeout, ...toastProps }: ToastQueueItem = toasts[0] || {};

  const noTimeoutTypes = useCurrentRef(noTimeout);
  const timeoutValue = useMemo(() => {
    const timeoutNum = timeout ?? defaultTimeout;
    if (!noTimeoutTypes.current) return timeoutNum;
    if (Array.isArray(noTimeoutTypes.current)) {
      if (!noTimeoutTypes.current.length) return timeoutNum;
      if (!noTimeoutTypes.current.includes(toastProps.message)) return timeoutNum;
      return 0;
    } else {
      if (noTimeoutTypes.current !== toastProps.message) return timeoutNum;
      return 0;
    }
  }, [defaultTimeout, noTimeoutTypes, timeout, toastProps.message]);

  useEffect(() => {
    if (!hovered && toastId && timeoutValue) {
      const timeoutId = window.setTimeout(() => {
        _pop();
      }, timeoutValue);
      return () => {
        window.clearTimeout(timeoutId);
      };
    }
    return;
  }, [_pop, hovered, timeoutValue, toastId]);

  const add = useCallback<ToastContextValue['add']>(toast => {
    const toastId = toastIdSequence++;
    setToasts(prev => [...prev, { ...toast, toastId }]);
    return toastId;
  }, []);

  const remove = useCallback<ToastContextValue['remove']>(
    toastId => {
      if (!toasts.length) return;
      const index = toastId === undefined ? 0 : toasts.findIndex(toast => toast.toastId === toastId);
      if (index === -1) return;
      if (index === 0) return _pop();
      setToasts(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    },
    [_pop, toasts],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      add,
      remove,
      toasts,
    }),
    [add, remove, toasts],
  );

  const padding = useMemo(() => {
    if (customPadding === undefined) return undefined;
    const isTop = ['top-left', 'top', 'top-right'].includes(position);
    return customPadding !== undefined
      ? {
          paddingTop: isTop ? customPadding : undefined,
          paddingBottom: isTop ? undefined : customPadding,
        }
      : undefined;
  }, [customPadding, position]);

  const toastProviderClass = classnames('ui__toastProvider', { 'ui__toastProvider--closing': closing });
  const toastClass = classnames(
    'ui__toastProvider__toast',
    `ui__toastProvider__toast--position-${position}`,
    className,
  );

  return (
    <ToastContext.Provider value={value}>
      {toastId && (
        <Overlay>
          <div className={toastClass} key={toastId} style={padding}>
            <Toast
              {...toastProps}
              role={toastProps.message === 'error' ? 'alert' : 'status'}
              aria-live={toastProps.message === 'error' ? 'assertive' : 'polite'}
              onMouseEnter={onHover}
              onMouseLeave={onBlur}
              className={toastProviderClass}
              onClose={closable ? _pop : undefined}
            />
          </div>
        </Overlay>
      )}
      {children}
    </ToastContext.Provider>
  );
};
