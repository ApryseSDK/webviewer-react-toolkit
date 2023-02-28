'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.selectIcon = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var icons = tslib_1.__importStar(require('../../icons'));
var availableIcons = Object.keys(icons);
function selectIcon(name, value, groupId) {
  return (0, addon_knobs_1.select)(name, availableIcons, value, groupId);
}
exports.selectIcon = selectIcon;
//# sourceMappingURL=selectIcon.js.map
