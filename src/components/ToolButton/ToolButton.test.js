'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var sinon_1 = require('sinon');
var ToolButton_1 = require('../ToolButton');
describe('ToolButton component', function() {
  it('renders its contents', function() {
    var toolButton = (0, enzyme_1.shallow)(
      react_1.default.createElement(ToolButton_1.ToolButton, null),
    );
    expect(toolButton.find('.ui__toolButton')).toHaveLength(1);
  });
  it('snapshot renders default toolButton', function() {
    var toolButton = (0, enzyme_1.shallow)(
      react_1.default.createElement(ToolButton_1.ToolButton, null),
    );
    expect(toolButton).toMatchSnapshot();
  });
  it('clicking toolButton triggers onClick prop', function() {
    var onClick = (0, sinon_1.spy)();
    (0, enzyme_1.mount)(
      react_1.default.createElement(ToolButton_1.ToolButton, {
        onClick: onClick,
      }),
    )
      .find('button.ui__toolButton__action')
      .simulate('click');
    expect(onClick.callCount).toBe(1);
  });
  it('clicking disabled toolButton does not trigger onClick prop', function() {
    var onClick = (0, sinon_1.spy)();
    (0, enzyme_1.mount)(
      react_1.default.createElement(ToolButton_1.ToolButton, {
        onClick: onClick,
        disabled: true,
      }),
    )
      .find('button.ui__toolButton__action')
      .simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
//# sourceMappingURL=ToolButton.test.js.map
