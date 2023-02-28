'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var Input_1 = require('../Input');
describe('Input component', function() {
  it('renders its contents', function() {
    var input = (0, enzyme_1.shallow)(
      react_1.default.createElement(Input_1.Input, null),
    );
    expect(input.find('.ui__input')).toHaveLength(1);
  });
  it('snapshot renders default input', function() {
    var input = (0, enzyme_1.shallow)(
      react_1.default.createElement(Input_1.Input, null),
    );
    expect(input).toMatchSnapshot();
  });
});
//# sourceMappingURL=Input.test.js.map
