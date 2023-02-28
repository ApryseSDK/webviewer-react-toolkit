'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var FileSkeleton_1 = require('../FileSkeleton');
describe('FileSkeleton component', function() {
  it('renders its contents', function() {
    var fileSkeleton = (0, enzyme_1.shallow)(
      react_1.default.createElement(FileSkeleton_1.FileSkeleton, null),
    );
    expect(fileSkeleton.find('.ui__fileSkeleton')).toHaveLength(1);
  });
  it('snapshot renders default fileSkeleton', function() {
    var fileSkeleton = (0, enzyme_1.shallow)(
      react_1.default.createElement(FileSkeleton_1.FileSkeleton, null),
    );
    expect(fileSkeleton).toMatchSnapshot();
  });
});
//# sourceMappingURL=FileSkeleton.test.js.map
