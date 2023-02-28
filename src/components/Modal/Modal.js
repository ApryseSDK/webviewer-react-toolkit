'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Modal = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var hooks_1 = require('../../hooks');
var utils_1 = require('../../utils');
var ButtonGroup_1 = require('../ButtonGroup');
var FocusTrap_1 = require('../FocusTrap');
var Icon_1 = require('../Icon');
var IconButton_1 = require('../IconButton');
var Overlay_1 = require('../Overlay');
/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */
var Modal = function(_a) {
  var closeOnBackgroundClick = _a.closeOnBackgroundClick,
    closeOnEscape = _a.closeOnEscape,
    heading = _a.heading,
    open = _a.open,
    onClose = _a.onClose,
    fullWidth = _a.fullWidth,
    noUnmount = _a.noUnmount,
    wrapperClassName = _a.wrapperClassName,
    _b = _a.closeLabel,
    closeLabel = _b === void 0 ? 'Close' : _b,
    children = _a.children,
    buttonGroup = _a.buttonGroup,
    className = _a.className,
    _c = _a.role,
    role = _c === void 0 ? 'dialog' : _c,
    _d = _a['aria-modal'],
    ariaModal = _d === void 0 ? true : _d,
    props = tslib_1.__rest(_a, [
      'closeOnBackgroundClick',
      'closeOnEscape',
      'heading',
      'open',
      'onClose',
      'fullWidth',
      'noUnmount',
      'wrapperClassName',
      'closeLabel',
      'children',
      'buttonGroup',
      'className',
      'role',
      'aria-modal',
    ]);
  var mounted = (0, hooks_1.useUnmountDelay)(open).mounted;
  var headingId = (0, react_1.useMemo)(function() {
    return (0, utils_1.getStringId)('modal_heading');
  }, []);
  var bodyId = (0, react_1.useMemo)(function() {
    return (0, utils_1.getStringId)('modal_body');
  }, []);
  (0, react_1.useEffect)(
    function() {
      if (open && closeOnEscape && onClose) {
        var listener_1 = function(event) {
          if (event.key === 'Escape') onClose(event);
        };
        window.addEventListener('keydown', listener_1);
        return function() {
          return window.removeEventListener('keydown', listener_1);
        };
      }
      return;
    },
    [closeOnEscape, onClose, open],
  );
  var backgroundIsButton = !!(open && closeOnBackgroundClick && onClose);
  var handleBackgroundClick = (0, react_1.useCallback)(
    function(event) {
      if (!backgroundIsButton) return;
      if (event.currentTarget !== event.target) return;
      onClose === null || onClose === void 0 ? void 0 : onClose(event);
    },
    [backgroundIsButton, onClose],
  );
  var modalWrapperClass = (0, classnames_1.default)(
    'ui__base ui__modal__wrapper',
    {
      'ui__modal__wrapper--closed': !open,
      'ui__modal__wrapper--fullWidth': fullWidth,
    },
    wrapperClassName,
  );
  var modalClass = (0, classnames_1.default)(
    'ui__modal',
    { 'ui__modal--hidden': noUnmount && !mounted },
    className,
  );
  var bodyClass = (0, classnames_1.default)('ui__modal__body', {
    'ui__modal__body--noButton': !buttonGroup,
  });
  return react_1.default.createElement(
    Overlay_1.Overlay,
    null,
    react_1.default.createElement(
      'div',
      {
        role: backgroundIsButton ? 'button' : undefined,
        className: modalWrapperClass,
        onClick: handleBackgroundClick,
      },
      noUnmount || mounted
        ? react_1.default.createElement(
            'div',
            { className: 'ui__modal__paddingFix' },
            react_1.default.createElement(
              FocusTrap_1.FocusTrap,
              { focusLastOnUnlock: true, locked: open },
              react_1.default.createElement(
                'div',
                tslib_1.__assign(
                  {
                    'aria-labelledby': heading ? headingId : undefined,
                    'aria-describedby': bodyId,
                  },
                  props,
                  {
                    className: modalClass,
                    role: role,
                    'aria-modal': ariaModal,
                  },
                ),
                react_1.default.createElement(
                  'div',
                  { className: 'ui__modal__top' },
                  react_1.default.createElement(
                    'div',
                    { className: 'ui__modal__top__heading', id: headingId },
                    heading,
                  ),
                  onClose
                    ? react_1.default.createElement(
                        IconButton_1.IconButton,
                        {
                          className: 'ui__modal__top__close',
                          onClick: onClose,
                          'aria-label': closeLabel,
                        },
                        react_1.default.createElement(Icon_1.Icon, {
                          icon: 'Close',
                        }),
                      )
                    : undefined,
                ),
                react_1.default.createElement(
                  'div',
                  { className: bodyClass, id: bodyId },
                  children,
                ),
                buttonGroup
                  ? react_1.default.createElement(
                      ButtonGroup_1.ButtonGroup,
                      { className: 'ui__modal__buttonGroup' },
                      buttonGroup,
                    )
                  : undefined,
              ),
            ),
          )
        : undefined,
    ),
  );
};
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map
