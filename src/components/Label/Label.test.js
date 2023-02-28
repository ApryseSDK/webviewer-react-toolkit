'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var Label_1 = require('../Label');
describe('Label component', function() {
  it('renders its contents', function() {
    var label = (0, enzyme_1.shallow)(
      react_1.default.createElement(Label_1.Label, { label: '' }),
    );
    expect(label.find('.ui__label')).toHaveLength(1);
  });
  it('snapshot renders default label', function() {
    var label = (0, enzyme_1.shallow)(
      react_1.default.createElement(Label_1.Label, { label: '' }),
    );
    expect(label).toMatchSnapshot();
  });
});
//# sourceMappingURL=Label.test.js.map
