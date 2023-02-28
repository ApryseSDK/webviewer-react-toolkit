'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
var FileSkeleton_1 = require('../FileSkeleton');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/FileSkeleton',
  component: FileSkeleton_1.FileSkeleton,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(FileSkeleton_1.FileSkeleton, null);
};
exports.Basic = Basic;
//# sourceMappingURL=FileSkeleton.stories.js.map
