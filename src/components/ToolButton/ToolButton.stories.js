'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var Icon_1 = require('../Icon');
var ToolButton_1 = require('../ToolButton');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/ToolButton',
  component: ToolButton_1.ToolButton,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(
    ToolButton_1.ToolButton,
    {
      disabled: (0, addon_knobs_1.boolean)('disabled', false),
      onClick: (0, action_1.action)('onClick'),
      expandProps: (0, addon_knobs_1.boolean)('has expandProps?', false)
        ? {
            position: (0, addon_knobs_1.select)(
              'expandProps.position',
              ['bottom', 'right'],
              'bottom',
            ),
            onClick: (0, action_1.action)('expandProps.onClick'),
          }
        : undefined,
    },
    react_1.default.createElement(Icon_1.Icon, { icon: 'RotateRight' }),
  );
};
exports.Basic = Basic;
//# sourceMappingURL=ToolButton.stories.js.map
