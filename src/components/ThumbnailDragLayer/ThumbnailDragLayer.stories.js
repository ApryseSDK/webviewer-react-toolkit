'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
var integer_1 = require('../../storybook-helpers/knobs/integer');
var ThumbnailDragLayer_1 = require('../ThumbnailDragLayer');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/ThumbnailDragLayer',
  component: ThumbnailDragLayer_1.ThumbnailDragLayer,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  return react_1.default.createElement(
    ThumbnailDragLayer_1.ThumbnailDragLayer,
    { numFiles: (0, integer_1.integer)('numFiles', 1) },
  );
};
exports.Basic = Basic;
//# sourceMappingURL=ThumbnailDragLayer.stories.js.map
