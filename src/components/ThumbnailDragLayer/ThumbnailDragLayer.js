'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ThumbnailDragLayer = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var icons_1 = require('../../icons');
var ThumbnailDragLayer = function(_a) {
  var _b = _a.numFiles,
    numFiles = _b === void 0 ? 1 : _b,
    className = _a.className,
    divProps = tslib_1.__rest(_a, ['numFiles', 'className']);
  numFiles = numFiles || 1;
  (0, react_1.useEffect)(
    function() {
      if (!Number.isInteger(numFiles))
        throw new RangeError('numFiles must be an integer');
      if (!Number.isFinite(numFiles))
        throw new RangeError('numFiles must not be infinite');
      if (numFiles <= 0)
        throw new RangeError('numFiles must be a positive integer');
    },
    [numFiles],
  );
  var thumbnailDragLayerClass = (0, classnames_1.default)(
    'ui__base ui__thumbnailDragLayer',
    className,
  );
  return react_1.default.createElement(
    'div',
    tslib_1.__assign({}, divProps, { className: thumbnailDragLayerClass }),
    react_1.default.createElement(
      'div',
      { className: 'ui__thumbnailDragLayer__wrapper' },
      numFiles === 1
        ? react_1.default.createElement(icons_1.SinglePage, {
            className: 'ui__thumbnailDragLayer__icon',
          })
        : react_1.default.createElement(icons_1.MultiPage, {
            className: 'ui__thumbnailDragLayer__icon',
          }),
      numFiles > 1
        ? react_1.default.createElement(
            'div',
            { className: 'ui__thumbnailDragLayer__numFiles' },
            react_1.default.createElement(
              'span',
              { className: 'ui__thumbnailDragLayer__numFiles__wrapper' },
              numFiles,
            ),
          )
        : undefined,
    ),
  );
};
exports.ThumbnailDragLayer = ThumbnailDragLayer;
//# sourceMappingURL=ThumbnailDragLayer.js.map
