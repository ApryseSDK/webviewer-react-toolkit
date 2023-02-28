'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Label = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var useID_1 = require('../../hooks/useID');
var Label = function(_a) {
  var label = _a.label,
    optionalText = _a.optionalText,
    children = _a.children,
    className = _a.className,
    htmlFor = _a.htmlFor,
    props = tslib_1.__rest(_a, [
      'label',
      'optionalText',
      'children',
      'className',
      'htmlFor',
    ]);
  var childrenId =
    children === null || children === void 0 ? void 0 : children.props.id;
  var id = (0, useID_1.useID)(childrenId);
  var labelClass = (0, classnames_1.default)(
    'ui__base ui__label',
    {
      'ui__label--disabled':
        children === null || children === void 0
          ? void 0
          : children.props.disabled,
      'ui__label--attached': children,
    },
    className,
  );
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(
      'label',
      tslib_1.__assign({}, props, {
        className: labelClass,
        htmlFor: htmlFor !== null && htmlFor !== void 0 ? htmlFor : id,
      }),
      label,
      optionalText
        ? react_1.default.createElement(
            'span',
            { className: 'ui__label__optional' },
            optionalText,
          )
        : undefined,
    ),
    children ? (0, react_1.cloneElement)(children, { id: id }) : undefined,
  );
};
exports.Label = Label;
//# sourceMappingURL=Label.js.map
