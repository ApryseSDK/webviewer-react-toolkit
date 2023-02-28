'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var FilePlaceholder_1 = require('../FilePlaceholder');
describe('FilePlaceholder component', function() {
  it('renders its contents', function() {
    var filePlaceholder = (0, enzyme_1.shallow)(
      react_1.default.createElement(FilePlaceholder_1.FilePlaceholder, null),
    );
    expect(filePlaceholder.find('.ui__filePlaceholder')).toHaveLength(1);
  });
  it('snapshot renders default filePlaceholder', function() {
    var filePlaceholder = (0, enzyme_1.shallow)(
      react_1.default.createElement(FilePlaceholder_1.FilePlaceholder, null),
    );
    expect(filePlaceholder).toMatchSnapshot();
  });
});
//# sourceMappingURL=FilePlaceholder.test.js.map
