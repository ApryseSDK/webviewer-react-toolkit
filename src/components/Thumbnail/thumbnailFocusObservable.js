'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.thumbnailFocusObservable = void 0;
var validKeys = [
  // Valid keys for thumbnail accessibility.
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
];
var ThumbnailFocusObservable = /** @class */ (function() {
  function ThumbnailFocusObservable() {
    var _this = this;
    this._handleFirstTab = function(event) {
      if (validKeys.includes(event.key)) {
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
  Object.defineProperty(ThumbnailFocusObservable.prototype, 'value', {
    get: function() {
      return this._isUserTabbing;
    },
    enumerable: false,
    configurable: true,
  });
  ThumbnailFocusObservable.prototype.subscribe = function(subscriber) {
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
  ThumbnailFocusObservable.prototype._unsubscribe = function(subscriber) {
    var _this = this;
    return function() {
      _this._subscribers = _this._subscribers.filter(function(s) {
        return s !== subscriber;
      });
      // If no subscribers, stop listening to document.
      if (_this._subscribers.length === 0) _this._removeAllListeners();
    };
  };
  ThumbnailFocusObservable.prototype._setIsUserTabbing = function(
    isUserTabbing,
  ) {
    this._isUserTabbing = isUserTabbing;
    this._subscribers.forEach(function(subscriber) {
      return subscriber();
    });
  };
  ThumbnailFocusObservable.prototype._tabToMouseListener = function() {
    window.removeEventListener('keydown', this._handleFirstTab);
    window.addEventListener('mousedown', this._handleFirstMouse);
  };
  ThumbnailFocusObservable.prototype._mouseToTabListener = function() {
    window.removeEventListener('mousedown', this._handleFirstMouse);
    window.addEventListener('keydown', this._handleFirstTab);
  };
  ThumbnailFocusObservable.prototype._removeAllListeners = function() {
    window.removeEventListener('mousedown', this._handleFirstMouse);
    window.removeEventListener('keydown', this._handleFirstTab);
  };
  return ThumbnailFocusObservable;
})();
exports.thumbnailFocusObservable = new ThumbnailFocusObservable();
//# sourceMappingURL=thumbnailFocusObservable.js.map
