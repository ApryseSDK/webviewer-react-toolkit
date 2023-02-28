'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var FilePicker_1 = require('../FilePicker');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/FilePicker',
  component: FilePicker_1.FilePicker,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  var onRename = (0, addon_knobs_1.boolean)('has onRename', false);
  var onDelete = (0, addon_knobs_1.boolean)('has onDelete', false);
  var long = (0, addon_knobs_1.boolean)('has long name', false);
  return react_1.default.createElement(
    'div',
    { style: { width: 200 } },
    react_1.default.createElement(FilePicker_1.FilePicker, {
      items: [
        {
          key: 0,
          name: 'file_1'.concat(
            long ? '_with_long_name_to_show_cut_off' : '',
            '.pdf',
          ),
          onRename: onRename
            ? (0, action_1.action)('onRename file 1')
            : undefined,
          onDelete: onDelete
            ? (0, action_1.action)('onDelete file 1')
            : undefined,
        },
        {
          key: 1,
          name: 'file_2'.concat(
            long ? '_with_long_name_to_show_cut_off' : '',
            '.pdf',
          ),
          onRename: onRename
            ? (0, action_1.action)('onRename file 2')
            : undefined,
          onDelete: onDelete
            ? (0, action_1.action)('onDelete file 2')
            : undefined,
        },
      ],
    }),
  );
};
exports.Basic = Basic;
//# sourceMappingURL=FilePicker.stories.js.map
