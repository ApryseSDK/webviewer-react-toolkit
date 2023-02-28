'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ButtonGroup = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importDefault(require('react'));
var ButtonGroup = function(_a) {
  var _b = _a.position,
    position = _b === void 0 ? 'right' : _b,
    reverseWrap = _a.reverseWrap,
    centerMobile = _a.centerMobile,
    children = _a.children,
    className = _a.className,
    props = tslib_1.__rest(_a, [
      'position',
      'reverseWrap',
      'centerMobile',
      'children',
      'className',
    ]);
  var buttonGroupClass = (0, classnames_1.default)(
    'ui__base ui__buttonGroup',
    'ui__buttonGroup--position-'.concat(position),
    {
      'ui__buttonGroup--reverse': reverseWrap,
      'ui__buttonGroup--centerMobile': centerMobile,
    },
    className,
  );
  return react_1.default.createElement(
    'div',
    tslib_1.__assign({}, props, { className: buttonGroupClass }),
    children,
  );
};
exports.ButtonGroup = ButtonGroup;
//# sourceMappingURL=ButtonGroup.js.map
