'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Toast = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var utils_1 = require('../../utils');
var Button_1 = require('../Button');
var Icon_1 = require('../Icon');
var IconButton_1 = require('../IconButton');
var Spinner_1 = require('../Spinner');
var Toast = function(_a) {
  var heading = _a.heading,
    children = _a.children,
    _b = _a.message,
    message = _b === void 0 ? 'info' : _b,
    onClose = _a.onClose,
    _c = _a.closeLabel,
    closeLabel = _c === void 0 ? 'Close' : _c,
    action = _a.action,
    className = _a.className,
    _d = _a.role,
    role = _d === void 0 ? 'status' : _d,
    _e = _a['aria-live'],
    ariaLive = _e === void 0 ? 'polite' : _e,
    _f = _a['aria-atomic'],
    ariaAtomic = _f === void 0 ? true : _f,
    props = tslib_1.__rest(_a, [
      'heading',
      'children',
      'message',
      'onClose',
      'closeLabel',
      'action',
      'className',
      'role',
      'aria-live',
      'aria-atomic',
    ]);
  var headingId = (0, react_1.useMemo)(function() {
    return (0, utils_1.getStringId)('toast_heading');
  }, []);
  var bodyId = (0, react_1.useMemo)(function() {
    return (0, utils_1.getStringId)('toast_body');
  }, []);
  var icon = (0, react_1.useMemo)(
    function() {
      switch (message) {
        case 'info':
          return 'Info';
        case 'success':
          return 'Success';
        case 'warning':
          return 'Warning';
        case 'error':
          return 'Error';
        case 'loading':
          return undefined;
      }
    },
    [message],
  );
  var toastClass = (0, classnames_1.default)(
    'ui__base ui__toast',
    'ui__toast--message-'.concat(message),
    className,
  );
  return react_1.default.createElement(
    'div',
    tslib_1.__assign(
      {
        'aria-labelledby': heading ? headingId : undefined,
        'aria-describedby': children ? bodyId : undefined,
      },
      props,
      {
        className: toastClass,
        role: role,
        'aria-live': ariaLive,
        'aria-atomic': ariaAtomic,
      },
    ),
    react_1.default.createElement('div', { className: 'ui__toast__border' }),
    icon
      ? react_1.default.createElement(Icon_1.Icon, {
          icon: icon,
          className: 'ui__toast__icon',
        })
      : react_1.default.createElement(Spinner_1.Spinner, {
          className: 'ui__toast__spinner',
        }),
    react_1.default.createElement(
      'div',
      { className: 'ui__toast__copy' },
      heading
        ? react_1.default.createElement(
            'div',
            { className: 'ui__toast__copy__heading', id: headingId },
            heading,
          )
        : undefined,
      children
        ? react_1.default.createElement(
            'div',
            { className: 'ui__toast__copy__body', id: bodyId },
            children,
          )
        : undefined,
    ),
    action
      ? react_1.default.createElement(
          'div',
          { className: 'ui__toast__action' },
          react_1.default.createElement(
            Button_1.Button,
            {
              className: 'ui__toast__button',
              onClick: action.onClick,
              buttonStyle: 'borderless',
            },
            action.text,
          ),
        )
      : undefined,
    onClose
      ? react_1.default.createElement(
          'div',
          { className: 'ui__toast__action' },
          react_1.default.createElement(
            IconButton_1.IconButton,
            { onClick: onClose, 'aria-label': closeLabel },
            react_1.default.createElement(Icon_1.Icon, { icon: 'Close' }),
          ),
        )
      : undefined,
  );
};
exports.Toast = Toast;
//# sourceMappingURL=Toast.js.map
