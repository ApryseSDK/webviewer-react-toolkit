'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SrcPromiseReturnsFalsy = exports.SrcPromiseRejects = exports.WithSrcPromise = exports.Basic = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
var Image_1 = require('../Image');
var Spinner_1 = require('../Spinner');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
var addon_knobs_1 = require('@storybook/addon-knobs');
exports.default = {
  title: 'Components/Image',
  component: Image_1.Image,
  parameters: { readme: README_md_1.default },
};
var style = {
  height: 250,
  width: 250,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'lightgray',
};
var IMAGE =
  'https://www.webfx.com/blog/images/cdn.designinstruct.com/files/582-how-to-image-placeholders/generic-image-placeholder.png';
var Basic = function() {
  return react_1.default.createElement(
    'div',
    { style: style },
    react_1.default.createElement(Image_1.Image, {
      src: IMAGE,
      onRenderLoading: function() {
        return react_1.default.createElement(Spinner_1.Spinner, null);
      },
      pending: (0, addon_knobs_1.boolean)('pending', false),
    }),
  );
};
exports.Basic = Basic;
var WithSrcPromise = function() {
  return react_1.default.createElement(
    'div',
    { style: style },
    react_1.default.createElement(Image_1.Image, {
      src: new Promise(function(res) {
        return setTimeout(function() {
          return res(IMAGE);
        }, 500);
      }),
      onRenderLoading: function() {
        return react_1.default.createElement(Spinner_1.Spinner, null);
      },
    }),
  );
};
exports.WithSrcPromise = WithSrcPromise;
var SrcPromiseRejects = function() {
  return react_1.default.createElement(
    'div',
    { style: style },
    react_1.default.createElement(Image_1.Image, {
      src: new Promise(function(rej) {
        return setTimeout(function() {
          return rej();
        }, 500);
      }),
      onRenderLoading: function() {
        return react_1.default.createElement(Spinner_1.Spinner, null);
      },
      onRenderFallback: function() {
        return 'Rejected source promise';
      },
      pending: (0, addon_knobs_1.boolean)('pending', false),
    }),
  );
};
exports.SrcPromiseRejects = SrcPromiseRejects;
var SrcPromiseReturnsFalsy = function() {
  return react_1.default.createElement(
    'div',
    { style: style },
    react_1.default.createElement(Image_1.Image, {
      src: new Promise(function(res) {
        return setTimeout(function() {
          return res('');
        }, 500);
      }),
      onRenderLoading: function() {
        return react_1.default.createElement(Spinner_1.Spinner, null);
      },
      onRenderFallback: function() {
        return 'Falsy source';
      },
      pending: (0, addon_knobs_1.boolean)('pending', false),
    }),
  );
};
exports.SrcPromiseReturnsFalsy = SrcPromiseReturnsFalsy;
//# sourceMappingURL=Image.stories.js.map
