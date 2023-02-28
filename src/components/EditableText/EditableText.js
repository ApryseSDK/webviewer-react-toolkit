'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EditableText = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var hooks_1 = require('../../hooks');
var ClickableDiv_1 = require('../ClickableDiv');
exports.EditableText = (0, react_1.forwardRef)(function(_a, ref) {
  var controlledValue = _a.value,
    controlledEditMode = _a.editMode,
    onEdit = _a.onEdit,
    onSave = _a.onSave,
    onCancel = _a.onCancel,
    className = _a.className,
    disabled = _a.disabled,
    locked = _a.locked,
    onRenderText = _a.onRenderText,
    placeholder = _a.placeholder,
    centerText = _a.centerText,
    bordered = _a.bordered,
    clickableDivProps = tslib_1.__rest(_a, [
      'value',
      'editMode',
      'onEdit',
      'onSave',
      'onCancel',
      'className',
      'disabled',
      'locked',
      'onRenderText',
      'placeholder',
      'centerText',
      'bordered',
    ]);
  var inputRef = (0, react_1.useRef)(null);
  var buttonRef = (0, react_1.useRef)(null);
  (0, react_1.useImperativeHandle)(ref, function() {
    return buttonRef.current;
  });
  // Use state if controlled edit mode not provided.
  var _b = (0, react_1.useState)(false),
    stateEditMode = _b[0],
    setStateEditMode = _b[1];
  var editMode =
    controlledEditMode !== null && controlledEditMode !== void 0
      ? controlledEditMode
      : stateEditMode;
  // Use state if controlled value not provided.
  var _c = (0, react_1.useState)(''),
    stateValue = _c[0],
    setStateValue = _c[1];
  var value =
    controlledValue !== null && controlledValue !== void 0
      ? controlledValue
      : stateValue;
  // Keep edit value in sync with value (controlled or state) and reset when
  // edit mode is cancelled.
  var _d = (0, react_1.useState)(value),
    editValue = _d[0],
    setEditValue = _d[1];
  (0, react_1.useEffect)(
    function() {
      return setEditValue(value);
    },
    [editMode, value],
  );
  var _e = (0, react_1.useState)(false),
    noFocusTransition = _e[0],
    setNoFocusTransition = _e[1];
  // Focus input whenever edit mode is enabled, and button when disabled.
  var firstRender = (0, react_1.useRef)(true);
  (0, react_1.useEffect)(
    function() {
      var _a, _b;
      if (firstRender.current) {
        firstRender.current = false;
      } else if (editMode) {
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        setNoFocusTransition(true);
      } else {
        (_b = buttonRef.current) === null || _b === void 0
          ? void 0
          : _b.focus();
        setNoFocusTransition(false);
      }
    },
    [editMode],
  );
  var handleOnEdit = function() {
    if (controlledEditMode === undefined) setStateEditMode(true);
    onEdit === null || onEdit === void 0 ? void 0 : onEdit();
  };
  var handleOnCancel = function() {
    if (controlledEditMode === undefined) setStateEditMode(false);
    setEditValue(value);
    onCancel === null || onCancel === void 0 ? void 0 : onCancel(value);
  };
  var handleOnSave = function() {
    if (controlledValue === undefined) setStateValue(editValue);
    if (controlledEditMode === undefined) setStateEditMode(false);
    onSave === null || onSave === void 0 ? void 0 : onSave(editValue);
  };
  var handleOnKeyPress = function(event) {
    if (event.key === 'Enter') {
      handleOnSave();
      event.stopPropagation();
    }
  };
  var handleOnKeyDown = function(event) {
    if (event.key === 'Escape') {
      handleOnCancel();
    }
    event.stopPropagation();
  };
  var _f = (0, react_1.useMemo)(
      function() {
        var renderedValue = onRenderText ? onRenderText(value) : value;
        if (placeholder && !renderedValue) return [placeholder, true];
        return [renderedValue, false];
      },
      [onRenderText, placeholder, value],
    ),
    valueToDisplay = _f[0],
    isPlaceholder = _f[1];
  var isUserTabbing = (0, hooks_1.useAccessibleFocus)();
  var editableTextClass = (0, classnames_1.default)(
    'ui__base ui__editableText',
    {
      'ui__editableText--disabled': disabled,
      'ui__editableText--locked': locked,
      'ui__editableText--centerText': centerText,
      'ui__editableText--bordered': bordered,
    },
    className,
  );
  var buttonClass = (0, classnames_1.default)('ui__editableText__button', {
    'ui__editableText__button--placeholder': isPlaceholder,
    'ui__editableText__button--noFocusTransition': noFocusTransition,
  });
  var fieldClass = (0, classnames_1.default)('ui__editableText__field', {
    'ui__editableText__field--tabbing': isUserTabbing,
  });
  return react_1.default.createElement(
    'div',
    { className: editableTextClass },
    editMode
      ? react_1.default.createElement('input', {
          className: fieldClass,
          value: editValue,
          onChange: function(e) {
            return setEditValue(e.target.value);
          },
          onKeyPress: handleOnKeyPress,
          onKeyDown: handleOnKeyDown,
          ref: inputRef,
          onBlur: handleOnSave,
          onClick: function(e) {
            return e.stopPropagation();
          },
        })
      : react_1.default.createElement(
          ClickableDiv_1.ClickableDiv,
          tslib_1.__assign({}, clickableDivProps, {
            className: buttonClass,
            disabled: disabled || locked,
            onClick: handleOnEdit,
            ref: buttonRef,
            usePointer: true,
          }),
          react_1.default.createElement('span', null, valueToDisplay),
        ),
  );
});
//# sourceMappingURL=EditableText.js.map
