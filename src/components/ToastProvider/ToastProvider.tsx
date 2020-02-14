import classnames from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AddToast, ToastContext, ToastContextValue } from '../../hooks';
import { Overlay } from '../Overlay';
import { Toast } from '../Toast';

export interface ToastProviderProps {
  /**
   * If provided, added toasts will disappear in this timeout. This is
   * overridden if the `timeout` property is specified for an added toast.
   */
  defaultTimeout?: number;
}

interface ToastQueueItem extends AddToast {
  toastId: number;
}

let toastIdSequence = 1;

export const ToastProvider: FC<ToastProviderProps> = ({ defaultTimeout, children }) => {
  const [toasts, setToasts] = useState<ToastQueueItem[]>([]);
  const [closing, setClosing] = useState(false);

  const [hovered, setHovered] = useState(false);
  const onHover = useCallback(() => setHovered(true), []);
  const onBlur = useCallback(() => setHovered(false), []);

  const _pop = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setToasts(prev => prev.slice(1));
      setClosing(false);
    }, 250);
  }, []);

  const { toastId, closable, timeout, ...toastProps }: ToastQueueItem = toasts[0] || {};

  useEffect(() => {
    const timeoutValue = timeout ?? defaultTimeout;

    if (!hovered && toastId && timeoutValue) {
      const timeoutId = window.setTimeout(() => {
        _pop();
      }, timeoutValue);
      return () => {
        window.clearTimeout(timeoutId);
      };
    }
    return;
  }, [_pop, defaultTimeout, hovered, timeout, toastId]);

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

  const toastProviderClass = classnames('ui__toastProvider', { 'ui__toastProvider--closing': closing });

  return (
    <ToastContext.Provider value={value}>
      {toastId && (
        <Overlay>
          <div className="ui__toastProvider__toast" key={toastId}>
            <Toast
              {...toastProps}
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
