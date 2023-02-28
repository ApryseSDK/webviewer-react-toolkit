'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Multiple = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var Overlay_1 = require('../Overlay');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/Overlay',
  component: Overlay_1.Overlay,
  parameters: { readme: README_md_1.default },
};
var style = {
  backgroundColor: 'lightblue',
  color: 'black',
  margin: 32,
  padding: 32,
  textAlign: 'center',
};
var Basic = function() {
  var mounted = (0, addon_knobs_1.boolean)('mounted', true);
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    mounted &&
      react_1.default.createElement(
        Overlay_1.Overlay,
        null,
        react_1.default.createElement('div', { style: style }, 'Overlay #1'),
      ),
  );
};
exports.Basic = Basic;
var Multiple = function() {
  var mounted1 = (0, addon_knobs_1.boolean)('#1 mounted', true);
  var mounted2 = (0, addon_knobs_1.boolean)('#2 mounted', true);
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    mounted1
      ? react_1.default.createElement(
          Overlay_1.Overlay,
          null,
          react_1.default.createElement('div', { style: style }, 'Overlay #1'),
        )
      : undefined,
    mounted2
      ? react_1.default.createElement(
          Overlay_1.Overlay,
          null,
          react_1.default.createElement('div', { style: style }, 'Overlay #2'),
        )
      : undefined,
  );
};
exports.Multiple = Multiple;
//# sourceMappingURL=Overlay.stories.js.map
