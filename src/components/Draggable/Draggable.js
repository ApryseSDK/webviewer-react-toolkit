'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Draggable = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var react_dnd_1 = require('react-dnd');
var react_dnd_html5_backend_1 = require('react-dnd-html5-backend');
var react_motion_1 = require('react-motion');
var hooks_1 = require('../../hooks');
var utils_1 = require('../../utils');
var ItemTypes = { Draggable: 'draggable' };
// Quick animation with no "bounce".
var SPRING = { stiffness: 300, damping: 30 };
exports.Draggable = (0, react_1.forwardRef)(function(_a, ref) {
  var index = _a.index,
    disableDrag = _a.disableDrag,
    hideDragPreview = _a.hideDragPreview,
    preventAnimation = _a.preventAnimation,
    onRenderChildren = _a.onRenderChildren,
    onMove = _a.onMove,
    onDragChange = _a.onDragChange,
    children = _a.children,
    className = _a.className,
    divProps = tslib_1.__rest(_a, [
      'index',
      'disableDrag',
      'hideDragPreview',
      'preventAnimation',
      'onRenderChildren',
      'onMove',
      'onDragChange',
      'children',
      'className',
    ]);
  var draggableRef = (0, react_1.useRef)(null);
  (0, react_1.useImperativeHandle)(ref, function() {
    return draggableRef.current;
  });
  /* --- Drag and drop settings. --- */
  var _b = (0, react_dnd_1.useDrop)({
      accept: ItemTypes.Draggable,
      hover: function(dragItem) {
        // Previous index.
        var fromIndex = dragItem.index;
        // Index it has been dragged to.
        var toIndex = index;
        // Cancel if index has not changed.
        if (fromIndex === toIndex) return;
        // Call onMove when index changes.
        var success =
          onMove === null || onMove === void 0
            ? void 0
            : onMove(fromIndex, toIndex);
        // Set the item index to be the new index.
        if (success) dragItem.index = toIndex;
      },
    }),
    drop = _b[1];
  var _c = (0, react_dnd_1.useDrag)({
      item: { type: ItemTypes.Draggable, index: index },
      collect: function(monitor) {
        return { isDragging: monitor.isDragging() };
      },
      canDrag: !disableDrag,
    }),
    isDragging = _c[0].isDragging,
    drag = _c[1],
    preview = _c[2];
  (0, react_1.useEffect)(
    function() {
      if (hideDragPreview)
        preview((0, react_dnd_html5_backend_1.getEmptyImage)(), {
          captureDraggingState: true,
        });
    },
    [hideDragPreview, preview],
  );
  // Call onDragChange whenever isDragging changes.
  var onDragChangeRef = (0, hooks_1.useCurrentRef)(onDragChange);
  (0, react_1.useEffect)(
    function() {
      var _a;
      if (isDragging && onDragChangeRef.current) {
        (_a = onDragChangeRef.current) === null || _a === void 0
          ? void 0
          : _a.call(onDragChangeRef, true);
        return function() {
          var _a;
          return (_a = onDragChangeRef.current) === null || _a === void 0
            ? void 0
            : _a.call(onDragChangeRef, false);
        }; // eslint-disable-line react-hooks/exhaustive-deps
      }
      return;
    },
    [isDragging, onDragChangeRef],
  );
  drag(drop(draggableRef));
  /* --- Animation settings. --- */
  var _d = (0, react_1.useState)({ x: 0, y: 0 }),
    coords = _d[0],
    setCoords = _d[1];
  var prevIndex = (0, react_1.useRef)(index);
  var noAnimation = (0, hooks_1.useCurrentRef)(isDragging || preventAnimation);
  // Find the difference in position between new index and previous index. Then,
  // get the difference in position and set that as the starting point for the
  // animation.
  (0, react_1.useEffect)(
    function() {
      var _a;
      // Return early if no animation, since we do not want to compute the
      // previous location.
      if (!draggableRef.current || noAnimation.current) return;
      // Get sibling that occupies previous spot to find params.
      var indexDiff = prevIndex.current - index;
      var prev = (0, utils_1.getSibling)(draggableRef.current, indexDiff);
      // Get the coordinates of the previous item.
      var _b =
          (_a =
            prev === null || prev === void 0
              ? void 0
              : prev.getBoundingClientRect()) !== null && _a !== void 0
            ? _a
            : {},
        prevLeft = _b.left,
        prevTop = _b.top;
      // Get the coordinates of the current item.
      var _c = draggableRef.current.getBoundingClientRect(),
        left = _c.left,
        top = _c.top;
      // Get the deltas.
      var deltaX = prevLeft === undefined ? 0 : prevLeft - left;
      var deltaY = prevTop === undefined ? 0 : prevTop - top;
      // Set the coordinates to the distance.
      setCoords({ x: deltaX / 6, y: deltaY / 6 });
      // Store index for next swap.
      prevIndex.current = index;
    },
    [index, noAnimation],
  );
  // Whenever coords change, revert back to zero.
  (0, react_1.useEffect)(
    function() {
      if (coords.x === 0 && coords.y === 0) return;
      requestAnimationFrame(function() {
        return setCoords({ x: 0, y: 0 });
      });
    },
    [coords],
  );
  var motionStyle = (0, react_1.useMemo)(
    function() {
      if (noAnimation.current) return { x: 0, y: 0 };
      // Only spring when returning to zero. This lets it "snap" to the previous
      // location, then "spring" back to the new location.
      return {
        x:
          coords.x === 0
            ? (0, react_motion_1.spring)(coords.x, SPRING)
            : coords.x,
        y:
          coords.y === 0
            ? (0, react_motion_1.spring)(coords.y, SPRING)
            : coords.y,
      };
    },
    [coords, noAnimation],
  );
  var draggableClass = (0, classnames_1.default)(
    'ui__base ui__draggable',
    className,
  );
  var onMotionRender = (0, react_1.useCallback)(
    function(_a) {
      var x = _a.x,
        y = _a.y;
      var inMotion = !!(x || y);
      return react_1.default.createElement(
        'div',
        tslib_1.__assign({}, divProps, {
          ref: draggableRef,
          className: draggableClass,
        }),
        react_1.default.createElement(
          'div',
          {
            style: {
              WebkitTransform: 'translate3d('
                .concat(x, 'px, ')
                .concat(y, 'px, 0)'),
              transform: 'translate3d('.concat(x, 'px, ').concat(y, 'px, 0)'),
            },
            className: (0, classnames_1.default)('ui__draggable__animated', {
              'ui__draggable__animated--inMotion': inMotion,
            }),
          },
          onRenderChildren ? onRenderChildren(isDragging) : children,
        ),
      );
    },
    [children, divProps, draggableClass, isDragging, onRenderChildren],
  );
  return react_1.default.createElement(
    react_motion_1.Motion,
    { style: motionStyle },
    onMotionRender,
  );
});
//# sourceMappingURL=Draggable.js.map
