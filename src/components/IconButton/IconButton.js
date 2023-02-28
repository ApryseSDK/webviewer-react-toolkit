'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.IconButton = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var Button_1 = require('../Button');
exports.IconButton = (0, react_1.forwardRef)(function(_a, ref) {
  var children = _a.children,
    className = _a.className,
    props = tslib_1.__rest(_a, ['children', 'className']);
  var iconButtonClass = (0, classnames_1.default)(
    'ui__base ui__iconButton',
    className,
  );
  return react_1.default.createElement(
    Button_1.Button,
    tslib_1.__assign({}, props, {
      className: iconButtonClass,
      buttonStyle: 'borderless',
      ref: ref,
    }),
    children,
  );
});
//# sourceMappingURL=IconButton.js.map
