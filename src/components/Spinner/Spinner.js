'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Spinner = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importDefault(require('react'));
var Spinner = function(_a) {
  var _b = _a.spinnerSize,
    spinnerSize = _b === void 0 ? 'default' : _b,
    className = _a.className;
  var spinnerClass = (0, classnames_1.default)(
    'ui__base ui__spinner',
    'ui__spinner--size-'.concat(spinnerSize),
    className,
  );
  return react_1.default.createElement(
    'div',
    { className: spinnerClass },
    react_1.default.createElement('div', {
      className: 'ui__spinner__animated',
    }),
  );
};
exports.Spinner = Spinner;
//# sourceMappingURL=Spinner.js.map
