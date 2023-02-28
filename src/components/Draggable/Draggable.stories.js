'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.WithOnRenderChildren = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var DndMultiProvider_1 = require('../DndMultiProvider');
var Draggable_1 = require('../Draggable');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/Draggable',
  component: Draggable_1.Draggable,
  parameters: { readme: README_md_1.default },
};
var commonStyle = {
  padding: 16,
  background: 'lightgray',
  color: 'black',
  width: 200,
  height: 50,
  textAlign: 'center',
};
var Basic = function() {
  return react_1.default.createElement(
    DndMultiProvider_1.DndMultiProvider,
    null,
    react_1.default.createElement(
      Draggable_1.Draggable,
      {
        index: 0,
        onDragChange: (0, action_1.action)('onDragChange'),
        disableDrag: (0, addon_knobs_1.boolean)('disableDrag', false),
        hideDragPreview: (0, addon_knobs_1.boolean)('hideDragPreview', false),
      },
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
  );
};
exports.Basic = Basic;
var WithOnRenderChildren = function() {
  return react_1.default.createElement(
    DndMultiProvider_1.DndMultiProvider,
    null,
    react_1.default.createElement(Draggable_1.Draggable, {
      index: 0,
      onRenderChildren: function(isDragging) {
        return react_1.default.createElement(
          'div',
          {
            style: tslib_1.__assign(tslib_1.__assign({}, commonStyle), {
              border: '1px solid '.concat(isDragging ? 'blue' : 'red'),
            }),
          },
          isDragging ? 'This div is being dragged!' : 'This div is draggable!',
        );
      },
      onDragChange: (0, action_1.action)('onDragChange'),
      disableDrag: (0, addon_knobs_1.boolean)('disableDrag', false),
      hideDragPreview: (0, addon_knobs_1.boolean)('hideDragPreview', false),
    }),
  );
};
exports.WithOnRenderChildren = WithOnRenderChildren;
//# sourceMappingURL=Draggable.stories.js.map
