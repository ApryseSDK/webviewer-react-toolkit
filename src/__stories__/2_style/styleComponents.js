'use strict';
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.Mixins = exports.Theme = exports.Groups = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importStar(require('react'));
var withTheme_1 = require('../../../.storybook/withTheme');
var components_1 = require('../../components');
var font_1 = tslib_1.__importDefault(
  require('../../storybook-helpers/theme/font'),
);
var mixins_1 = tslib_1.__importDefault(require('./generated/mixins'));
var styleVariables_1 = tslib_1.__importDefault(
  require('./generated/styleVariables'),
);
var styles_1 = require('./styles');
var utils_1 = require('./utils');
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
/* --- Variables. --- */
var colorFocusShadow =
  (_a = styleVariables_1.default.colors.other.find(function(c) {
    return c.scss === '$color-focus-shadow';
  })) === null || _a === void 0
    ? void 0
    : _a.dark;
function _Groups() {
  var copy = (0, utils_1.useCopy)();
  var keys = Object.keys(styleVariables_1.default).filter(function(k) {
    return k !== 'colors';
  });
  var _a = (0, react_1.useState)(false),
    tick = _a[0],
    setTick = _a[1];
  (0, react_1.useEffect)(
    function() {
      setTimeout(function() {
        return setTick(!tick);
      }, 500);
    },
    [tick],
  );
  var groups = [];
  keys.forEach(function(k) {
    var group = styleVariables_1.default[k];
    if (!group.length) return;
    groups.push(
      react_1.default.createElement(
        'h2',
        {
          key: k,
          style: tslib_1.__assign(tslib_1.__assign({}, styles_1.titleStyle), {
            gridColumn: '1 / last-line',
          }),
        },
        (0, utils_1.getTitle)(k),
      ),
    );
    groups = tslib_1.__spreadArray(
      tslib_1.__spreadArray([], groups, true),
      group.map(function(_a) {
        var _b;
        var scss = _a.scss,
          css = _a.css,
          value = _a.value;
        var transition = scss === '$focus-transition' ? value : undefined;
        var valueStyle = tslib_1.__assign(
          tslib_1.__assign(
            tslib_1.__assign({}, styles_1.style),
            ['fontSize', 'fontWeight', 'padding', 'borderRadius'].includes(k)
              ? ((_b = {}), (_b[k] = value), _b)
              : undefined,
          ),
          {
            boxShadow:
              k === 'padding'
                ? 'inset 0px 0px 0px '.concat(value, ' rgba(0,50,0,0.1)')
                : scss === '$focus-transition' && tick
                ? colorFocusShadow && '0 0 0 2px '.concat(colorFocusShadow)
                : k === 'boxShadow'
                ? value
                : undefined,
            transition: transition,
          },
        );
        var truncate = {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          minWidth: 0,
        };
        return react_1.default.createElement(
          react_1.default.Fragment,
          { key: scss },
          react_1.default.createElement(
            'div',
            { style: styles_1.prefixStyle },
            'Sass:',
          ),
          react_1.default.createElement(
            'div',
            { style: styles_1.style, onClick: copy(scss) },
            react_1.default.createElement('div', { style: truncate }, scss),
          ),
          react_1.default.createElement(
            'div',
            { style: styles_1.dividerStyle },
            'or',
          ),
          react_1.default.createElement(
            'div',
            { style: styles_1.prefixStyle },
            'CSS:',
          ),
          react_1.default.createElement(
            'div',
            { style: styles_1.style, onClick: copy(css) },
            react_1.default.createElement('div', { style: truncate }, css),
          ),
          react_1.default.createElement(
            'div',
            { style: styles_1.dividerStyle },
            '=',
          ),
          react_1.default.createElement(
            'div',
            { style: styles_1.prefixStyle },
            'Value:',
          ),
          react_1.default.createElement(
            'div',
            { style: valueStyle, onClick: copy(value) },
            react_1.default.createElement('div', { style: truncate }, value),
          ),
        );
      }),
      true,
    );
  });
  return react_1.default.createElement(
    'div',
    {
      style: {
        marginTop: -20,
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(7, auto)',
        fontSize: 12,
        alignItems: 'center',
      },
    },
    groups,
  );
}
var Groups = function() {
  return react_1.default.createElement(
    components_1.ToastProvider,
    null,
    react_1.default.createElement(_Groups, null),
  );
};
exports.Groups = Groups;
/* --- Colors. --- */
var colorButtonStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: 4,
  padding: '2px 4px',
  color: 'black',
  cursor: 'pointer',
};
function _Theme() {
  var copy = (0, utils_1.useCopy)();
  var keys = Object.keys(styleVariables_1.default.colors);
  var groups = [];
  var _a = (0, react_1.useState)(withTheme_1.isDarkThemeStored),
    darkTheme = _a[0],
    setDarkTheme = _a[1];
  var _b = (0, react_1.useMemo)(function() {
      var canvas = styleVariables_1.default.colors.other.find(function(c) {
        return c.scss === '$color-background-canvas';
      });
      var font = styleVariables_1.default.colors.font.find(function(c) {
        return c.scss === '$color-font-primary';
      });
      var light = canvas === null || canvas === void 0 ? void 0 : canvas.value;
      var dark = canvas === null || canvas === void 0 ? void 0 : canvas.dark;
      var lightFont = font === null || font === void 0 ? void 0 : font.value;
      var darkFont = font === null || font === void 0 ? void 0 : font.dark;
      return [light, dark, lightFont, darkFont];
    }, []),
    lightCanvas = _b[0],
    darkCanvas = _b[1],
    lightFont = _b[2],
    darkFont = _b[3];
  keys.forEach(function(k) {
    var colors = styleVariables_1.default.colors[k];
    if (!colors.length) return;
    groups.push(
      react_1.default.createElement(
        'h2',
        {
          key: k,
          style: tslib_1.__assign(tslib_1.__assign({}, styles_1.titleStyle), {
            gridColumn: '1 / last-line',
            color: darkTheme ? darkFont : lightFont,
          }),
        },
        (0, utils_1.getTitle)(k),
      ),
    );
    groups.push(
      react_1.default.createElement(
        'div',
        {
          key: k + 'colors',
          style: {
            margin: '16px 0',
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat( auto-fit, 236px )',
          },
        },
        colors.map(function(_a) {
          var scss = _a.scss,
            css = _a.css,
            value = _a.value,
            dark = _a.dark;
          return react_1.default.createElement(
            'div',
            {
              key: css,
              style: { fontSize: 11, fontFamily: font_1.default.fontCode },
            },
            react_1.default.createElement(
              'div',
              {
                style: {
                  display: 'flex',
                  padding: 8,
                  position: 'relative',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid '.concat(
                    darkTheme ? lightCanvas : darkCanvas,
                  ),
                  borderRadius: 4,
                  backgroundColor: darkTheme ? dark : value,
                  height: 110,
                  width: 210,
                  flexShrink: 1,
                },
              },
              react_1.default.createElement(
                'div',
                {
                  style: tslib_1.__assign(
                    tslib_1.__assign({}, colorButtonStyle),
                    { position: 'absolute', top: 8, left: 8 },
                  ),
                  onClick: copy(darkTheme ? dark : value),
                },
                darkTheme ? dark : value,
              ),
              react_1.default.createElement(
                'div',
                {
                  style: { position: 'absolute', bottom: 8, left: 8, right: 8 },
                },
                react_1.default.createElement(
                  'div',
                  {
                    style: tslib_1.__assign(
                      tslib_1.__assign({}, colorButtonStyle),
                      { marginBottom: 4 },
                    ),
                    onClick: copy(scss),
                  },
                  scss,
                ),
                react_1.default.createElement(
                  'div',
                  { style: colorButtonStyle, onClick: copy(css) },
                  css,
                ),
              ),
            ),
          );
        }),
      ),
    );
  });
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(
      'div',
      { className: 'colors__theme' },
      react_1.default.createElement(withTheme_1.ThemeChangeButton, {
        className: 'colors__theme__button',
        onClick: setDarkTheme,
      }),
    ),
    react_1.default.createElement(
      'div',
      {
        style: {
          borderRadius: 4,
          padding: 20,
          border: '1px solid rgba(255,255,255,.1)',
          boxShadow: 'rgba(0,0,0,0.20) 0 2px 5px 0',
          backgroundColor: darkTheme ? darkCanvas : lightCanvas,
        },
      },
      groups,
    ),
  );
}
var Theme = function() {
  return react_1.default.createElement(
    components_1.ToastProvider,
    null,
    react_1.default.createElement(_Theme, null),
  );
};
exports.Theme = Theme;
/* --- Mixins. --- */
function Mixins(_a) {
  var index = _a.index;
  var copy = (0, utils_1.useCopy)();
  var mixin = mixins_1.default[index];
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
//# sourceMappingURL=styleComponents.js.map
