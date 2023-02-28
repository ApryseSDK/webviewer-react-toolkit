'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DragLayer = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var react_dnd_1 = require('react-dnd');
var DragLayer = function(_a) {
  var children = _a.children,
    customTranslate = _a.customTranslate,
    className = _a.className,
    divProps = tslib_1.__rest(_a, ['children', 'customTranslate', 'className']);
  var _b = (0, react_dnd_1.useDragLayer)(function(monitor) {
      return {
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
        mousePosition: monitor.getClientOffset(),
      };
    }),
    currentOffset = _b.currentOffset,
    isDragging = _b.isDragging,
    mousePosition = _b.mousePosition;
  var style = (0, react_1.useMemo)(
    function() {
      var _a;
      if (!currentOffset || !mousePosition) return { display: 'none' };
      var _b =
          (_a =
            customTranslate === null || customTranslate === void 0
              ? void 0
              : customTranslate({
                  currentOffset: currentOffset,
                  mousePosition: mousePosition,
                })) !== null && _a !== void 0
            ? _a
            : currentOffset,
        x = _b.x,
        y = _b.y;
      var transform = 'translate('.concat(x, 'px, ').concat(y, 'px)');
      return { transform: transform, WebkitTransform: transform };
    },
    [currentOffset, customTranslate, mousePosition],
  );
  if (!isDragging) return null;
  var dragLayerClass = (0, classnames_1.default)(
    'ui__base ui__dragLayer',
    className,
  );
  return react_1.default.createElement(
    'div',
    tslib_1.__assign({}, divProps, { className: dragLayerClass }),
    react_1.default.createElement('div', { style: style }, children),
  );
};
exports.DragLayer = DragLayer;
//# sourceMappingURL=DragLayer.js.map
