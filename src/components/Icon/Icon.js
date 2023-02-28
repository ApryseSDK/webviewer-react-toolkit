'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Icon = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var icons = tslib_1.__importStar(require('./../../icons'));
exports.Icon = (0, react_1.forwardRef)(function(_a, ref) {
  var icon = _a.icon,
    svgProps = _a.svgProps,
    className = _a.className,
    children = _a.children,
    props = tslib_1.__rest(_a, ['icon', 'svgProps', 'className', 'children']);
  var iconClass = (0, classnames_1.default)('ui__base ui__icon', className);
  var child = (0, react_1.useMemo)(
    function() {
      if (children !== undefined) return children;
      if (icons === undefined) return undefined;
      var IconChild = icons[icon];
      return react_1.default.createElement(
        IconChild,
        tslib_1.__assign({}, svgProps),
      );
    },
    [children, icon, svgProps],
  );
  return react_1.default.createElement(
    'i',
    tslib_1.__assign({}, props, { className: iconClass, ref: ref }),
    child,
  );
});
//# sourceMappingURL=Icon.js.map
