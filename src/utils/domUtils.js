'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.focusableElementDomString = exports.generateClickEventFromKeyboardEvent = exports.getSibling = exports.isScrolledIntoView = void 0;
/**
 * Returns an object describing whether the object is visible. It will detect if
 * the item is cut off by either the top or bottom of the window, or by the
 * container passed in.
 * @param element The element to detect scroll position of.
 * @param container The scroll container which could be cutting off the item.
 */
function isScrolledIntoView(element, container) {
  if (!element || !container)
    return { isVisible: true, isAbove: false, isBelow: false };
  var elem = element.getBoundingClientRect();
  var cont = container.getBoundingClientRect();
  var elemTop = elem.top;
  var elemBottom = elem.bottom;
  // Can be cut off by container, or by window if container extends outside.
  var contTop = Math.max(cont.top, 0);
  var contBottom = Math.min(cont.bottom, window.innerHeight);
  // Only completely visible elements return true:
  var isAbove = elemTop < contTop;
  var isBelow = elemBottom > contBottom;
  var isVisible = !isAbove && !isBelow;
  return { isVisible: isVisible, isAbove: isAbove, isBelow: isBelow };
}
exports.isScrolledIntoView = isScrolledIntoView;
/**
 * Get a sibling in the DOM based on an index diff.
 * @param element The element to find the sibling of.
 * @param indexDiff The index diff of the sibling to find (ex: 1 returns next sibling).
 */
function getSibling(element, indexDiff) {
  if (!element || !element.parentElement) return undefined;
  var siblings = Array.from(element.parentElement.children);
  var nodeIndex = siblings.indexOf(element);
  // Get the item occupying the previous index location.
  var sibling = siblings[nodeIndex + indexDiff];
  return sibling;
}
exports.getSibling = getSibling;
/**
 * Generates a click mouse event from an input keyboard event.
 * @param keyboardEvent The keyboard event to translate into a mouse event.
 */
function generateClickEventFromKeyboardEvent(keyboardEvent) {
  var clickEvent = new MouseEvent('click', {
    bubbles: keyboardEvent.bubbles,
    cancelable: keyboardEvent.cancelable,
    altKey: keyboardEvent.altKey,
    shiftKey: keyboardEvent.shiftKey,
    ctrlKey: keyboardEvent.ctrlKey,
    metaKey: keyboardEvent.metaKey,
    // TODO: add any more that need to transfer through.
  });
  return clickEvent;
}
exports.generateClickEventFromKeyboardEvent = generateClickEventFromKeyboardEvent;
/**
 * A string for querying all focusable elements.
 */
exports.focusableElementDomString = [
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
//# sourceMappingURL=domUtils.js.map
