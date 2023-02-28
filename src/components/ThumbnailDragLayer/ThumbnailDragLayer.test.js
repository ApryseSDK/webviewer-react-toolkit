'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var ThumbnailDragLayer_1 = require('../ThumbnailDragLayer');
describe('ThumbnailDragLayer component', function() {
  it('renders its contents', function() {
    var thumbnailDragLayer = (0, enzyme_1.shallow)(
      react_1.default.createElement(
        ThumbnailDragLayer_1.ThumbnailDragLayer,
        null,
      ),
    );
    expect(thumbnailDragLayer.find('.ui__thumbnailDragLayer')).toHaveLength(1);
  });
  it('snapshot renders default thumbnailDragLayer', function() {
    var thumbnailDragLayer = (0, enzyme_1.shallow)(
      react_1.default.createElement(
        ThumbnailDragLayer_1.ThumbnailDragLayer,
        null,
      ),
    );
    expect(thumbnailDragLayer).toMatchSnapshot();
  });
});
//# sourceMappingURL=ThumbnailDragLayer.test.js.map
