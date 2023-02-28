'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var Image_1 = require('../Image');
describe('Image component', function() {
  it('snapshot renders default image', function() {
    var image = (0, enzyme_1.shallow)(
      react_1.default.createElement(Image_1.Image, null),
    );
    expect(image).toMatchSnapshot();
  });
});
//# sourceMappingURL=Image.test.js.map
