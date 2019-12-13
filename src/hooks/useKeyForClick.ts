import { KeyboardEvent, KeyboardEventHandler, RefObject, useCallback } from 'react';

/**
 * Returns the handler for onKeyPress. If it hears a space or Enter key, it will
 * fire onClick. If you provide a ref, will compare the target and make sure it
 * is the same as the ref, then will fire onClick on the ref. Otherwise will
 * call it on the event target.
 * @param onKeyPress The onKeyPress prop if it's available.
 * @param ref If given, will compare event target to prevent any bubbling events.
 */
function useKeyForClick<T extends HTMLElement>(onKeyPress?: KeyboardEventHandler<T>, ref?: RefObject<T>) {
  const handler = useCallback(
    (event: KeyboardEvent<T>) => {
      // Fire click on space or enter press.
      if (event.key === ' ' || event.key === 'Enter') {
        // Stop scrolling if space is pressed.
        // if (event.key === ' ') event.preventDefault();
        if (ref && event.target === ref.current) {
          // If ref is provided and it matches the event target, click ref.
          ref.current.click();
        } else if (!ref) {
          // If no ref provided, click the target of the event.
          (event.target as HTMLElement).click();
        }
      }
      onKeyPress?.(event);
    },
    [ref, onKeyPress],
  );

  return handler;
}

export default useKeyForClick;
