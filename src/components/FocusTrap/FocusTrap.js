'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FocusTrap = void 0;
var react_1 = require('react');
var hooks_1 = require('../../hooks');
var FocusTrap = function(_a) {
  var locked = _a.locked,
    focusLastOnUnlock = _a.focusLastOnUnlock,
    children = _a.children;
  var focusRef = (0, hooks_1.useFocusTrap)(locked, {
    focusLastOnUnlock: focusLastOnUnlock,
  });
  return (0, react_1.cloneElement)(children, { ref: focusRef });
};
exports.FocusTrap = FocusTrap;
//# sourceMappingURL=FocusTrap.js.map
