'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var Button_1 = require('../Button');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/Button',
  component: Button_1.Button,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(
    Button_1.Button,
    {
      buttonStyle: (0, addon_knobs_1.select)(
        'buttonStyle',
        ['default', 'borderless', 'outline'],
        'default',
      ),
      buttonSize: (0, addon_knobs_1.select)(
        'buttonSize',
        ['small', 'default', 'large'],
        'default',
      ),
      disabled: (0, addon_knobs_1.boolean)('disabled', false),
      onClick: (0, action_1.action)('onClick'),
    },
    (0, addon_knobs_1.text)('children', 'Button content'),
  );
};
exports.Basic = Basic;
//# sourceMappingURL=Button.stories.js.map
