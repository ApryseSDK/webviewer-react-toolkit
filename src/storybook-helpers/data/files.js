'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FakeFile = exports.createFile = void 0;
var tslib_1 = require('tslib');
var memoizedPromise_1 = require('../../data/memoizedPromise');
var pdf_preview_2_png_1 = tslib_1.__importDefault(
  require('../images/pdf-preview-2.png'),
);
var pdf_preview_png_1 = tslib_1.__importDefault(
  require('../images/pdf-preview.png'),
);
function createFile(index, options) {
  if (options === void 0) {
    options = {};
  }
  return new FakeFile(index, options);
}
exports.createFile = createFile;
var FakeFile = /** @class */ (function() {
  function FakeFile(index, options) {
    if (options === void 0) {
      options = {};
    }
    this.id = 'file_'.concat(index + 1);
    this.name = 'file_'.concat(index + 1, '.pdf');
    this.originalName = 'file_'.concat(index + 1);
    this.extension = 'pdf';
    this.thumbnail = this._getParameter(
      index % 2 ? pdf_preview_2_png_1.default : pdf_preview_png_1.default,
      options,
    );
    this.fileObj = new memoizedPromise_1.MemoizedPromise(new Blob());
    this.documentObj = new memoizedPromise_1.MemoizedPromise('');
  }
  FakeFile.prototype._getParameter = function(parameter, options) {
    var internals = (function() {
      if (options.lazy)
        return function() {
          return new Promise(function(res) {
            return setTimeout(function() {
              return res(parameter);
            }, 500);
          });
        };
      if (options.error)
        return function() {
          return new Promise(function(_res, rej) {
            return setTimeout(function() {
              return rej('Some error.');
            }, 500);
          });
        };
      return parameter;
    })();
    return new memoizedPromise_1.MemoizedPromise(internals);
  };
  FakeFile.prototype.subscribe = function() {
    return function() {};
  };
  return FakeFile;
})();
exports.FakeFile = FakeFile;
//# sourceMappingURL=files.js.map
