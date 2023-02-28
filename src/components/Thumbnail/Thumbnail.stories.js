'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RotatedThrottled = exports.Rotated = exports.SelectedIcon = exports.WithLabel = exports.WithToolButtons = exports.Rejected = exports.Expensive = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var action_1 = require('../../storybook-helpers/action/action');
var files_1 = require('../../storybook-helpers/data/files');
var Icon_1 = require('../Icon');
var Thumbnail_1 = require('../Thumbnail');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/Thumbnail',
  component: Thumbnail_1.Thumbnail,
  parameters: { readme: README_md_1.default },
};
var defaultProps = function(options, index, withToolButtons) {
  if (index === void 0) {
    index = 0;
  }
  return {
    file: (0, files_1.createFile)(index, options),
    selected: (0, addon_knobs_1.boolean)('selected', false),
    disabled: (0, addon_knobs_1.boolean)('disabled', false),
    dragging: (0, addon_knobs_1.boolean)('dragging', false),
    otherDragging: (0, addon_knobs_1.boolean)('otherDragging', false),
    onClick: (0, addon_knobs_1.boolean)('has onClick', true)
      ? (0, action_1.action)('onClick')
      : undefined,
    onRename: (0, addon_knobs_1.boolean)('has onRename', true)
      ? (0, action_1.action)('onRename')
      : undefined,
    buttonProps: withToolButtons
      ? [
          {
            children: react_1.default.createElement(Icon_1.Icon, {
              icon: 'RotateRight',
            }),
            onClick: (0, action_1.action)('rotate onClick'),
            key: 0,
          },
          {
            children: react_1.default.createElement(Icon_1.Icon, {
              icon: 'Close',
            }),
            onClick: (0, action_1.action)('close onClick'),
            key: 1,
          },
        ]
      : undefined,
  };
};
var Basic = function() {
  return react_1.default.createElement(
    Thumbnail_1.Thumbnail,
    tslib_1.__assign({}, defaultProps()),
  );
};
exports.Basic = Basic;
var Expensive = function() {
  return react_1.default.createElement(
    Thumbnail_1.Thumbnail,
    tslib_1.__assign({}, defaultProps({ lazy: true })),
  );
};
exports.Expensive = Expensive;
var Rejected = function() {
  return react_1.default.createElement(
    Thumbnail_1.Thumbnail,
    tslib_1.__assign({}, defaultProps({ error: true })),
  );
};
exports.Rejected = Rejected;
var WithToolButtons = function() {
  return react_1.default.createElement(
    Thumbnail_1.Thumbnail,
    tslib_1.__assign({}, defaultProps(undefined, undefined, true)),
  );
};
exports.WithToolButtons = WithToolButtons;
var WithLabel = function() {
  return react_1.default.createElement(
    Thumbnail_1.Thumbnail,
    tslib_1.__assign(
      { label: (0, addon_knobs_1.text)('label', 'some_label') },
      defaultProps(),
    ),
  );
};
exports.WithLabel = WithLabel;
var SelectedIcon = function() {
  return react_1.default.createElement(
    Thumbnail_1.Thumbnail,
    tslib_1.__assign({}, defaultProps(), {
      selectedIcon: react_1.default.createElement(
        'div',
        { style: { color: 'red', fontSize: 20 } },
        (0, addon_knobs_1.text)('selectedIcon', 'CUSTOM!'),
      ),
    }),
  );
};
exports.SelectedIcon = SelectedIcon;
var Rotated = function() {
  return react_1.default.createElement(
    Thumbnail_1.Thumbnail,
    tslib_1.__assign({}, defaultProps(undefined, 1)),
  );
};
exports.Rotated = Rotated;
var RotatedThrottled = function() {
  return react_1.default.createElement(
    Thumbnail_1.Thumbnail,
    tslib_1.__assign({}, defaultProps({ lazy: true }, 1)),
  );
};
exports.RotatedThrottled = RotatedThrottled;
//# sourceMappingURL=Thumbnail.stories.js.map
