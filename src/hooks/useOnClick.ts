import { MouseEvent, useCallback, MouseEventHandler } from 'react';

export interface OnClickOptions {
  stopPropagation?: boolean;
  preventDefault?: boolean;
  blurOnClick?: boolean;
  disabled?: boolean;
}

function useOnClick<T>(onClick?: MouseEventHandler<T>, options: OnClickOptions = {}) {
  const stopPropagation = !!options.stopPropagation;
  const preventDefault = !!options.preventDefault;
  const blurOnClick = !!options.blurOnClick;
  const disabled = !!options.disabled;

  const handler = useCallback(
    (event: MouseEvent<T>) => {
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

export default useOnClick;
