'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.titleStyle = exports.prefixStyle = exports.dividerStyle = exports.style = void 0;
var tslib_1 = require('tslib');
var font_1 = tslib_1.__importDefault(
  require('../../storybook-helpers/theme/font'),
);
/* --- Styles. --- */
exports.style = {
  userSelect: 'none',
  padding: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: 4,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  fontFamily: font_1.default.fontCode,
  fontSize: 12,
  overflow: 'hidden',
};
exports.dividerStyle = tslib_1.__assign(tslib_1.__assign({}, exports.style), {
  cursor: 'default',
  backgroundColor: 'transparent',
  color: exports.style.backgroundColor,
  fontFamily: font_1.default.fontBase,
  justifyContent: 'center',
});
exports.prefixStyle = tslib_1.__assign(
  tslib_1.__assign({}, exports.dividerStyle),
  {
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: -8,
    justifyContent: 'flex-end',
  },
);
exports.titleStyle = {
  fontFamily: font_1.default.fontBase,
  margin: '20px 0 8px',
  padding: 0,
  position: 'relative',
  color: 'rgba(240,240,255,0.9)',
  fontSize: 20,
};
//# sourceMappingURL=styles.js.map
