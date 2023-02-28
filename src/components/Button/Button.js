'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Button = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var hooks_1 = require('../../hooks');
exports.Button = (0, react_1.forwardRef)(function(_a, ref) {
  var _b = _a.buttonStyle,
    buttonStyle = _b === void 0 ? 'default' : _b,
    _c = _a.buttonSize,
    buttonSize = _c === void 0 ? 'default' : _c,
    _d = _a.type,
    type = _d === void 0 ? 'button' : _d,
    className = _a.className,
    children = _a.children,
    buttonProps = tslib_1.__rest(_a, [
      'buttonStyle',
      'buttonSize',
      'type',
      'className',
      'children',
    ]);
  var isUserTabbing = (0, hooks_1.useAccessibleFocus)();
  var buttonClass = (0, classnames_1.default)(
    'ui__base ui__button',
    'ui__button--style-'.concat(buttonStyle),
    'ui__button--size-'.concat(buttonSize),
    {
      'ui__button--disabled': buttonProps.disabled,
      'ui__button--tabbing': isUserTabbing,
    },
    className,
  );
  return react_1.default.createElement(
    'button',
    tslib_1.__assign({}, buttonProps, {
      className: buttonClass,
      type: type,
      ref: ref,
    }),
    react_1.default.createElement(
      'div',
      { className: 'ui__button__internal' },
      children,
    ),
  );
});
//# sourceMappingURL=Button.js.map
