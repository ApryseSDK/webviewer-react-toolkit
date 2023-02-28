'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LinkTo = void 0;
var tslib_1 = require('tslib');
// @ts-ignore
var react_1 = tslib_1.__importDefault(require('@storybook/addon-links/react'));
var react_2 = tslib_1.__importDefault(require('react'));
var LinkTo = function(_a) {
  var children = _a.children,
    title = _a.title,
    _b = _a.story,
    story = _b === void 0 ? 'page' : _b;
  return react_2.default.createElement(
    react_1.default,
    {
      style: {
        cursor: 'pointer',
        display: 'inline',
        color: '#00a3e3',
        textDecoration: 'none',
      },
      kind: title,
      story: story,
    },
    children,
  );
};
exports.LinkTo = LinkTo;
//# sourceMappingURL=LinkTo.js.map
