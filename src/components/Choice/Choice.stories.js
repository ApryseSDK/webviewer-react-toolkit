'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CustomControlled = exports.NativeFormControlled = exports.Controlled = exports.TallContent = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importStar(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var Choice_1 = require('../Choice');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/Choice',
  component: Choice_1.Choice,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(Choice_1.Choice, {
    onChange: (0, action_1.action)('onChange'),
    label: (0, addon_knobs_1.text)('label', 'Choice'),
    radio: (0, addon_knobs_1.boolean)('radio', false),
    isSwitch: (0, addon_knobs_1.boolean)('isSwitch', false),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    leftLabel: (0, addon_knobs_1.boolean)('leftLabel', false),
    center: (0, addon_knobs_1.boolean)('center', false),
    disabledLabelChange: (0, addon_knobs_1.boolean)(
      'disabledLabelChange',
      false,
    ),
  });
};
exports.Basic = Basic;
var TallContent = function() {
  return react_1.default.createElement(Choice_1.Choice, {
    onChange: (0, action_1.action)('onChange'),
    label: react_1.default.createElement(
      'div',
      null,
      react_1.default.createElement('div', null, 'Some'),
      react_1.default.createElement('div', null, 'Tall'),
      react_1.default.createElement('div', null, 'Content'),
    ),
    radio: (0, addon_knobs_1.boolean)('radio', false),
    isSwitch: (0, addon_knobs_1.boolean)('isSwitch', false),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    leftLabel: (0, addon_knobs_1.boolean)('leftLabel', false),
    center: (0, addon_knobs_1.boolean)('center', false),
    disabledLabelChange: (0, addon_knobs_1.boolean)(
      'disabledLabelChange',
      false,
    ),
  });
};
exports.TallContent = TallContent;
var Controlled = function() {
  return react_1.default.createElement(Choice_1.Choice, {
    onChange: (0, action_1.action)('onChange'),
    label: (0, addon_knobs_1.text)('label', 'Choice'),
    radio: (0, addon_knobs_1.boolean)('radio', false),
    isSwitch: (0, addon_knobs_1.boolean)('isSwitch', false),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    checked: (0, addon_knobs_1.boolean)('checked', false),
    leftLabel: (0, addon_knobs_1.boolean)('leftLabel', false),
    center: (0, addon_knobs_1.boolean)('center', false),
    disabledLabelChange: (0, addon_knobs_1.boolean)(
      'disabledLabelChange',
      false,
    ),
  });
};
exports.Controlled = Controlled;
var NativeFormControlled = function() {
  var props = {
    radio: (0, addon_knobs_1.boolean)('radio', true),
    isSwitch: (0, addon_knobs_1.boolean)('isSwitch', false),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    leftLabel: (0, addon_knobs_1.boolean)('leftLabel', false),
    center: (0, addon_knobs_1.boolean)('center', false),
    disabledLabelChange: (0, addon_knobs_1.boolean)(
      'disabledLabelChange',
      false,
    ),
  };
  return react_1.default.createElement(
    'form',
    { className: 'ui__base' },
    react_1.default.createElement(
      'p',
      null,
      'One from each group can be selected (native form behavior)',
    ),
    react_1.default.createElement('h3', null, 'Pet'),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, { label: 'Dog', value: 'dog', name: 'pet' }),
    ),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, { label: 'Cat', value: 'cat', name: 'pet' }),
    ),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, { label: 'Rat', value: 'rat', name: 'pet' }),
    ),
    react_1.default.createElement('h3', null, 'Color'),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, {
        label: 'Red',
        value: 'red',
        name: 'color',
      }),
    ),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, {
        label: 'Blue',
        value: 'blue',
        name: 'color',
      }),
    ),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, {
        label: 'Green',
        value: 'green',
        name: 'color',
      }),
    ),
  );
};
exports.NativeFormControlled = NativeFormControlled;
var CustomControlled = function() {
  var _a = (0, react_1.useState)(0),
    selected = _a[0],
    setSelected = _a[1];
  var props = {
    radio: (0, addon_knobs_1.boolean)('radio', true),
    isSwitch: (0, addon_knobs_1.boolean)('isSwitch', false),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    leftLabel: (0, addon_knobs_1.boolean)('leftLabel', false),
    center: (0, addon_knobs_1.boolean)('center', false),
    disabledLabelChange: (0, addon_knobs_1.boolean)(
      'disabledLabelChange',
      false,
    ),
  };
  return react_1.default.createElement(
    'div',
    { className: 'ui__base' },
    react_1.default.createElement(
      'p',
      null,
      'React state allows for only one to be selected (custom)',
    ),
    react_1.default.createElement('h3', null, 'Pet'),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, {
        label: 'Dog',
        onChange: function() {
          return setSelected(0);
        },
        checked: selected === 0,
      }),
    ),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, {
        label: 'Cat',
        onChange: function() {
          return setSelected(1);
        },
        checked: selected === 1,
      }),
    ),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, {
        label: 'Rat',
        onChange: function() {
          return setSelected(2);
        },
        checked: selected === 2,
      }),
    ),
    react_1.default.createElement('h3', null, 'Color'),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, {
        label: 'Red',
        onChange: function() {
          return setSelected(3);
        },
        checked: selected === 3,
      }),
    ),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, {
        label: 'Blue',
        onChange: function() {
          return setSelected(4);
        },
        checked: selected === 4,
      }),
    ),
    react_1.default.createElement(
      Choice_1.Choice,
      tslib_1.__assign({}, props, {
        label: 'Green',
        onChange: function() {
          return setSelected(5);
        },
        checked: selected === 5,
      }),
    ),
  );
};
exports.CustomControlled = CustomControlled;
//# sourceMappingURL=Choice.stories.js.map
