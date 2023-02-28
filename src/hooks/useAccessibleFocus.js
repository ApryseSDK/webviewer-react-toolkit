'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useAccessibleFocus = void 0;
var react_1 = require('react');
/**
 * Will return true if the user is using keyboard navigation, or false if they
 * are using their mouse. The returned value will be true if the Tab key was
 * used more recently than mouse click, and false if not. You can also provide
 * custom behavior by passing your own observable.
 * @param observable Optional custom observable.
 */
function useAccessibleFocus(observable) {
  if (observable === void 0) {
    observable = tabObservable;
  }
  var _a = (0, react_1.useState)(observable.value),
    isUserTabbing = _a[0],
    setIsUserTabbing = _a[1];
  (0, react_1.useEffect)(
    function() {
      return observable.subscribe(function() {
        return setIsUserTabbing(observable.value);
      });
    },
    [observable],
  );
  return isUserTabbing;
}
exports.useAccessibleFocus = useAccessibleFocus;
var AccessibleFocusObservable = /** @class */ (function() {
  function AccessibleFocusObservable() {
    var _this = this;
    this._handleFirstTab = function(event) {
      if (event.key === 'Tab') {
        _this._setIsUserTabbing(true);
        _this._tabToMouseListener();
      }
    };
    this._handleFirstMouse = function() {
      _this._setIsUserTabbing(false);
      _this._mouseToTabListener();
    };
    this._subscribers = [];
    this._isUserTabbing = false;
  }
  Object.defineProperty(AccessibleFocusObservable.prototype, 'value', {
    get: function() {
      return this._isUserTabbing;
    },
    enumerable: false,
    configurable: true,
  });
  AccessibleFocusObservable.prototype.subscribe = function(subscriber) {
    // If adding first subscriber, begin listening to document.
    if (this._subscribers.length === 0) {
      if (this._isUserTabbing) {
        this._tabToMouseListener();
      } else {
        this._mouseToTabListener();
      }
    }
    var exists = this._subscribers.includes(subscriber);
    if (!exists) this._subscribers.push(subscriber);
    return this._unsubscribe(subscriber);
  };
  AccessibleFocusObservable.prototype._unsubscribe = function(subscriber) {
    var _this = this;
    return function() {
      _this._subscribers = _this._subscribers.filter(function(s) {
        return s !== subscriber;
      });
      // If no subscribers, stop listening to document.
      if (_this._subscribers.length === 0) _this._removeAllListeners();
    };
  };
  AccessibleFocusObservable.prototype._setIsUserTabbing = function(
    isUserTabbing,
  ) {
    this._isUserTabbing = isUserTabbing;
    this._subscribers.forEach(function(subscriber) {
      return subscriber();
    });
  };
  AccessibleFocusObservable.prototype._tabToMouseListener = function() {
    window.removeEventListener('keydown', this._handleFirstTab);
    window.addEventListener('mousedown', this._handleFirstMouse);
  };
  AccessibleFocusObservable.prototype._mouseToTabListener = function() {
    window.removeEventListener('mousedown', this._handleFirstMouse);
    window.addEventListener('keydown', this._handleFirstTab);
  };
  AccessibleFocusObservable.prototype._removeAllListeners = function() {
    window.removeEventListener('mousedown', this._handleFirstMouse);
    window.removeEventListener('keydown', this._handleFirstTab);
  };
  return AccessibleFocusObservable;
})();
var tabObservable = new AccessibleFocusObservable();
//# sourceMappingURL=useAccessibleFocus.js.map
