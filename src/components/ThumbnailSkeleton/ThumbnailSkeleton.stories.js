'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
var ThumbnailSkeleton_1 = require('../ThumbnailSkeleton');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/ThumbnailSkeleton',
  component: ThumbnailSkeleton_1.ThumbnailSkeleton,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(
    ThumbnailSkeleton_1.ThumbnailSkeleton,
    null,
  );
};
exports.Basic = Basic;
//# sourceMappingURL=ThumbnailSkeleton.stories.js.map
