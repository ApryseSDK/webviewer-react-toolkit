'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getTitle = exports.useCopy = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
var hooks_1 = require('../../hooks');
function fallbackCopyTextToClipboard(text) {
  return tslib_1.__awaiter(this, void 0, void 0, function() {
    var textArea, successful;
    return tslib_1.__generator(this, function(_a) {
      textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed'; // avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      successful = document.execCommand('copy');
      if (!successful) throw new Error();
      document.body.removeChild(textArea);
      return [2 /*return*/];
    });
  });
}
function useCopy() {
  var toast = (0, hooks_1.useToast)();
  return function(text) {
    return function(e) {
      e.preventDefault();
      e.stopPropagation();
      var copyFunc = navigator.clipboard
        ? function() {
            return navigator.clipboard.writeText(text);
          }
        : function() {
            return fallbackCopyTextToClipboard(text);
          };
      copyFunc().then(
        function() {
          toast.remove();
          toast.add({
            heading: 'Copied Value',
            children: react_1.default.createElement(
              'code',
              { style: { whiteSpace: 'pre-wrap' } },
              text,
            ),
            message: 'success',
            timeout: 2000,
          });
        },
        function(err) {
          toast.add({
            heading: 'Error Copying Text',
            children: react_1.default.createElement(
              'code',
              { style: { whiteSpace: 'pre-wrap' } },
              err,
            ),
            message: 'error',
            timeout: 2000,
          });
        },
      );
    };
  };
}
exports.useCopy = useCopy;
function getTitle(group) {
  var words = group.split(/(?=[A-Z])/);
  words = words.map(function(w) {
    return w.charAt(0).toUpperCase() + w.slice(1);
  });
  return words.join(' ');
}
exports.getTitle = getTitle;
//# sourceMappingURL=utils.js.map
