'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useToast = exports.ToastContext = void 0;
var react_1 = require('react');
exports.ToastContext = (0, react_1.createContext)({});
/**
 * Returns the toast context object for managing toasts.
 */
function useToast() {
  return (0, react_1.useContext)(exports.ToastContext);
}
exports.useToast = useToast;
//# sourceMappingURL=useToast.js.map
