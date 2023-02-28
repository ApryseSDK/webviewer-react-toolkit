'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.forwardAction = void 0;
var addon_actions_1 = require('@storybook/addon-actions');
function forwardAction(name, callback, options) {
  return function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    (0, addon_actions_1.action)(name, options).apply(void 0, args);
    return callback.apply(void 0, args);
  };
}
exports.forwardAction = forwardAction;
//# sourceMappingURL=forwardAction.js.map
