import { MouseEvent, MouseEventHandler, useCallback } from 'react';

export interface UseOnClickOptions {
  stopPropagation?: boolean;
  preventDefault?: boolean;
  blurOnClick?: boolean;
  disabled?: boolean;
}

type UseOnClickOutput<T> = (event: MouseEvent<T>) => void;

/**
 * Returns the handler for onClick. Allows you to add specific options to the
 * event before passing it through to the default onClick.
 * @param onClick The onClick prop if it's available.
 * @param options UseOnClickOptions for the hook.
 */
export function useOnClick<T>(onClick?: MouseEventHandler<T>, options: UseOnClickOptions = {}) {
  const stopPropagation = !!options.stopPropagation;
  const preventDefault = !!options.preventDefault;
  const blurOnClick = !!options.blurOnClick;
  const disabled = !!options.disabled;

  const handler = useCallback<UseOnClickOutput<T>>(
    event => {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      if (disabled) return;
      if (blurOnClick) {
        const focused = document.activeElement as HTMLElement | null;
        focused?.blur();
      }
      onClick?.(event);
    },
    [preventDefault, stopPropagation, blurOnClick, onClick, disabled],
  );

  return handler;
}
