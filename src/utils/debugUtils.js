'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.logExecTime = void 0;
function logExecTime(tag) {
  var now = performance.now();
  return function() {
    var now2 = performance.now();
    console.log(''.concat(tag, ' took ').concat(now2 - now, 'ms'));
    return now2 - now;
  };
}
exports.logExecTime = logExecTime;
//# sourceMappingURL=debugUtils.js.map
