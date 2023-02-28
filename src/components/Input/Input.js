'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Input = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var hooks_1 = require('../../hooks');
var Icon_1 = require('../Icon');
exports.Input = (0, react_1.forwardRef)(function(_a, ref) {
  var _b = _a.message,
    message = _b === void 0 ? 'default' : _b,
    messageText = _a.messageText,
    fillWidth = _a.fillWidth,
    wrapperClassName = _a.wrapperClassName,
    padMessageText = _a.padMessageText,
    className = _a.className,
    onFocus = _a.onFocus,
    onBlur = _a.onBlur,
    rightElement = _a.rightElement,
    leftElement = _a.leftElement,
    _c = _a.type,
    type = _c === void 0 ? 'text' : _c,
    props = tslib_1.__rest(_a, [
      'message',
      'messageText',
      'fillWidth',
      'wrapperClassName',
      'padMessageText',
      'className',
      'onFocus',
      'onBlur',
      'rightElement',
      'leftElement',
      'type',
    ]);
  var _d = (0, hooks_1.useFocus)(onFocus, onBlur),
    focused = _d.focused,
    handleOnFocus = _d.handleOnFocus,
    handleOnBlur = _d.handleOnBlur;
  var rightIcon = (0, react_1.useMemo)(
    function() {
      if (rightElement) return rightElement;
      var icon = undefined;
      switch (message) {
        case 'warning':
          icon = 'Warning';
          break;
        case 'error':
          icon = 'Error';
          break;
      }
      return icon
        ? react_1.default.createElement(Icon_1.Icon, {
            className: 'ui__input__icon',
            icon: icon,
          })
        : undefined;
    },
    [message, rightElement],
  );
  var wrapperClass = (0, classnames_1.default)(
    'ui__base ui__input__wrapper',
    {
      'ui__input__wrapper--fill': fillWidth,
      'ui__input__wrapper--pad': padMessageText && !messageText,
    },
    wrapperClassName,
  );
  var mainClass = (0, classnames_1.default)(
    'ui__input',
    'ui__input--message-'.concat(message),
    { 'ui__input--focused': focused },
  );
  var inputClass = (0, classnames_1.default)(
    'ui__input__input',
    { 'ui__input__input--disabled': props.disabled },
    className,
  );
  return react_1.default.createElement(
    'div',
    { className: wrapperClass },
    react_1.default.createElement(
      'div',
      { className: mainClass },
      leftElement,
      react_1.default.createElement(
        'input',
        tslib_1.__assign({}, props, {
          type: type,
          onFocus: handleOnFocus,
          onBlur: handleOnBlur,
          className: inputClass,
          ref: ref,
        }),
      ),
      rightIcon,
    ),
    messageText
      ? react_1.default.createElement(
          'div',
          { className: 'ui__input__messageText' },
          messageText,
        )
      : undefined,
  );
});
//# sourceMappingURL=Input.js.map
