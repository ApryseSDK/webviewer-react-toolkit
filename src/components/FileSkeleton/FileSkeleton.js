'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FileSkeleton = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importDefault(require('react'));
var FileSkeleton = function(_a) {
  var className = _a.className;
  var fileSkeletonClass = (0, classnames_1.default)(
    'ui__base ui__fileSkeleton',
    className,
  );
  return react_1.default.createElement(
    'div',
    { className: fileSkeletonClass },
    react_1.default.createElement('div', {
      className: 'ui__fileSkeleton__block ui__fileSkeleton__block--thumbnail',
    }),
    react_1.default.createElement('div', {
      className: 'ui__fileSkeleton__block ui__fileSkeleton__block--line-sm',
    }),
    react_1.default.createElement('div', {
      className: 'ui__fileSkeleton__block ui__fileSkeleton__block--line-xs',
    }),
    react_1.default.createElement('div', {
      className: 'ui__fileSkeleton__block ui__fileSkeleton__block--line-df',
    }),
    react_1.default.createElement('div', {
      className: 'ui__fileSkeleton__block ui__fileSkeleton__block--line-lgx',
    }),
    react_1.default.createElement('div', {
      className: 'ui__fileSkeleton__block ui__fileSkeleton__block--line-lg',
    }),
    react_1.default.createElement('div', {
      className: 'ui__fileSkeleton__block ui__fileSkeleton__block--line-df',
    }),
  );
};
exports.FileSkeleton = FileSkeleton;
//# sourceMappingURL=FileSkeleton.js.map
