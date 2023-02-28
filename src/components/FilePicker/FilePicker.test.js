'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var FilePicker_1 = require('../FilePicker');
describe('FilePicker component', function() {
  it('renders its contents', function() {
    var filePicker = (0, enzyme_1.shallow)(
      react_1.default.createElement(FilePicker_1.FilePicker, { items: [] }),
    );
    expect(filePicker.find('.ui__filePicker')).toHaveLength(1);
  });
  it('snapshot renders default filePicker', function() {
    var filePicker = (0, enzyme_1.shallow)(
      react_1.default.createElement(FilePicker_1.FilePicker, { items: [] }),
    );
    expect(filePicker).toMatchSnapshot();
  });
});
//# sourceMappingURL=FilePicker.test.js.map
