'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Thumbnail = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importDefault(require('react'));
var hooks_1 = require('../../hooks');
var ClickableDiv_1 = require('../ClickableDiv');
var EditableText_1 = require('../EditableText');
var FilePlaceholder_1 = require('../FilePlaceholder');
var FileSkeleton_1 = require('../FileSkeleton');
var Image_1 = require('../Image');
var ToolButton_1 = require('../ToolButton');
var thumbnailFocusObservable_1 = require('./thumbnailFocusObservable');
function Thumbnail(_a) {
  var file = _a.file,
    label = _a.label,
    selected = _a.selected,
    dragging = _a.dragging,
    otherDragging = _a.otherDragging,
    buttonProps = _a.buttonProps,
    selectedIcon = _a.selectedIcon,
    onRename = _a.onRename,
    onEditingChange = _a.onEditingChange,
    imageClassName = _a.imageClassName,
    className = _a.className,
    disabled = _a.disabled,
    onFocus = _a.onFocus,
    onBlur = _a.onBlur,
    divProps = tslib_1.__rest(_a, [
      'file',
      'label',
      'selected',
      'dragging',
      'otherDragging',
      'buttonProps',
      'selectedIcon',
      'onRename',
      'onEditingChange',
      'imageClassName',
      'className',
      'disabled',
      'onFocus',
      'onBlur',
    ]);
  var isUserTabbing = (0, hooks_1.useAccessibleFocus)(
    thumbnailFocusObservable_1.thumbnailFocusObservable,
  );
  var _b = (0, hooks_1.useFocus)(onFocus, onBlur),
    focused = _b.focused,
    handleOnFocus = _b.handleOnFocus,
    handleOnBlur = _b.handleOnBlur;
  var _c = (0, hooks_1.useFileSubscribe)(
      file,
      function(f) {
        return f.thumbnail;
      },
      'onthumbnailchange',
    ),
    thumbnail = _c[0],
    thumbnailErr = _c[1];
  var name = (0, hooks_1.useFileSubscribe)(
    file,
    function(f) {
      return f.name;
    },
    'onnamechange',
  )[0];
  var handleOnSave = function(newName) {
    onRename === null || onRename === void 0 ? void 0 : onRename(newName, file);
    onEditingChange === null || onEditingChange === void 0
      ? void 0
      : onEditingChange(false, file);
  };
  var handleOnCancel = function() {
    onEditingChange === null || onEditingChange === void 0
      ? void 0
      : onEditingChange(false, file);
  };
  var handleOnEdit = function() {
    onEditingChange === null || onEditingChange === void 0
      ? void 0
      : onEditingChange(true, file);
  };
  var thumbnailClass = (0, classnames_1.default)(
    'ui__base ui__thumbnail',
    {
      'ui__thumbnail--tabbing': isUserTabbing,
      'ui__thumbnail--selected': selected,
      'ui__thumbnail--focused': focused,
      'ui__thumbnail--disabled': disabled,
      'ui__thumbnail--dragging': dragging,
      'ui__thumbnail--otherDragging': otherDragging,
    },
    className,
  );
  return react_1.default.createElement(
    ClickableDiv_1.ClickableDiv,
    tslib_1.__assign({}, divProps, {
      className: thumbnailClass,
      noFocusStyle: true,
      disabled: disabled,
      onFocus: handleOnFocus,
      onBlur: handleOnBlur,
    }),
    react_1.default.createElement(
      'div',
      { className: 'ui__thumbnail__image' },
      react_1.default.createElement(Image_1.Image, {
        src: thumbnail,
        alt: name,
        pending: !thumbnail && !thumbnailErr,
        onRenderLoading: function() {
          return react_1.default.createElement(FileSkeleton_1.FileSkeleton, {
            className: 'ui__thumbnail__image__skeleton',
          });
        },
        onRenderFallback: function() {
          return react_1.default.createElement(
            FilePlaceholder_1.FilePlaceholder,
            {
              className: 'ui__thumbnail__image__placeholder',
              extension: file.extension,
            },
          );
        },
        className: imageClassName,
      }),
    ),
    react_1.default.createElement(
      'div',
      { className: 'ui__thumbnail__controls' },
      buttonProps === null || buttonProps === void 0
        ? void 0
        : buttonProps.map(function(_a) {
            var key = _a.key,
              buttonPropObject = tslib_1.__rest(_a, ['key']);
            return react_1.default.createElement(
              ToolButton_1.ToolButton,
              {
                key: key,
                disabled: disabled,
                onClick: function(e) {
                  return buttonPropObject.onClick(e, file);
                },
              },
              buttonPropObject.children,
            );
          }),
    ),
    selectedIcon
      ? react_1.default.createElement(
          'div',
          { className: 'ui__thumbnail__selectedIcon' },
          selectedIcon,
        )
      : undefined,
    (label !== null && label !== void 0 ? label : name) || onRename
      ? react_1.default.createElement(EditableText_1.EditableText, {
          className: 'ui__thumbnail__label',
          value: label !== null && label !== void 0 ? label : name,
          centerText: true,
          disabled: disabled,
          locked: !onRename || otherDragging,
          onSave: handleOnSave,
          onCancel: handleOnCancel,
          onEdit: handleOnEdit,
        })
      : undefined,
  );
}
exports.Thumbnail = Thumbnail;
//# sourceMappingURL=Thumbnail.js.map
