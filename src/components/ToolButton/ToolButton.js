'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ToolButton = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var hooks_1 = require('../../hooks');
var Icon_1 = require('../Icon');
var IconButton_1 = require('../IconButton');
exports.ToolButton = (0, react_1.forwardRef)(function(_a, ref) {
  var className = _a.className,
    expandProps = _a.expandProps,
    children = _a.children,
    onClick = _a.onClick,
    buttonProps = tslib_1.__rest(_a, [
      'className',
      'expandProps',
      'children',
      'onClick',
    ]);
  var handleOnClick = (0, hooks_1.useOnClick)(onClick, {
    stopPropagation: true,
  });
  var isUserTabbing = (0, hooks_1.useAccessibleFocus)();
  var positionRight =
    (expandProps === null || expandProps === void 0
      ? void 0
      : expandProps.position) === 'right';
  var expandClass =
    expandProps === null || expandProps === void 0
      ? void 0
      : expandProps.className;
  var hasExpandProps = !!expandProps;
  var classes = (0, react_1.useMemo)(
    function() {
      var enabledObj = {
        'ui__toolButton--disabled': buttonProps.disabled,
        'ui__toolButton--tabbing': isUserTabbing,
        'ui__toolButton--expanded': hasExpandProps,
        'ui__toolButton--right': positionRight,
        'ui__toolButton--bottom': !positionRight,
      };
      var wrapper = (0, classnames_1.default)(
        'ui__base ui__toolButton',
        enabledObj,
      );
      var action = (0, classnames_1.default)(
        'ui__toolButton__action',
        enabledObj,
        className,
      );
      var expand = (0, classnames_1.default)(
        'ui__toolButton__expand',
        enabledObj,
        expandClass,
      );
      return { wrapper: wrapper, action: action, expand: expand };
    },
    [
      buttonProps.disabled,
      className,
      expandClass,
      hasExpandProps,
      isUserTabbing,
      positionRight,
    ],
  );
  return react_1.default.createElement(
    'div',
    { className: classes.wrapper },
    react_1.default.createElement(
      IconButton_1.IconButton,
      tslib_1.__assign({ disabled: buttonProps.disabled }, buttonProps, {
        className: classes.action,
        onClick: handleOnClick,
        ref: ref,
      }),
      children,
    ),
    expandProps
      ? react_1.default.createElement(
          IconButton_1.IconButton,
          tslib_1.__assign({ disabled: buttonProps.disabled }, expandProps, {
            className: classes.expand,
          }),
          react_1.default.createElement(Icon_1.Icon, { icon: 'ChevronDown' }),
        )
      : undefined,
  );
});
//# sourceMappingURL=ToolButton.js.map
