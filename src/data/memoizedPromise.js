'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MemoizedPromise = void 0;
var tslib_1 = require('tslib');
var futurable_1 = require('./futurable');
/**
 * This class is responsible for wrapping tasks in a promise that won't be
 * executed until the result is actually required. Calling .get() on the class
 * will start the task, and resolve with the result. If the task has already
 * been executed once, it will resolve immediatly with the last result.
 */
var MemoizedPromise = /** @class */ (function() {
  function MemoizedPromise(futurableOrLazy, options) {
    if (options === void 0) {
      options = {};
    }
    var _this = this;
    /** Resolves with a promise for the value. */
    this.get = function() {
      return tslib_1.__awaiter(_this, void 0, void 0, function() {
        return tslib_1.__generator(this, function(_a) {
          if (this._done) return [2 /*return*/, this._result];
          this._result = (0, futurable_1.futureableOrLazyToFuturable)(
            this._futurableOrLazy,
          );
          this._done = true;
          return [2 /*return*/, this._result];
        });
      });
    };
    if (futurableOrLazy instanceof MemoizedPromise) {
      this._futurableOrLazy = (0, futurable_1.memoizedPromiseToFuturableOrLazy)(
        futurableOrLazy,
      );
    } else {
      this._futurableOrLazy = futurableOrLazy;
    }
    this._result = undefined;
    this._done = false;
    if (options.preprocess || typeof this._futurableOrLazy !== 'function') {
      this._result = (0, futurable_1.futureableOrLazyToFuturable)(
        this._futurableOrLazy,
      );
      this._done = true;
    }
  }
  Object.defineProperty(MemoizedPromise.prototype, 'done', {
    /** Is true if the value is memoized. */
    get: function() {
      return this._done;
    },
    enumerable: false,
    configurable: true,
  });
  return MemoizedPromise;
})();
exports.MemoizedPromise = MemoizedPromise;
//# sourceMappingURL=memoizedPromise.js.map
