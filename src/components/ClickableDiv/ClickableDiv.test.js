'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var sinon_1 = require('sinon');
var ClickableDiv_1 = require('../ClickableDiv');
describe('ClickableDiv component', function() {
  it('renders its contents', function() {
    var clickableDiv = (0, enzyme_1.shallow)(
      react_1.default.createElement(ClickableDiv_1.ClickableDiv, null),
    );
    expect(clickableDiv.find('.ui__clickableDiv')).toHaveLength(1);
  });
  it('snapshot renders default clickableDiv', function() {
    var clickableDiv = (0, enzyme_1.shallow)(
      react_1.default.createElement(ClickableDiv_1.ClickableDiv, null),
    );
    expect(clickableDiv).toMatchSnapshot();
  });
  it('clicking clickableDiv triggers onClick prop', function() {
    var onClick = (0, sinon_1.spy)();
    (0, enzyme_1.mount)(
      react_1.default.createElement(ClickableDiv_1.ClickableDiv, {
        onClick: onClick,
      }),
    ).simulate('click');
    expect(onClick.callCount).toBe(1);
  });
  it('clicking disabled clickableDiv does not trigger onClick prop', function() {
    var onClick = (0, sinon_1.spy)();
    (0, enzyme_1.mount)(
      react_1.default.createElement(ClickableDiv_1.ClickableDiv, {
        onClick: onClick,
        disabled: true,
      }),
    ).simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
//# sourceMappingURL=ClickableDiv.test.js.map
