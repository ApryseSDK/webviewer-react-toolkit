'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.action = void 0;
var tslib_1 = require('tslib');
var addon_actions_1 = require('@storybook/addon-actions');
/**
 * Async actions for increased performance. Doesn't block thread.
 * @param name Action name. Should match your prop name.
 * @param options Options for the action.
 */
function action(name, options) {
  var primedAction = (0, addon_actions_1.action)(name, options);
  return function(event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (event && event.nativeEvent) event = event.nativeEvent;
    setTimeout(function() {
      return primedAction.apply(
        void 0,
        tslib_1.__spreadArray([event], args, false),
      );
    });
  };
}
exports.action = action;
//# sourceMappingURL=action.js.map
