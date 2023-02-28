'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var utils_1 = require('../utils');
var MAX_ACTIVE_UNITS = 1;
var QueueItem = /** @class */ (function() {
  function QueueItem(id, unit) {
    this.cancelled = false;
    this.id = id;
    this.unit = unit;
  }
  QueueItem.prototype.process = function() {
    return this.unit();
  };
  QueueItem.prototype.cancel = function() {
    this.cancelled = true;
  };
  return QueueItem;
})();
var GlobalQueue = /** @class */ (function() {
  function GlobalQueue() {
    this.queue = [];
    this.queueRefs = new Map();
    this._listeners = new Map();
    this._queueLength = 0;
    this._activeUnits = 0;
  }
  GlobalQueue.prototype.process = function(unit) {
    var _this = this;
    var id = (0, utils_1.getId)();
    var item = new QueueItem(id, unit);
    this.queue.push(item);
    this.queueRefs.set(id, item);
    var p = new Promise(function(resolve, reject) {
      _this._listeners.set(id, function(result) {
        if (result instanceof Error) {
          return reject(result);
        }
        resolve(result);
      });
    });
    this._queueLength++;
    this.flush();
    return [
      p,
      function() {
        return _this.cancel(id);
      },
    ];
  };
  // Marks a unit of work as cancelled.
  // The unit will not be processed and will be removed
  // from the queue when no other work is going on
  GlobalQueue.prototype.cancel = function(id) {
    var ref = this.queueRefs.get(id);
    ref === null || ref === void 0 ? void 0 : ref.cancel();
    this.flush();
  };
  GlobalQueue.prototype.cleanup = function() {
    var _this = this;
    this.queue = this.queue.filter(function(item) {
      var cancelled = item.cancelled,
        id = item.id;
      if (cancelled) {
        _this.queueRefs.delete(id);
        return false;
      }
      return true;
    });
    this._queueLength = this.queue.length;
  };
  GlobalQueue.prototype.flush = function() {
    return tslib_1.__awaiter(this, void 0, void 0, function() {
      var item, result, e_1, id, callback;
      return tslib_1.__generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (this._activeUnits === MAX_ACTIVE_UNITS) return [2 /*return*/];
            if (this._queueLength === 0) {
              this.cleanup();
              return [2 /*return*/];
            }
            item = this.queue.shift();
            if (item === null || item === void 0 ? void 0 : item.cancelled) {
              this._queueLength--;
              this.flush();
              return [2 /*return*/];
            }
            // If no items left, return
            if (!item) {
              this.cleanup();
              return [2 /*return*/];
            }
            this._activeUnits++;
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              item === null || item === void 0 ? void 0 : item.process(),
            ];
          case 2:
            result = _a.sent();
            return [3 /*break*/, 4];
          case 3:
            e_1 = _a.sent();
            result = new Error(e_1);
            return [3 /*break*/, 4];
          case 4:
            id = item === null || item === void 0 ? void 0 : item.id;
            callback = this._listeners.get(id);
            callback === null || callback === void 0
              ? void 0
              : callback(result);
            this.queueRefs.delete(id);
            this._activeUnits--;
            this._queueLength--;
            this.flush();
            return [2 /*return*/];
        }
      });
    });
  };
  return GlobalQueue;
})();
// Singleton
exports.default = new GlobalQueue();
//# sourceMappingURL=GlobalQueue.js.map
