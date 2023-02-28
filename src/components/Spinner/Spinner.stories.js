'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var Spinner_1 = require('../Spinner');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/Spinner',
  component: Spinner_1.Spinner,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(Spinner_1.Spinner, {
    spinnerSize: (0, addon_knobs_1.select)(
      'spinnerSize',
      ['tiny', 'small', 'default', 'large'],
      'default',
    ),
  });
};
exports.Basic = Basic;
//# sourceMappingURL=Spinner.stories.js.map
