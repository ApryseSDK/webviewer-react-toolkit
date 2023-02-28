'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var sinon_1 = require('sinon');
var Button_1 = require('../Button');
describe('Button component', function() {
  it('renders its contents', function() {
    var button = (0, enzyme_1.shallow)(
      react_1.default.createElement(Button_1.Button, null),
    );
    expect(button.find('.ui__button')).toHaveLength(1);
  });
  it('snapshot renders default button', function() {
    var button = (0, enzyme_1.shallow)(
      react_1.default.createElement(Button_1.Button, null),
    );
    expect(button).toMatchSnapshot();
  });
  it('clicking button triggers onClick prop', function() {
    var onClick = (0, sinon_1.spy)();
    (0, enzyme_1.shallow)(
      react_1.default.createElement(Button_1.Button, { onClick: onClick }),
    ).simulate('click');
    expect(onClick.callCount).toBe(1);
  });
  it('clicking disabled button does not trigger onClick prop', function() {
    var onClick = (0, sinon_1.spy)();
    (0, enzyme_1.mount)(
      react_1.default.createElement(Button_1.Button, {
        onClick: onClick,
        disabled: true,
      }),
    ).simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
//# sourceMappingURL=Button.test.js.map
