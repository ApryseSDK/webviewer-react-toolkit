'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Menu = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
function Menu(props) {
  return react_1.default.createElement(
    'svg',
    tslib_1.__assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
      },
      props,
    ),
    react_1.default.createElement('path', {
      d: 'M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z',
    }),
  );
}
exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map
