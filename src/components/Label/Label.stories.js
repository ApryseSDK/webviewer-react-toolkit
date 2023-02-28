'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Detached = exports.WithDisabledFormElement = exports.WithCustomId = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var Input_1 = require('../Input');
var Label_1 = require('../Label');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/Label',
  component: Label_1.Label,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(
    Label_1.Label,
    {
      label: (0, addon_knobs_1.text)('label', 'Labeled input field'),
      optionalText: (0, addon_knobs_1.boolean)('has optionalText?', false)
        ? '- optional'
        : undefined,
    },
    react_1.default.createElement(Input_1.Input, null),
  );
};
exports.Basic = Basic;
var WithCustomId = function() {
  return react_1.default.createElement(
    Label_1.Label,
    {
      label: (0, addon_knobs_1.text)('label', 'Labeled input field'),
      optionalText: (0, addon_knobs_1.boolean)('has optionalText?', false)
        ? '- optional'
        : undefined,
    },
    react_1.default.createElement(Input_1.Input, { id: 'custom_input_id' }),
  );
};
exports.WithCustomId = WithCustomId;
var WithDisabledFormElement = function() {
  return react_1.default.createElement(
    Label_1.Label,
    {
      label: (0, addon_knobs_1.text)('label', 'Labeled input field'),
      optionalText: (0, addon_knobs_1.boolean)('has optionalText?', false)
        ? '- optional'
        : undefined,
    },
    react_1.default.createElement(Input_1.Input, {
      id: 'custom_input_id',
      disabled: (0, addon_knobs_1.boolean)('disabled', false),
    }),
  );
};
exports.WithDisabledFormElement = WithDisabledFormElement;
var Detached = function() {
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(Label_1.Label, {
      htmlFor: 'custom_input_id',
      label: (0, addon_knobs_1.text)('label', 'Labeled input field'),
      optionalText: (0, addon_knobs_1.boolean)('has optionalText?', false)
        ? '- optional'
        : undefined,
    }),
    react_1.default.createElement('p', null, 'Some other stuff'),
    react_1.default.createElement(Input_1.Input, {
      id: 'custom_input_id',
      disabled: (0, addon_knobs_1.boolean)('disabled', false),
    }),
  );
};
exports.Detached = Detached;
//# sourceMappingURL=Label.stories.js.map
