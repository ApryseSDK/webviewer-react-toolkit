'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
var FilePlaceholder_1 = require('../FilePlaceholder');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
var addon_knobs_1 = require('@storybook/addon-knobs');
exports.default = {
  title: 'Components/FilePlaceholder',
  component: FilePlaceholder_1.FilePlaceholder,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(FilePlaceholder_1.FilePlaceholder, {
    extension: (0, addon_knobs_1.text)('extension', 'pdf'),
  });
};
exports.Basic = Basic;
//# sourceMappingURL=FilePlaceholder.stories.js.map
