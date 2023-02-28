'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useCurrentRef = void 0;
var react_1 = require('react');
function useCurrentRef(toRef) {
  var toRefRef = (0, react_1.useRef)(toRef);
  (0, react_1.useEffect)(function() {
    toRefRef.current = toRef;
  });
  return toRefRef;
}
exports.useCurrentRef = useCurrentRef;
//# sourceMappingURL=useCurrentRef.js.map
