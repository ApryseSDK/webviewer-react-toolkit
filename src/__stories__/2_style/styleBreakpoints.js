'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Breakpoints = exports.Mixins = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importStar(require('react'));
var font_1 = tslib_1.__importDefault(
  require('../../storybook-helpers/theme/font'),
);
var breakpointRange_1 = tslib_1.__importDefault(
  require('./generated/breakpointRange'),
);
var breakpoints_1 = tslib_1.__importDefault(require('./generated/breakpoints'));
var styles_1 = require('./styles');
var utils_1 = require('./utils');
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
function Mixins(_a) {
  var index = _a.index;
  var copy = (0, utils_1.useCopy)();
  var mixin = breakpoints_1.default[index];
  return react_1.default.createElement(
    'div',
    {
      style: tslib_1.__assign(tslib_1.__assign({}, styles_1.style), {
        whiteSpace: 'pre',
        marginBottom: -16,
      }),
      onClick: copy(mixin),
    },
    mixin,
  );
}
exports.Mixins = Mixins;
function Breakpoints() {
  var _a = (0, react_1.useState)(window.document.documentElement.clientWidth),
    width = _a[0],
    _setWidth = _a[1];
  var setWidth = (0, react_1.useCallback)(function() {
    _setWidth(window.document.documentElement.clientWidth);
  }, []);
  var _b = (0, react_1.useState)({}),
    valid = _b[0],
    setValid = _b[1];
  (0, react_1.useEffect)(
    function() {
      var newValid = {};
      breakpointRange_1.default.forEach(function(_a) {
        var params = _a.params,
          max = _a.max,
          min = _a.min;
        if (max && width <= max) {
          newValid[params] = true;
        } else if (min && width >= min) {
          newValid[params] = true;
        }
      });
      setValid(newValid);
    },
    [width],
  );
  (0, react_1.useEffect)(
    function() {
      window.addEventListener('resize', setWidth);
      return function() {
        return window.removeEventListener('resize', setWidth);
      };
    },
    [setWidth],
  );
  return react_1.default.createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 40,
        fontFamily: font_1.default.fontCode,
        color: '#ebebeb',
      },
    },
    react_1.default.createElement(
      'div',
      { style: { fontSize: 14, padding: 4 } },
      'Current width: ',
      width,
      'px',
    ),
    breakpointRange_1.default.map(function(_a) {
      var params = _a.params,
        max = _a.max,
        min = _a.min;
      var isValid = valid[params];
      var background = '#333';
      var rangeColor = isValid
        ? 'rgba(200,255,200,0.2)'
        : 'rgba(255,200,200,0.1)';
      return react_1.default.createElement(
        'div',
        {
          key: params,
          style: {
            backgroundColor: min ? rangeColor : background,
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
          },
        },
        react_1.default.createElement(
          'div',
          {
            style: {
              backgroundColor: max ? rangeColor : background,
              width: max || min,
              display: 'flex',
              justifyContent: 'center',
              color: isValid ? 'lightgreen' : 'lightcoral',
            },
          },
          params,
          ' (',
          min ? ''.concat(min, 'px - \u221E') : '0px - '.concat(max, 'px'),
          ') ',
          isValid ? '✅' : '❌',
        ),
      );
    }),
  );
}
exports.Breakpoints = Breakpoints;
//# sourceMappingURL=styleBreakpoints.js.map
