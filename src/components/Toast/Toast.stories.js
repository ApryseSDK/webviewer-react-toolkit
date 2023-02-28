'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var Toast_1 = require('../Toast');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/Toast',
  component: Toast_1.Toast,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(
    'div',
    { style: { display: 'flex' } },
    react_1.default.createElement(
      Toast_1.Toast,
      {
        message: (0, addon_knobs_1.select)(
          'message',
          ['info', 'success', 'warning', 'error'],
          'info',
        ),
        heading: (0, addon_knobs_1.text)(
          'heading',
          'Information about the toast',
        ),
        onClose: (0, addon_knobs_1.boolean)('has onClose', false)
          ? (0, action_1.action)('onClose')
          : undefined,
        action: (0, addon_knobs_1.boolean)('has action', false)
          ? { text: 'Action', onClick: (0, action_1.action)('action.onClick') }
          : undefined,
      },
      (0, addon_knobs_1.text)('children', ''),
    ),
  );
};
exports.Basic = Basic;
//# sourceMappingURL=Toast.stories.js.map
