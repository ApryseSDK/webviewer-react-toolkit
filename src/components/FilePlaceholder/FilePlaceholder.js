'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FilePlaceholder = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importDefault(require('react'));
var FilePlaceholder = function(_a) {
  var className = _a.className,
    extension = _a.extension;
  var filePlaceholderClass = (0, classnames_1.default)(
    'ui__base ui__filePlaceholder',
    className,
  );
  var formattedExtension =
    extension && '.'.concat(extension.replace(/^\./, ''));
  return react_1.default.createElement(
    'div',
    { className: filePlaceholderClass },
    react_1.default.createElement('div', {
      className:
        'ui__filePlaceholder__block ui__filePlaceholder__block--thumbnail',
    }),
    react_1.default.createElement('div', {
      className:
        'ui__filePlaceholder__block ui__filePlaceholder__block--line-sm',
    }),
    react_1.default.createElement('div', {
      className:
        'ui__filePlaceholder__block ui__filePlaceholder__block--line-xs',
    }),
    react_1.default.createElement('div', {
      className:
        'ui__filePlaceholder__block ui__filePlaceholder__block--line-df',
    }),
    react_1.default.createElement('div', {
      className:
        'ui__filePlaceholder__block ui__filePlaceholder__block--line-lgx',
    }),
    react_1.default.createElement('div', {
      className:
        'ui__filePlaceholder__block ui__filePlaceholder__block--line-lg',
    }),
    react_1.default.createElement('div', {
      className:
        'ui__filePlaceholder__block ui__filePlaceholder__block--line-df',
    }),
    formattedExtension
      ? react_1.default.createElement(
          'div',
          { className: 'ui__filePlaceholder__extension' },
          formattedExtension,
        )
      : undefined,
  );
};
exports.FilePlaceholder = FilePlaceholder;
//# sourceMappingURL=FilePlaceholder.js.map
