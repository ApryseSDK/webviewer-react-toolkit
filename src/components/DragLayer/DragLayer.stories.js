'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.WithCustomTranslate = exports.Basic = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
var DndMultiProvider_1 = require('../DndMultiProvider');
var Draggable_1 = require('../Draggable');
var DragLayer_1 = require('../DragLayer');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/DragLayer',
  component: DragLayer_1.DragLayer,
  parameters: { readme: README_md_1.default },
};
var WIDTH = 200;
var HEIGHT = 50;
var commonStyle = {
  padding: 16,
  background: 'lightgray',
  color: 'black',
  width: WIDTH,
  height: HEIGHT,
  textAlign: 'center',
};
var Basic = function() {
  return react_1.default.createElement(
    DndMultiProvider_1.DndMultiProvider,
    null,
    react_1.default.createElement(
      Draggable_1.Draggable,
      { index: 0, hideDragPreview: true },
      react_1.default.createElement(
        'div',
        {
          style: tslib_1.__assign(tslib_1.__assign({}, commonStyle), {
            border: '1px solid red',
          }),
        },
        'This div is draggable!',
      ),
    ),
    react_1.default.createElement(
      DragLayer_1.DragLayer,
      null,
      react_1.default.createElement(
        'div',
        {
          style: tslib_1.__assign(tslib_1.__assign({}, commonStyle), {
            border: '1px solid blue',
            opacity: 0.9,
            boxShadow: '0 0 26px 0 rgba(0,0,0,0.2)',
          }),
        },
        'Custom preview!',
      ),
    ),
  );
};
exports.Basic = Basic;
var WithCustomTranslate = function() {
  return react_1.default.createElement(
    DndMultiProvider_1.DndMultiProvider,
    null,
    react_1.default.createElement(
      Draggable_1.Draggable,
      { index: 0, hideDragPreview: true },
      react_1.default.createElement(
        'div',
        {
          style: tslib_1.__assign(tslib_1.__assign({}, commonStyle), {
            border: '1px solid red',
          }),
        },
        'This div is draggable!',
      ),
    ),
    react_1.default.createElement(
      DragLayer_1.DragLayer,
      {
        customTranslate: function(_a) {
          var mousePosition = _a.mousePosition;
          var x = mousePosition.x - WIDTH / 2;
          var y = mousePosition.y - HEIGHT / 2;
          return { x: x, y: y };
        },
      },
      react_1.default.createElement(
        'div',
        {
          style: tslib_1.__assign(tslib_1.__assign({}, commonStyle), {
            border: '1px solid blue',
            opacity: 0.9,
            boxShadow: '0 0 26px 0 rgba(0,0,0,0.2)',
          }),
        },
        'Custom preview!',
      ),
    ),
  );
};
exports.WithCustomTranslate = WithCustomTranslate;
//# sourceMappingURL=DragLayer.stories.js.map
