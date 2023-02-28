'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.integer = void 0;
var addon_knobs_1 = require('@storybook/addon-knobs');
function integer(name, value, groupId) {
  var num = (0, addon_knobs_1.number)(name, value, undefined, groupId);
  if (!Number.isInteger(num) || !Number.isFinite(num) || num < 0)
    return undefined;
  return num;
}
exports.integer = integer;
//# sourceMappingURL=integer.js.map
