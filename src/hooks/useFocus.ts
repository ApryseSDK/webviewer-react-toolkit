import { FocusEvent, FocusEventHandler, useCallback, useState } from 'react';

function useFocus<T>(onFocus?: FocusEventHandler<T>, onBlur?: FocusEventHandler<T>) {
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

export default useFocus;
