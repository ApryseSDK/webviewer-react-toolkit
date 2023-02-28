'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Info = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
function Info(props) {
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
        'M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z',
    }),
    react_1.default.createElement('path', {
      d: 'M11 11H13V17H11zM11 7H13V9H11z',
    }),
  );
}
exports.Info = Info;
//# sourceMappingURL=Info.js.map
