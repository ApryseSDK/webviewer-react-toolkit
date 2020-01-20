import { FocusEvent, FocusEventHandler, useCallback, useState } from 'react';

/**
 * Returns handlers for onFocus and onBlur, as well as a property focused which
 * is true if the component or any child is being focused.
 * @param onFocus The onFocus prop if it's available.
 * @param onBlur The onBlur prop if it's available.
 */
export function useFocus<T>(onFocus?: FocusEventHandler<T>, onBlur?: FocusEventHandler<T>) {
  const [focused, setFocused] = useState(false);

  const handleOnFocus = useCallback(
    (event: FocusEvent<T>) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleOnBlur = useCallback(
    (event: FocusEvent<T>) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  return { focused, handleOnFocus, handleOnBlur };
}
