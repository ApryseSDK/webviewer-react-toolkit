'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
var selectIcon_1 = require('../../storybook-helpers/knobs/selectIcon');
var Icon_1 = require('../Icon');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/Icon',
  component: Icon_1.Icon,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(Icon_1.Icon, {
    icon: (0, selectIcon_1.selectIcon)('icon', 'Close'),
  });
};
exports.Basic = Basic;
//# sourceMappingURL=Icon.stories.js.map
