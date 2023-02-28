'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.WithLargeButtons = exports.Nested = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var Button_1 = require('../Button');
var ButtonGroup_1 = require('../ButtonGroup');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup_1.ButtonGroup,
  parameters: { readme: README_md_1.default },
};
var Basic = function() {
  var numButtons = (0, addon_knobs_1.number)('numButtons', 2, {
    min: 1,
    max: 5,
    range: true,
    step: 1,
  });
  return react_1.default.createElement(
    ButtonGroup_1.ButtonGroup,
    {
      position: (0, addon_knobs_1.select)(
        'position',
        ['left', 'center', 'right', 'space-between', 'space-around'],
        'right',
      ),
      reverseWrap: (0, addon_knobs_1.boolean)('reverseWrap', false),
      centerMobile: (0, addon_knobs_1.boolean)('centerMobile', false),
    },
    Array.from({ length: numButtons }).map(function(_, index) {
      if (index === 0) {
        return react_1.default.createElement(
          Button_1.Button,
          { key: index },
          'Accept',
        );
      }
      if (index === 1) {
        return react_1.default.createElement(
          Button_1.Button,
          { key: index, buttonStyle: 'outline' },
          'Cancel',
        );
      }
      return react_1.default.createElement(
        Button_1.Button,
        {
          key: index,
          buttonStyle: ['default', 'outline', 'borderless'][index % 3],
        },
        'Button ',
        index + 1,
      );
    }),
  );
};
exports.Basic = Basic;
var Nested = function() {
  return react_1.default.createElement(
    ButtonGroup_1.ButtonGroup,
    { position: 'space-between', centerMobile: true },
    react_1.default.createElement(Button_1.Button, null, 'Other'),
    react_1.default.createElement(
      ButtonGroup_1.ButtonGroup,
      { position: 'right', centerMobile: true },
      react_1.default.createElement(Button_1.Button, null, 'Accept'),
      react_1.default.createElement(
        Button_1.Button,
        { buttonStyle: 'outline' },
        'Cancel',
      ),
    ),
  );
};
exports.Nested = Nested;
var WithLargeButtons = function() {
  return react_1.default.createElement(
    ButtonGroup_1.ButtonGroup,
    {
      position: (0, addon_knobs_1.select)(
        'position',
        ['left', 'center', 'right', 'space-between', 'space-around'],
        'right',
      ),
      reverseWrap: (0, addon_knobs_1.boolean)('reverseWrap', false),
      centerMobile: (0, addon_knobs_1.boolean)('centerMobile', false),
    },
    react_1.default.createElement(
      Button_1.Button,
      null,
      'Accept But With Long Name So You Can See It Wrap',
    ),
    react_1.default.createElement(
      Button_1.Button,
      { buttonStyle: 'outline' },
      'Cancel But With Long Name So You Can See It Wrap',
    ),
  );
};
exports.WithLargeButtons = WithLargeButtons;
//# sourceMappingURL=ButtonGroup.stories.js.map
