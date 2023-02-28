'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ToastProvider = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var hooks_1 = require('../../hooks');
var Overlay_1 = require('../Overlay');
var Toast_1 = require('../Toast');
var toastIdSequence = 1;
var ToastProvider = function(_a) {
  var defaultTimeout = _a.defaultTimeout,
    noTimeout = _a.noTimeout,
    _b = _a.position,
    position = _b === void 0 ? 'top-right' : _b,
    customPadding = _a.customPadding,
    className = _a.className,
    children = _a.children;
  var _c = (0, react_1.useState)([]),
    toasts = _c[0],
    setToasts = _c[1];
  var _d = (0, react_1.useState)(false),
    closing = _d[0],
    setClosing = _d[1];
  var _e = (0, react_1.useState)(false),
    hovered = _e[0],
    setHovered = _e[1];
  var onHover = (0, react_1.useCallback)(function() {
    return setHovered(true);
  }, []);
  var onBlur = (0, react_1.useCallback)(function() {
    return setHovered(false);
  }, []);
  var _pop = (0, react_1.useCallback)(function() {
    return setClosing(true);
  }, []);
  var toastsRef = (0, hooks_1.useCurrentRef)(toasts);
  var closingRef = (0, hooks_1.useCurrentRef)(closing);
  (0, react_1.useEffect)(
    function() {
      if (closing) {
        var timeoutId_1 = window.setTimeout(function() {
          setToasts(function(prev) {
            return prev.slice(1);
          });
          setClosing(false);
        }, 250);
        return function() {
          window.clearTimeout(timeoutId_1);
        };
      }
      return;
    },
    [closing],
  );
  var _f = toasts[0] || {},
    toastId = _f.toastId,
    _g = _f.closable,
    closable = _g === void 0 ? true : _g,
    timeout = _f.timeout,
    toastProps = tslib_1.__rest(_f, ['toastId', 'closable', 'timeout']);
  var noTimeoutTypes = (0, hooks_1.useCurrentRef)(noTimeout);
  var timeoutValue = (0, react_1.useMemo)(
    function() {
      var timeoutNum =
        timeout !== null && timeout !== void 0 ? timeout : defaultTimeout;
      if (!noTimeoutTypes.current) return timeoutNum;
      if (Array.isArray(noTimeoutTypes.current)) {
        if (!noTimeoutTypes.current.length) return timeoutNum;
        if (!noTimeoutTypes.current.includes(toastProps.message))
          return timeoutNum;
        return 0;
      } else {
        if (noTimeoutTypes.current !== toastProps.message) return timeoutNum;
        return 0;
      }
    },
    [defaultTimeout, noTimeoutTypes, timeout, toastProps.message],
  );
  (0, react_1.useEffect)(
    function() {
      // toastId and toastProps.message are included to reset timer when message
      // changes.
      if (!hovered && toastId && timeoutValue && toastProps.message) {
        var timeoutId_2 = window.setTimeout(_pop, timeoutValue);
        return function() {
          return window.clearTimeout(timeoutId_2);
        };
      }
      return;
    },
    [_pop, hovered, timeoutValue, toastId, toastProps.message],
  );
  var add = (0, react_1.useCallback)(function(toast) {
    var toastId = toastIdSequence++;
    setToasts(function(prev) {
      return tslib_1.__spreadArray(
        tslib_1.__spreadArray([], prev, true),
        [tslib_1.__assign(tslib_1.__assign({}, toast), { toastId: toastId })],
        false,
      );
    });
    return toastId;
  }, []);
  var remove = (0, react_1.useCallback)(
    function(toastId) {
      if (!toastsRef.current.length) return;
      var index =
        toastId === undefined
          ? 0
          : toastsRef.current.findIndex(function(toast) {
              return toast.toastId === toastId;
            });
      if (index === -1) return;
      if (index === 0) return _pop();
      setToasts(function(prev) {
        return tslib_1.__spreadArray(
          tslib_1.__spreadArray([], prev.slice(0, index), true),
          prev.slice(index + 1),
          true,
        );
      });
    },
    [_pop, toastsRef],
  );
  var modify = (0, react_1.useCallback)(function(id, update) {
    setToasts(function(prev) {
      var index = prev.findIndex(function(t) {
        return t.toastId === id;
      });
      if (index === -1) return prev;
      return tslib_1.__spreadArray(
        tslib_1.__spreadArray(
          tslib_1.__spreadArray([], prev.slice(0, index), true),
          [tslib_1.__assign(tslib_1.__assign({}, prev[index]), update)],
          false,
        ),
        prev.slice(index + 1),
        true,
      );
    });
  }, []);
  var exists = (0, react_1.useCallback)(
    function(id) {
      var index = toastsRef.current.findIndex(function(t) {
        return t.toastId === id;
      });
      if (index === -1) return false;
      if (closingRef.current && index === 0) return false;
      return true;
    },
    [closingRef, toastsRef],
  );
  var value = (0, react_1.useMemo)(
    function() {
      return { add: add, remove: remove, modify: modify, exists: exists };
    },
    [add, remove, modify, exists],
  );
  var padding = (0, react_1.useMemo)(
    function() {
      if (customPadding === undefined) return undefined;
      var isTop = ['top-left', 'top', 'top-right'].includes(position);
      return customPadding !== undefined
        ? {
            paddingTop: isTop ? customPadding : undefined,
            paddingBottom: isTop ? undefined : customPadding,
          }
        : undefined;
    },
    [customPadding, position],
  );
  var toastProviderClass = (0, classnames_1.default)('ui__toastProvider', {
    'ui__toastProvider--closing': closing,
  });
  var toastClass = (0, classnames_1.default)(
    'ui__toastProvider__toast',
    'ui__toastProvider__toast--position-'.concat(position),
    className,
  );
  return react_1.default.createElement(
    hooks_1.ToastContext.Provider,
    { value: value },
    toastId &&
      react_1.default.createElement(
        Overlay_1.Overlay,
        null,
        react_1.default.createElement(
          'div',
          { className: toastClass, key: toastId, style: padding },
          react_1.default.createElement(
            Toast_1.Toast,
            tslib_1.__assign({}, toastProps, {
              role: toastProps.message === 'error' ? 'alert' : 'status',
              'aria-live':
                toastProps.message === 'error' ? 'assertive' : 'polite',
              onMouseEnter: onHover,
              onMouseLeave: onBlur,
              className: toastProviderClass,
              onClose: closable ? _pop : undefined,
            }),
          ),
        ),
      ),
    children,
  );
};
exports.ToastProvider = ToastProvider;
//# sourceMappingURL=ToastProvider.js.map
