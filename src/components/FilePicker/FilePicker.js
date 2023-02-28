'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FilePicker = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importDefault(require('react'));
var EditableText_1 = require('../EditableText');
var IconButton_1 = require('../IconButton');
var Icon_1 = require('../Icon');
var FilePicker = function(_a) {
  var items = _a.items,
    className = _a.className,
    props = tslib_1.__rest(_a, ['items', 'className']);
  var filePickerClass = (0, classnames_1.default)(
    'ui__base ui__filePicker',
    className,
  );
  return react_1.default.createElement(
    'div',
    tslib_1.__assign({}, props, { className: filePickerClass }),
    items.map(function(item) {
      return react_1.default.createElement(
        'div',
        {
          className: (0, classnames_1.default)(
            'ui__filePicker__file',
            item.className,
          ),
          key: item.key,
        },
        react_1.default.createElement(EditableText_1.EditableText, {
          className: 'ui__filePicker__file__text',
          value: item.name,
          onSave: item.onRename,
          locked: !item.onRename,
        }),
        item.onDelete
          ? react_1.default.createElement(
              IconButton_1.IconButton,
              {
                className: 'ui__filePicker__file__delete',
                onClick: item.onDelete,
              },
              react_1.default.createElement(Icon_1.Icon, { icon: 'Close' }),
            )
          : undefined,
      );
    }),
  );
};
exports.FilePicker = FilePicker;
//# sourceMappingURL=FilePicker.js.map
