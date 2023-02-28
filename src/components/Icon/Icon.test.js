'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var Icon_1 = require('../Icon');
describe('Icon component', function() {
  it('renders its contents', function() {
    var icon = (0, enzyme_1.shallow)(
      react_1.default.createElement(Icon_1.Icon, { icon: 'Close' }),
    );
    expect(icon.find('.ui__icon')).toHaveLength(1);
  });
  it('snapshot renders default icon', function() {
    var icon = (0, enzyme_1.shallow)(
      react_1.default.createElement(Icon_1.Icon, { icon: 'Close' }),
    );
    expect(icon).toMatchSnapshot();
  });
});
//# sourceMappingURL=Icon.test.js.map
