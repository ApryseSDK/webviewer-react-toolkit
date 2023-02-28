'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Choice = void 0;
var tslib_1 = require('tslib');
var classnames_1 = tslib_1.__importDefault(require('classnames'));
var react_1 = tslib_1.__importStar(require('react'));
var hooks_1 = require('../../hooks');
var useID_1 = require('../../hooks/useID');
var Icon_1 = require('../Icon');
exports.Choice = (0, react_1.forwardRef)(function(_a, ref) {
  var label = _a.label,
    leftLabel = _a.leftLabel,
    className = _a.className,
    children = _a.children,
    id = _a.id,
    radio = _a.radio,
    isSwitch = _a.isSwitch,
    center = _a.center,
    disabledLabelChange = _a.disabledLabelChange,
    onChange = _a.onChange,
    onFocus = _a.onFocus,
    onBlur = _a.onBlur,
    props = tslib_1.__rest(_a, [
      'label',
      'leftLabel',
      'className',
      'children',
      'id',
      'radio',
      'isSwitch',
      'center',
      'disabledLabelChange',
      'onChange',
      'onFocus',
      'onBlur',
    ]);
  var inputRef = (0, react_1.useRef)(null);
  (0, react_1.useImperativeHandle)(ref, function() {
    return inputRef.current;
  });
  var isUserTabbing = (0, hooks_1.useAccessibleFocus)();
  var _b = (0, hooks_1.useFocus)(onFocus, onBlur),
    focused = _b.focused,
    handleOnFocus = _b.handleOnFocus,
    handleOnBlur = _b.handleOnBlur;
  var choiceID = (0, useID_1.useID)(id);
  var _c = (0, react_1.useState)(function() {
      var _a, _b, _c;
      return (_c =
        (_a = props.checked) !== null && _a !== void 0
          ? _a
          : (_b = inputRef.current) === null || _b === void 0
          ? void 0
          : _b.checked) !== null && _c !== void 0
        ? _c
        : false;
    }),
    checked = _c[0],
    setChecked = _c[1];
  (0, react_1.useEffect)(
    function() {
      if (props.checked !== undefined) setChecked(props.checked);
    },
    [props.checked],
  );
  var handleOnChange = function(event) {
    if (props.checked === undefined) setChecked(event.target.checked);
    onChange === null || onChange === void 0 ? void 0 : onChange(event);
  };
  // HACK: since there is no way to detect that a radio button is being
  // unchecked due to form activity, we subscribe all radio buttons to an
  // observable. When checked changes and props.checked is undefined, this
  // will trigger the observable which will ping all other subscribers to
  // check if they have become unchecked, and if so change their internal
  // state.
  (0, react_1.useEffect)(
    function() {
      if (props.name && radio) {
        return observable.subscribe(props.name, function() {
          if (inputRef.current && inputRef.current.checked !== checked) {
            setChecked(inputRef.current.checked);
          }
        });
      }
      return;
    },
    [checked, props.name, radio],
  );
  var choiceClass = (0, classnames_1.default)(
    'ui__base ui__choice',
    {
      'ui__choice--radio': radio,
      'ui__choice--leftLabel': leftLabel,
      'ui__choice--checked': checked,
      'ui__choice--center': center,
      'ui__choice--disabled': props.disabled,
    },
    className,
  );
  var inputClass = (0, classnames_1.default)('ui__choice__input', {
    'ui__choice__input--switch': isSwitch,
  });
  var checkClass = isSwitch
    ? (0, classnames_1.default)('ui__choice__input__switch', {
        'ui__choice__input__switch--checked': checked,
        'ui__choice__input__switch--disabled': props.disabled,
        'ui__choice__input__switch--focus': isUserTabbing && focused,
      })
    : (0, classnames_1.default)('ui__choice__input__check', {
        'ui__choice__input__check--checked': checked,
        'ui__choice__input__check--disabled': props.disabled,
        'ui__choice__input__check--focus': isUserTabbing && focused,
      });
  var labelClass = (0, classnames_1.default)('ui__choice__label', {
    'ui__choice__label--disabled': props.disabled && disabledLabelChange,
  });
  var labelElement = (0, react_1.useMemo)(
    function() {
      if (!label) return undefined;
      return react_1.default.createElement(
        'label',
        { className: labelClass, htmlFor: choiceID },
        label,
      );
    },
    [choiceID, label, labelClass],
  );
  return react_1.default.createElement(
    'span',
    { className: choiceClass },
    leftLabel ? labelElement : undefined,
    react_1.default.createElement(
      'span',
      { className: inputClass },
      isSwitch
        ? react_1.default.createElement(
            'div',
            { className: checkClass },
            react_1.default.createElement('div', {
              className: 'ui__choice__input__toggle',
            }),
          )
        : react_1.default.createElement(
            'div',
            { className: checkClass },
            checked && !radio
              ? react_1.default.createElement(Icon_1.Icon, {
                  icon: 'Check',
                  className: 'ui__choice__input__icon',
                })
              : undefined,
          ),
      react_1.default.createElement(
        'input',
        tslib_1.__assign({}, props, {
          id: choiceID,
          type: radio ? 'radio' : 'checkbox',
          onChange: handleOnChange,
          ref: inputRef,
          onFocus: handleOnFocus,
          onBlur: handleOnBlur,
        }),
        children,
      ),
    ),
    !leftLabel ? labelElement : undefined,
  );
});
/**
 * Observable helper to notify radio buttons that they have become unchecked.
 */
var RadioObservable = /** @class */ (function() {
  function RadioObservable() {
    this._subscribers = [];
  }
  RadioObservable.prototype.subscribe = function(name, subscriber) {
    this._trigger(name);
    this._subscribers.push({ name: name, subscriber: subscriber });
    return this._unsubscribe(subscriber);
  };
  RadioObservable.prototype._trigger = function(name) {
    this._subscribers.forEach(function(s) {
      if (name === s.name) s.subscriber();
    });
  };
  RadioObservable.prototype._unsubscribe = function(subscriber) {
    var _this = this;
    return function() {
      _this._subscribers = _this._subscribers.filter(function(s) {
        return s.subscriber !== subscriber;
      });
    };
  };
  return RadioObservable;
})();
var observable = new RadioObservable();
//# sourceMappingURL=Choice.js.map
