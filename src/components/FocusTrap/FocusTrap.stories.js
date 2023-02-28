'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.JustUseFocusTrapHook = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importStar(require('react'));
var hooks_1 = require('../../hooks');
var FocusTrap_1 = require('../FocusTrap');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/FocusTrap',
  component: FocusTrap_1.FocusTrap,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  var _a = (0, react_1.useState)(false),
    showLock = _a[0],
    setShowLock = _a[1];
  return react_1.default.createElement(
    'div',
    { className: 'App' },
    react_1.default.createElement('input', null),
    react_1.default.createElement(
      'button',
      {
        onClick: function() {
          return setShowLock(true);
        },
      },
      'Lock from outside',
    ),
    react_1.default.createElement(
      FocusTrap_1.FocusTrap,
      {
        locked: showLock,
        focusLastOnUnlock: (0, addon_knobs_1.boolean)(
          'focusLastOnUnlock',
          false,
        ),
      },
      react_1.default.createElement(
        'div',
        {
          className: showLock
            ? 'App__lockzone App__lockzone--locked'
            : 'App__lockzone',
        },
        react_1.default.createElement(
          'p',
          null,
          'Zone is ',
          showLock ? 'locked' : 'unlocked',
        ),
        react_1.default.createElement('input', null),
        react_1.default.createElement(
          'button',
          {
            onClick: function() {
              return setShowLock(function(prev) {
                return !prev;
              });
            },
          },
          showLock ? 'Unlock' : 'Lock from inside',
        ),
      ),
    ),
  );
};
exports.Basic = Basic;
var JustUseFocusTrapHook = function() {
  var _a = (0, react_1.useState)(false),
    showLock = _a[0],
    setShowLock = _a[1];
  var focusRef = (0, hooks_1.useFocusTrap)(showLock, {
    focusLastOnUnlock: (0, addon_knobs_1.boolean)('focusLastOnUnlock', false),
  });
  return react_1.default.createElement(
    'div',
    { className: 'App' },
    react_1.default.createElement('input', null),
    react_1.default.createElement(
      'button',
      {
        onClick: function() {
          return setShowLock(true);
        },
      },
      'Lock from outside',
    ),
    react_1.default.createElement(
      'div',
      {
        ref: focusRef,
        className: showLock
          ? 'App__lockzone App__lockzone--locked'
          : 'App__lockzone',
      },
      react_1.default.createElement(
        'p',
        null,
        'Zone is ',
        showLock ? 'locked' : 'unlocked',
      ),
      react_1.default.createElement('input', null),
      react_1.default.createElement(
        'button',
        {
          onClick: function() {
            return setShowLock(function(prev) {
              return !prev;
            });
          },
        },
        showLock ? 'Unlock' : 'Lock from inside',
      ),
    ),
  );
};
exports.JustUseFocusTrapHook = JustUseFocusTrapHook;
exports.JustUseFocusTrapHook.story = { name: 'Just useFocusTrap Hook' };
//# sourceMappingURL=FocusTrap.stories.js.map
