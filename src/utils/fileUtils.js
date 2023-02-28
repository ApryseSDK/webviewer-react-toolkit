'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getExtension = void 0;
/**
 * Returns the extension of a filename.
 */
var getExtension = function(filename) {
  if (filename === void 0) {
    filename = '';
  }
  var split = filename.split('.');
  return split.pop();
};
exports.getExtension = getExtension;
//# sourceMappingURL=fileUtils.js.map
