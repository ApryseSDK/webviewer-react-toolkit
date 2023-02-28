'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useOnClick = void 0;
var react_1 = require('react');
/**
 * Returns the handler for onClick. Allows you to add specific options to the
 * event before passing it through to the default onClick.
 * @param onClick The onClick prop if it's available.
 * @param options UseOnClickOptions for the hook.
 */
function useOnClick(onClick, options) {
  if (options === void 0) {
    options = {};
  }
  var stopPropagation = !!options.stopPropagation;
  var preventDefault = !!options.preventDefault;
  var blurOnClick = !!options.blurOnClick;
  var disabled = !!options.disabled;
  var handler = (0, react_1.useCallback)(
    function(event) {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      if (disabled) return;
      if (blurOnClick) {
        var focused = document.activeElement;
        focused === null || focused === void 0 ? void 0 : focused.blur();
      }
      onClick === null || onClick === void 0 ? void 0 : onClick(event);
    },
    [preventDefault, stopPropagation, blurOnClick, onClick, disabled],
  );
  return handler;
}
exports.useOnClick = useOnClick;
//# sourceMappingURL=useOnClick.js.map
