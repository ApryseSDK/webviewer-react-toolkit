'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FullyControlled = exports.ControlledEditMode = exports.ControlledValue = exports.WithOnRenderText = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var EditableText_1 = require('../EditableText');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/EditableText',
  component: EditableText_1.EditableText,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(EditableText_1.EditableText, {
    centerText: (0, addon_knobs_1.boolean)('centerText', false),
    bordered: (0, addon_knobs_1.boolean)('bordered', true),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    locked: (0, addon_knobs_1.boolean)('locked', false),
    placeholder: (0, addon_knobs_1.text)('placeholder', ''),
    onSave: (0, action_1.action)('onSave'),
    onCancel: (0, action_1.action)('onCancel'),
    onEdit: (0, action_1.action)('onEdit'),
  });
};
exports.Basic = Basic;
var WithOnRenderText = function() {
  return react_1.default.createElement(EditableText_1.EditableText, {
    onRenderText: function(value) {
      return value ? '[[ '.concat(value.toUpperCase(), ' ]]') : '';
    },
    centerText: (0, addon_knobs_1.boolean)('centerText', false),
    bordered: (0, addon_knobs_1.boolean)('bordered', true),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    locked: (0, addon_knobs_1.boolean)('locked', false),
    placeholder: (0, addon_knobs_1.text)('placeholder', ''),
    onSave: (0, action_1.action)('onSave'),
    onCancel: (0, action_1.action)('onCancel'),
    onEdit: (0, action_1.action)('onEdit'),
  });
};
exports.WithOnRenderText = WithOnRenderText;
var ControlledValue = function() {
  return react_1.default.createElement(EditableText_1.EditableText, {
    value: (0, addon_knobs_1.text)('value', ''),
    centerText: (0, addon_knobs_1.boolean)('centerText', false),
    bordered: (0, addon_knobs_1.boolean)('bordered', true),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    locked: (0, addon_knobs_1.boolean)('locked', false),
    placeholder: (0, addon_knobs_1.text)('placeholder', ''),
    onSave: (0, action_1.action)('onSave'),
    onCancel: (0, action_1.action)('onCancel'),
    onEdit: (0, action_1.action)('onEdit'),
  });
};
exports.ControlledValue = ControlledValue;
var ControlledEditMode = function() {
  return react_1.default.createElement(EditableText_1.EditableText, {
    editMode: (0, addon_knobs_1.boolean)('editMode', false),
    centerText: (0, addon_knobs_1.boolean)('centerText', false),
    bordered: (0, addon_knobs_1.boolean)('bordered', true),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    locked: (0, addon_knobs_1.boolean)('locked', false),
    placeholder: (0, addon_knobs_1.text)('placeholder', ''),
    onSave: (0, action_1.action)('onSave'),
    onCancel: (0, action_1.action)('onCancel'),
    onEdit: (0, action_1.action)('onEdit'),
  });
};
exports.ControlledEditMode = ControlledEditMode;
var FullyControlled = function() {
  return react_1.default.createElement(EditableText_1.EditableText, {
    value: (0, addon_knobs_1.text)('value', ''),
    editMode: (0, addon_knobs_1.boolean)('editMode', false),
    centerText: (0, addon_knobs_1.boolean)('centerText', false),
    bordered: (0, addon_knobs_1.boolean)('bordered', true),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    locked: (0, addon_knobs_1.boolean)('locked', false),
    placeholder: (0, addon_knobs_1.text)('placeholder', ''),
    onSave: (0, action_1.action)('onSave'),
    onCancel: (0, action_1.action)('onCancel'),
    onEdit: (0, action_1.action)('onEdit'),
  });
};
exports.FullyControlled = FullyControlled;
//# sourceMappingURL=EditableText.stories.js.map
