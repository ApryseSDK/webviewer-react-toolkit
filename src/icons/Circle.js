'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Circle = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
function Circle(props) {
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
      d:
        'M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z',
    }),
  );
}
exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map
