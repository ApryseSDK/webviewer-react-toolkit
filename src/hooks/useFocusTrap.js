'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findFocusableIndex = exports.useFocusTrap = void 0;
var react_1 = require('react');
var utils_1 = require('../utils');
var useCurrentRef_1 = require('./useCurrentRef');
/**
 * A hook for trapping focus within an element. Returns a ref which can be given
 * to any element to trap focus within that element when `locked` is true.
 * @param locked When true, focus will be locked within the element you passed
 * the returned ref to.
 * @param options Options to control the focus trap.
 */
function useFocusTrap(locked, options) {
  if (locked === void 0) {
    locked = false;
  }
  if (options === void 0) {
    options = {};
  }
  var focusLastOnUnlock = options.focusLastOnUnlock;
  var focusRef = (0, react_1.useRef)(null);
  // Get the focusable elements. Assumes that focusRef exists. DON'T CALL if
  // you haven't asserted existance of focusRef.current.
  var getFocusableElements = (0, react_1.useCallback)(function() {
    return focusRef.current.querySelectorAll(utils_1.focusableElementDomString);
  }, []);
  // Cycles tabs within the lock zone when enabled, or prevents default
  // if there are no elements within the lock (rare edge case).
  var lockFocus = (0, react_1.useCallback)(
    function(event) {
      // Return if not locked, other key pressed, or no ref.
      if (!locked || (event && event.key !== 'Tab') || !focusRef.current)
        return;
      var focusableElements = getFocusableElements();
      // If no focusable elements, simply prevent tab default.
      if (!focusableElements.length)
        return event === null || event === void 0
          ? void 0
          : event.preventDefault();
      var focusedItemIndex = findFocusableIndex(
        focusableElements,
        document.activeElement,
      );
      // If focused inside and initial call (no event), leave focused element.
      if (focusedItemIndex !== -1 && !event) return;
      // If focused outside, or tabbing past last element, cycle to beginning.
      if (
        focusedItemIndex === -1 ||
        (!(event === null || event === void 0 ? void 0 : event.shiftKey) &&
          focusedItemIndex === focusableElements.length - 1)
      ) {
        focusableElements[0].focus();
        return event === null || event === void 0
          ? void 0
          : event.preventDefault();
      }
      // If tabbing backwards and focusing first element, cycle to end.
      if (
        (event === null || event === void 0 ? void 0 : event.shiftKey) &&
        focusedItemIndex === 0
      ) {
        focusableElements[focusableElements.length - 1].focus();
        return event === null || event === void 0
          ? void 0
          : event.preventDefault();
      }
    },
    [getFocusableElements, locked],
  );
  // Ensure that user can not focus outside of lock. If an attempt is made
  // and focusable elements exist inside, will focus first element inside.
  var checkFocus = (0, react_1.useCallback)(
    function(event) {
      var _a;
      // Return if not locked or no focus ref.
      if (!locked || !focusRef.current) return;
      // Blur focus target if no focusable elements.
      var focusableElements = getFocusableElements();
      if (!focusableElements.length)
        return (_a = event.target) === null || _a === void 0
          ? void 0
          : _a.blur();
      // Focus initial element if focused outside.
      var focusedItemIndex = findFocusableIndex(
        focusableElements,
        event.target,
      );
      if (focusedItemIndex === -1) return focusableElements[0].focus();
    },
    [getFocusableElements, locked],
  );
  // Add document listeners for lock focus and check focus
  (0, react_1.useEffect)(
    function() {
      if (typeof window === 'undefined') return;
      document.addEventListener('keydown', lockFocus);
      document.addEventListener('focusin', checkFocus);
      return function() {
        document.removeEventListener('keydown', lockFocus);
        document.removeEventListener('focusin', checkFocus);
      };
    },
    [checkFocus, lockFocus],
  );
  // Keep the ref to focusLastOnUnlock fresh, prevents useEffect refresh.
  var focusLastOnUnlockRef = (0, useCurrentRef_1.useCurrentRef)(
    focusLastOnUnlock,
  );
  // When locked is changed, will maybe store last element focused prior
  // to lock being enabled, and will call lockFocus to focus first element
  // if it exists. Returns when locked is disabled, and will focus prior
  // element if stored (return focus to previous element).
  (0, react_1.useEffect)(
    function() {
      var _a;
      if (typeof window === 'undefined') return;
      var lastFocusedElement;
      if (locked) {
        if (
          focusLastOnUnlockRef.current &&
          !((_a = focusRef.current) === null || _a === void 0
            ? void 0
            : _a.contains(document.activeElement))
        ) {
          lastFocusedElement = document.activeElement;
          lockFocus();
          return function() {
            return lastFocusedElement.focus();
          };
        }
        lockFocus();
      }
      return;
    },
    [focusLastOnUnlockRef, lockFocus, locked],
  );
  return focusRef;
}
exports.useFocusTrap = useFocusTrap;
function findFocusableIndex(elements, toFind) {
  var index = -1;
  if (!toFind) return index;
  for (var i = 0; i < elements.length; i++) {
    if (elements[i] === toFind) {
      index = i;
      break;
    }
  }
  return index;
}
exports.findFocusableIndex = findFocusableIndex;
//# sourceMappingURL=useFocusTrap.js.map
