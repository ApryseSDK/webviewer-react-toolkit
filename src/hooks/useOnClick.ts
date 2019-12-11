import { MouseEvent, useCallback, MouseEventHandler } from 'react';

export interface OnClickOptions {
  stopPropagation?: boolean;
  blurOnClick?: boolean;
}

function useOnClick<T>(onClick?: MouseEventHandler<T>, options: OnClickOptions = {}) {
  const stopPropagation = !!options.stopPropagation;
  const blurOnClick = !!options.blurOnClick;

  const handler = useCallback(
    (event: MouseEvent<T>) => {
      if (stopPropagation) event.stopPropagation();
      if (blurOnClick) {
        const focused = document.activeElement as HTMLElement | null;
        focused?.blur();
      }
      onClick?.(event);
    },
    [stopPropagation, blurOnClick, onClick],
  );

  return handler;
}

export default useOnClick;
