'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Current = exports.Version = void 0;
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importDefault(require('react'));
var font_1 = tslib_1.__importDefault(
  require('../../storybook-helpers/theme/font'),
);
var version = require('../../../package.json').version;
function Version() {
  return react_1.default.createElement('span', null, version);
}
exports.Version = Version;
function Current(props) {
  var style = {
    fontFamily: font_1.default.fontBase,
    margin: 0,
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    WebkitOverflowScrolling: 'touch',
    color: '#00a3e3',
    textDecoration: 'none',
  };
  return react_1.default.createElement(
    'a',
    {
      style: style,
      href: 'https://github.com/PDFTron/webviewer-react-toolkit/releases/tag/v'.concat(
        version,
      ),
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    props.text || version,
  );
}
exports.Current = Current;
//# sourceMappingURL=Version.js.map
