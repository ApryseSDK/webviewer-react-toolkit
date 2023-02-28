'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DndMultiProvider = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
var react_dnd_1 = require('react-dnd');
var react_dnd_multi_backend_1 = tslib_1.__importDefault(
  require('react-dnd-multi-backend'),
);
var HTML5toTouch_1 = tslib_1.__importDefault(
  require('react-dnd-multi-backend/dist/cjs/HTML5toTouch'),
);
var DndMultiProvider = function(_a) {
  var children = _a.children;
  return react_1.default.createElement(
    react_dnd_1.DndProvider,
    {
      backend: react_dnd_multi_backend_1.default,
      options: HTML5toTouch_1.default,
    },
    children,
  );
};
exports.DndMultiProvider = DndMultiProvider;
//# sourceMappingURL=DndMultiProvider.js.map
