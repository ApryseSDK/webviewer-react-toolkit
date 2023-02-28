'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ThumbnailSkeleton = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importDefault(require('react'));
var FileSkeleton_1 = require('../FileSkeleton');
function ThumbnailSkeleton(_a) {
  var className = _a.className,
    divProps = tslib_1.__rest(_a, ['className']);
  var thumbnailClass = (0, classnames_1.default)(
    'ui__base ui__thumbnailSkeleton',
    className,
  );
  return react_1.default.createElement(
    'div',
    tslib_1.__assign({}, divProps, { className: thumbnailClass }),
    react_1.default.createElement(
      'div',
      { className: 'ui__thumbnailSkeleton__image' },
      react_1.default.createElement(FileSkeleton_1.FileSkeleton, {
        className: 'ui__thumbnailSkeleton__image__skeleton',
      }),
    ),
    react_1.default.createElement('div', {
      className: 'ui__thumbnailSkeleton__label',
    }),
  );
}
exports.ThumbnailSkeleton = ThumbnailSkeleton;
//# sourceMappingURL=ThumbnailSkeleton.js.map
