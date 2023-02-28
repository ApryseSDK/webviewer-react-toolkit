'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClickableDiv = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var hooks_1 = require('../../hooks');
exports.ClickableDiv = (0, react_1.forwardRef)(function(_a, ref) {
  var onClick = _a.onClick,
    onKeyPress = _a.onKeyPress,
    disabled = _a.disabled,
    noFocusStyle = _a.noFocusStyle,
    usePointer = _a.usePointer,
    className = _a.className,
    children = _a.children,
    tabIndex = _a.tabIndex,
    divProps = tslib_1.__rest(_a, [
      'onClick',
      'onKeyPress',
      'disabled',
      'noFocusStyle',
      'usePointer',
      'className',
      'children',
      'tabIndex',
    ]);
  var clickableDivRef = (0, react_1.useRef)(null);
  (0, react_1.useImperativeHandle)(ref, function() {
    return clickableDivRef.current;
  });
  var handleOnClick = (0, hooks_1.useOnClick)(onClick, {
    disabled: disabled,
    stopPropagation: true,
  });
  var handleKeyPress = (0, hooks_1.useKeyForClick)(onKeyPress, clickableDivRef);
  var isUserTabbing = (0, hooks_1.useAccessibleFocus)();
  var clickableDivClass = (0, classnames_1.default)(
    'ui__base ui__clickableDiv',
    {
      'ui__clickableDiv--disabled': disabled,
      'ui__clickableDiv--tabbing': isUserTabbing,
      'ui__clickableDiv--noFocusStyle': noFocusStyle,
      'ui__clickableDiv--usePointer': usePointer && !disabled,
    },
    className,
  );
  return react_1.default.createElement(
    'div',
    tslib_1.__assign({}, divProps, {
      role: 'button',
      tabIndex: disabled
        ? -1
        : tabIndex !== null && tabIndex !== void 0
        ? tabIndex
        : 0,
      className: clickableDivClass,
      onClick: handleOnClick,
      onKeyPress: handleKeyPress,
      ref: clickableDivRef,
    }),
    children,
  );
});
//# sourceMappingURL=ClickableDiv.js.map
