'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var sinon_1 = require('sinon');
var IconButton_1 = require('../IconButton');
describe('IconButton component', function() {
  it('renders its contents', function() {
    var iconButton = (0, enzyme_1.shallow)(
      react_1.default.createElement(IconButton_1.IconButton, null),
    );
    expect(iconButton.find('.ui__iconButton')).toHaveLength(1);
  });
  it('snapshot renders default iconButton', function() {
    var iconButton = (0, enzyme_1.shallow)(
      react_1.default.createElement(IconButton_1.IconButton, null),
    );
    expect(iconButton).toMatchSnapshot();
  });
  it('clicking iconButton triggers onClick prop', function() {
    var onClick = (0, sinon_1.spy)();
    (0, enzyme_1.shallow)(
      react_1.default.createElement(IconButton_1.IconButton, {
        onClick: onClick,
      }),
    ).simulate('click');
    expect(onClick.callCount).toBe(1);
  });
  it('clicking disabled iconButton does not trigger onClick prop', function() {
    var onClick = (0, sinon_1.spy)();
    // full DOM mount so `iconButton` element will use disabled prop
    (0, enzyme_1.mount)(
      react_1.default.createElement(IconButton_1.IconButton, {
        onClick: onClick,
        disabled: true,
      }),
    ).simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
//# sourceMappingURL=IconButton.test.js.map
