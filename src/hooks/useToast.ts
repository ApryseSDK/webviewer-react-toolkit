import { createContext, MouseEventHandler, ReactNode, useContext } from 'react';

export interface CommonToastProps {
  /**
   * The heading to display on the toast. Use this for a brief overview of the
   * reason for the toast.
   */
  heading: ReactNode;
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
   * Adds an action button to the toast. Will position to the left of the close
   * button if `onClose` was provided.
   */
  action?: {
    text: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
}

export interface AddToast extends CommonToastProps {
  /**
   * If true, toast will have a close button.
   */
  closable?: boolean;
  /**
   * If provided, will set a timeout for the toast to disappear. This will
   * override the `defaultTimeout` prop from `ToastProvider`.
   */
  timeout?: number;
}

export interface ToastContextValue {
  /**
   * Add a toast with parameters outlined by the `AddToast` object.
   * @param toast Adds this toast to the end of the queue.
   * @returns The ID of the added toast to use for early removal.
   */
  add(toast: AddToast): number;
  /**
   * Remove a toast by ID. If no ID provided, removes the current toast.
   * @param toastId The ID of the toast to remove.
   */
  remove(toastId?: number): void;
}

export const ToastContext = createContext<ToastContextValue>({} as ToastContextValue);

/**
 * Returns the toast context object for managing toasts.
 */
export function useToast() {
  return useContext(ToastContext);
}
