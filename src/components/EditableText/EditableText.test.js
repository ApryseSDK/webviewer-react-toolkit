'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var EditableText_1 = require('../EditableText');
describe('EditableText component', function() {
  it('renders its contents', function() {
    var editableText = (0, enzyme_1.shallow)(
      react_1.default.createElement(EditableText_1.EditableText, null),
    );
    expect(editableText.find('.ui__editableText')).toHaveLength(1);
  });
  it('snapshot renders default editableText', function() {
    var editableText = (0, enzyme_1.shallow)(
      react_1.default.createElement(EditableText_1.EditableText, null),
    );
    expect(editableText).toMatchSnapshot();
  });
});
//# sourceMappingURL=EditableText.test.js.map
