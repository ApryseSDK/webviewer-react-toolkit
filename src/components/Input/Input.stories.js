'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PasswordExample = exports.SearchExample = exports.Controlled = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importStar(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var Icon_1 = require('../Icon');
var IconButton_1 = require('../IconButton');
var Input_1 = require('../Input');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
var icons_1 = require('../../icons');
exports.default = {
  title: 'Components/Input',
  component: Input_1.Input,
  parameters: { readme: README_md_1.default },
};
var getTypeSelect = function() {
  return (0, addon_knobs_1.select)(
    'type',
    [
      'color',
      'date',
      'datetime-local',
      'email',
      // 'file',
      'month',
      'number',
      'password',
      // 'range',
      'search',
      'tel',
      'text',
      'time',
      'url',
      'week',
    ],
    'text',
  );
};
var Basic = function() {
  return react_1.default.createElement(Input_1.Input, {
    type: getTypeSelect(),
    message: (0, addon_knobs_1.select)(
      'message',
      ['default', 'warning', 'error'],
      'default',
    ),
    messageText: (0, addon_knobs_1.text)('messageText', ''),
    fillWidth: (0, addon_knobs_1.boolean)('fillWidth', false),
    padMessageText: (0, addon_knobs_1.boolean)('padMessageText', false),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    onChange: (0, action_1.action)('onChange'),
  });
};
exports.Basic = Basic;
var Controlled = function() {
  return react_1.default.createElement(Input_1.Input, {
    value: (0, addon_knobs_1.text)('value', ''),
    type: getTypeSelect(),
    message: (0, addon_knobs_1.select)(
      'message',
      ['default', 'warning', 'error'],
      'default',
    ),
    messageText: (0, addon_knobs_1.text)('messageText', ''),
    fillWidth: (0, addon_knobs_1.boolean)('fillWidth', false),
    padMessageText: (0, addon_knobs_1.boolean)('padMessageText', false),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    onChange: (0, action_1.action)('onChange'),
  });
};
exports.Controlled = Controlled;
var SearchExample = function() {
  return react_1.default.createElement(Input_1.Input, {
    type: 'search',
    leftElement: react_1.default.createElement(icons_1.Search, null),
  });
};
exports.SearchExample = SearchExample;
var PasswordExample = function() {
  var _a = (0, react_1.useState)(false),
    showPassword = _a[0],
    setShowPassword = _a[1];
  return react_1.default.createElement(Input_1.Input, {
    type: showPassword ? 'text' : 'password',
    message: (0, addon_knobs_1.select)(
      'message',
      ['default', 'warning', 'error'],
      'default',
    ),
    messageText: (0, addon_knobs_1.text)('messageText', ''),
    rightElement: react_1.default.createElement(
      IconButton_1.IconButton,
      {
        'aria-label': showPassword ? 'Hide password' : 'Show password',
        onClick: function() {
          return setShowPassword(function(s) {
            return !s;
          });
        },
      },
      react_1.default.createElement(Icon_1.Icon, {
        icon: showPassword ? 'Hide' : 'Show',
      }),
    ),
  });
};
exports.PasswordExample = PasswordExample;
//# sourceMappingURL=Input.stories.js.map
