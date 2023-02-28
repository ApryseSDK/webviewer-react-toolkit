'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var ClickableDiv_1 = require('../ClickableDiv');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/ClickableDiv',
  component: ClickableDiv_1.ClickableDiv,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(
    ClickableDiv_1.ClickableDiv,
    {
      disabled: (0, addon_knobs_1.boolean)('disabled', false),
      noFocusStyle: (0, addon_knobs_1.boolean)('noFocusStyle', false),
      usePointer: (0, addon_knobs_1.boolean)('usePointer', false),
      onClick: (0, action_1.action)('onClick'),
    },
    (0, addon_knobs_1.text)('children', 'This is a clickable div!'),
  );
};
exports.Basic = Basic;
//# sourceMappingURL=ClickableDiv.stories.js.map
