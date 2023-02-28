'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useFocus = void 0;
var react_1 = require('react');
/**
 * Returns handlers for onFocus and onBlur, as well as a property focused which
 * is true if the component or any child is being focused.
 * @param onFocus The onFocus prop if it's available.
 * @param onBlur The onBlur prop if it's available.
 */
function useFocus(onFocus, onBlur) {
  var _a = (0, react_1.useState)(false),
    focused = _a[0],
    setFocused = _a[1];
  var handleOnFocus = (0, react_1.useCallback)(
    function(event) {
      setFocused(true);
      onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
    },
    [onFocus],
  );
  var handleOnBlur = (0, react_1.useCallback)(
    function(event) {
      setFocused(false);
      onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
    },
    [onBlur],
  );
  return {
    focused: focused,
    handleOnFocus: handleOnFocus,
    handleOnBlur: handleOnBlur,
  };
}
exports.useFocus = useFocus;
//# sourceMappingURL=useFocus.js.map
