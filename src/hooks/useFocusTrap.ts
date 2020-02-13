import { RefObject, useCallback, useEffect, useRef } from 'react';

export interface UseFocusTrapOptions {
  /**
   * If true, will focus the previously-focused element on focus lock off.
   */
  focusLastOnUnlock?: boolean;
}

const focusableElementDomString = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
].join(',');

function findFocusableIndex(elements: NodeListOf<HTMLElement>, toFind: Element | EventTarget | null) {
  let index = -1;
  if (!toFind) return index;
  elements.forEach((element, i) => {
    if (index !== -1) return;
    if (element === toFind) index = i;
  });
  return index;
}

/**
 * A hook for trapping focus within an element. Returns a ref which can be given
 * to any element to trap focus within that element when `locked` is true.
 * @param locked When true, focus will be locked within the element you passed
 * the returned ref to.
 * @param options Options to control the focus trap.
 */
export function useFocusTrap<T extends HTMLElement>(locked = false, options: UseFocusTrapOptions = {}): RefObject<T> {
  const focusLastOnUnlock = options.focusLastOnUnlock;

  const focusRef = useRef<T>(null);

  // Get the focusable elements. Assumes that focusRef exists. DON'T CALL if
  // you haven't asserted existance of focusRef.current.
  const getFocusableElements = useCallback(() => {
    return focusRef.current!.querySelectorAll<HTMLElement>(focusableElementDomString);
  }, []);

  // Cycles tabs within the lock zone when enabled, or prevents default
  // if there are no elements within the lock (rare edge case).
  const lockFocus = useCallback(
    (event?: KeyboardEvent) => {
      // Return if not locked, other key pressed, or no ref.
      if (!locked || (event && event.key !== 'Tab') || !focusRef.current) return;

      const focusableElements = getFocusableElements();

      // If no focusable elements, simply prevent tab default.
      if (!focusableElements.length) return event?.preventDefault();

      const focusedItemIndex = findFocusableIndex(focusableElements, document.activeElement);

      // If focused inside and initial call (no event), leave focused element.
      if (focusedItemIndex !== -1 && !event) return;

      // If focused outside, or tabbing past last element, cycle to beginning.
      if (focusedItemIndex === -1 || (!event?.shiftKey && focusedItemIndex === focusableElements.length - 1)) {
        focusableElements[0].focus();
        return event?.preventDefault();
      }

      // If tabbing backwards and focusing first element, cycle to end.
      if (event?.shiftKey && focusedItemIndex === 0) {
        focusableElements[focusableElements.length - 1].focus();
        return event?.preventDefault();
      }
    },
    [getFocusableElements, locked],
  );

  // Ensure that user can not focus outside of lock. If an attempt is made
  // and focusable elements exist inside, will focus first element inside.
  const checkFocus = useCallback(
    (event: FocusEvent) => {
      // Return if not locked or no focus ref.
      if (!locked || !focusRef.current) return;

      // Blur focus target if no focusable elements.
      const focusableElements = getFocusableElements();
      if (!focusableElements.length) return (event.target as HTMLElement | null)?.blur();

      // Focus initial element if focused outside.
      const focusedItemIndex = findFocusableIndex(focusableElements, event.target);
      if (focusedItemIndex === -1) return focusableElements[0].focus();
    },
    [getFocusableElements, locked],
  );

  // Add document listeners for lock focus and check focus
  useEffect(() => {
    document.addEventListener('keydown', lockFocus);
    document.addEventListener('focusin', checkFocus);

    return () => {
      document.removeEventListener('keydown', lockFocus);
      document.removeEventListener('focusin', checkFocus);
    };
  }, [checkFocus, lockFocus]);

  // Keep the ref to focusLastOnUnlock fresh, prevents useEffect refresh.
  const focusLastOnUnlockRef = useRef(focusLastOnUnlock);
  useEffect(() => {
    focusLastOnUnlockRef.current = focusLastOnUnlock;
  }, [focusLastOnUnlock]);

  // When locked is changed, will maybe store last element focused prior
  // to lock being enabled, and will call lockFocus to focus first element
  // if it exists. Returns when locked is disabled, and will focus prior
  // element if stored (return focus to previous element).
  useEffect(() => {
    let lastFocusedElement: HTMLElement;

    if (locked) {
      if (document.activeElement && focusRef.current && !focusRef.current.contains(document.activeElement)) {
        lastFocusedElement = document.activeElement as HTMLElement;
      }

      lockFocus();
    }

    return () => {
      if (focusLastOnUnlockRef.current && locked && lastFocusedElement) {
        lastFocusedElement.focus();
      }
    };
  }, [lockFocus, locked]);

  return focusRef;
}
