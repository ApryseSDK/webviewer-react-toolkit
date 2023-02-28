'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useKeyForClick = void 0;
var react_1 = require('react');
var utils_1 = require('../utils');
/**
 * Returns the handler for onKeyPress. If it hears a space or Enter key, it will
 * fire onClick. If you provide a ref, will compare the target and make sure it
 * is the same as the ref, then will fire onClick on the ref. Otherwise will
 * call it on the event target.
 * @param onKeyPress The onKeyPress prop if it's available.
 * @param ref If given, will compare event target to prevent any bubbling events.
 */
function useKeyForClick(onKeyPress, ref) {
  var handler = (0, react_1.useCallback)(
    function(event) {
      // Fire click on space or enter press.
      if (event.key === ' ' || event.key === 'Enter') {
        var clickEvent = (0, utils_1.generateClickEventFromKeyboardEvent)(
          event,
        );
        // If ref is provided and it matches the event target, click ref.
        if (ref && event.target === ref.current) {
          ref.current.dispatchEvent(clickEvent);
          // Stop scrolling if space is pressed.
          if (event.key === ' ') event.preventDefault();
        } else if (!ref) {
          event.target.dispatchEvent(clickEvent);
        }
      }
      onKeyPress === null || onKeyPress === void 0 ? void 0 : onKeyPress(event);
    },
    [ref, onKeyPress],
  );
  return handler;
}
exports.useKeyForClick = useKeyForClick;
//# sourceMappingURL=useKeyForClick.js.map
