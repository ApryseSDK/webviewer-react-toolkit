'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useUnmountDelay = void 0;
var react_1 = require('react');
function useUnmountDelay(on, delay) {
  if (on === void 0) {
    on = false;
  }
  if (delay === void 0) {
    delay = 250;
  }
  var _a = (0, react_1.useState)(on),
    mounted = _a[0],
    setMounted = _a[1];
  (0, react_1.useEffect)(
    function() {
      if (!on) {
        var timeoutId_1 = window.setTimeout(function() {
          setMounted(false);
        }, delay);
        return function() {
          return window.clearTimeout(timeoutId_1);
        };
      }
      setMounted(true);
      return;
    },
    [delay, on],
  );
  var value = (0, react_1.useMemo)(
    function() {
      return {
        mounted: mounted,
        unmounting: mounted && !on,
      };
    },
    [mounted, on],
  );
  return value;
}
exports.useUnmountDelay = useUnmountDelay;
//# sourceMappingURL=useUnmountDelay.js.map
