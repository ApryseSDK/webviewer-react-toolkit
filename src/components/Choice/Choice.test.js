'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var Choice_1 = require('../Choice');
describe('Choice component', function() {
  it('renders its contents', function() {
    var choice = (0, enzyme_1.shallow)(
      react_1.default.createElement(Choice_1.Choice, { label: 'Label' }),
    );
    expect(choice.find('.ui__choice')).toHaveLength(1);
  });
  it('snapshot renders default choice', function() {
    var choice = (0, enzyme_1.shallow)(
      react_1.default.createElement(Choice_1.Choice, { label: 'Label' }),
    );
    expect(choice).toMatchSnapshot();
  });
});
//# sourceMappingURL=Choice.test.js.map
