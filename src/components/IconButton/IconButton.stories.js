'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var Icon_1 = require('../Icon/Icon');
var IconButton_1 = require('../IconButton');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/IconButton',
  component: IconButton_1.IconButton,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(
    IconButton_1.IconButton,
    {
      disabled: (0, addon_knobs_1.boolean)('disabled', false),
      onClick: (0, action_1.action)('onClick'),
    },
    react_1.default.createElement(Icon_1.Icon, { icon: 'Close' }),
  );
};
exports.Basic = Basic;
//# sourceMappingURL=IconButton.stories.js.map
