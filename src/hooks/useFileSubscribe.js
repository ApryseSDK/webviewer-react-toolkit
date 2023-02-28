'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useFileSubscribe = void 0;
var tslib_1 = require('tslib');
var react_1 = require('react');
var data_1 = require('../data');
var GlobalQueue_1 = tslib_1.__importDefault(require('../work/GlobalQueue'));
/**
 * Will subscribe to a value from a file and return the value, as well as any
 * async errors.
 * @param file The file to subscribe to.
 * @param getCurrentValue Function to extract the current value from the file.
 * @param eventType The event type to subscribe. Won't subscribe if not given.
 * @param throttle The timeout to throttle initial fetch of value. Default: 500ms.
 */
function useFileSubscribe(file, getCurrentValue, eventType) {
  var getValue = (0, react_1.useRef)(getCurrentValue);
  var _a = (0, react_1.useState)(),
    error = _a[0],
    setError = _a[1];
  var _b = (0, react_1.useState)(function() {
      var currentValue = getValue.current(file);
      if (currentValue instanceof data_1.MemoizedPromise) return undefined;
      return currentValue;
    }),
    value = _b[0],
    setValue = _b[1];
  (0, react_1.useEffect)(
    function() {
      var cancelled = false;
      var cancel;
      var setMemoValue = function(val) {
        try {
          if (!cancelled) setValue(val);
        } catch (error) {
          if (!cancelled) setError(error);
        }
      };
      var subscribe = function() {
        setError(undefined);
        var val = getValue.current(file);
        if (!(val instanceof data_1.MemoizedPromise)) {
          // Non-memoized-promise, can set directly.
          setValue(val);
          return;
        }
        setValue(undefined);
        if (val.done) {
          val.get().then(setMemoValue);
        } else {
          var r = GlobalQueue_1.default.process(function() {
            return val.get();
          });
          cancel = r[1];
          r[0]
            .then(function(result) {
              setMemoValue(result);
            })
            .catch(function(e) {
              setError(e);
            });
        }
      };
      subscribe();
      var unsubscribe;
      if (eventType) unsubscribe = file.subscribe(eventType, subscribe);
      return function() {
        cancel === null || cancel === void 0 ? void 0 : cancel();
        unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe();
        cancelled = true;
      };
    },
    [eventType, file],
  );
  return (0, react_1.useMemo)(
    function() {
      return [value, error, setValue];
    },
    [error, value],
  );
}
exports.useFileSubscribe = useFileSubscribe;
//# sourceMappingURL=useFileSubscribe.js.map
