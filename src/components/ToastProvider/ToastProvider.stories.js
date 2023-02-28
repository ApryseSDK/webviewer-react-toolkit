'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importDefault(require('react'));
var hooks_1 = require('../../hooks');
var integer_1 = require('../../storybook-helpers/knobs/integer');
var Button_1 = require('../Button');
var ToastProvider_1 = require('../ToastProvider');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/ToastProvider',
  component: ToastProvider_1.ToastProvider,
  parameters: { readme: README_md_1.default },
};
var DemoButtons = function() {
  var toast = (0, hooks_1.useToast)();
  var children = (0, addon_knobs_1.text)('children', '', 'ToastContext.add');
  var hasAction = (0, addon_knobs_1.boolean)(
    'has action',
    false,
    'ToastContext.add',
  );
  var closable = (0, addon_knobs_1.boolean)(
    'closable',
    true,
    'ToastContext.add',
  );
  var hasTimeout = (0, addon_knobs_1.boolean)(
    'has timeout',
    false,
    'ToastContext.add',
  );
  var timeout = hasTimeout
    ? (0, integer_1.integer)('timeout', 0, 'ToastContext.add')
    : undefined;
  var pushToast = function(message, loading) {
    var id = toast.add({
      heading: 'A new '.concat(message, ' toast'),
      children: children,
      message: loading ? 'loading' : message,
      action: hasAction
        ? {
            text: 'Fire Alert',
            onClick: function() {
              return alert('Fired action.');
            },
          }
        : undefined,
      closable: closable,
      timeout: timeout,
    });
    setTimeout(function() {
      toast.modify(id, { message: message });
    }, 2000);
  };
  return react_1.default.createElement(
    'div',
    { style: { display: 'grid', justifyContent: 'center', gap: 8 } },
    react_1.default.createElement(
      'div',
      { className: 'toastprovider__buttons' },
      react_1.default.createElement(
        'div',
        null,
        react_1.default.createElement(
          Button_1.Button,
          {
            onClick: function() {
              return pushToast('info');
            },
          },
          'Add info Toast',
        ),
        react_1.default.createElement(
          Button_1.Button,
          {
            onClick: function() {
              return pushToast('success');
            },
          },
          'Add success Toast',
        ),
        react_1.default.createElement(
          Button_1.Button,
          {
            onClick: function() {
              return pushToast('warning');
            },
          },
          'Add warning Toast',
        ),
        react_1.default.createElement(
          Button_1.Button,
          {
            onClick: function() {
              return pushToast('error');
            },
          },
          'Add error Toast',
        ),
        react_1.default.createElement(
          Button_1.Button,
          {
            onClick: function() {
              return pushToast('loading');
            },
          },
          'Add loading Toast',
        ),
      ),
      react_1.default.createElement(
        'div',
        null,
        react_1.default.createElement(
          Button_1.Button,
          {
            onClick: function() {
              return pushToast('info', true);
            },
          },
          'Add delayed info Toast',
        ),
        react_1.default.createElement(
          Button_1.Button,
          {
            onClick: function() {
              return pushToast('success', true);
            },
          },
          'Add delayed success Toast',
        ),
        react_1.default.createElement(
          Button_1.Button,
          {
            onClick: function() {
              return pushToast('warning', true);
            },
          },
          'Add delayed warning Toast',
        ),
        react_1.default.createElement(
          Button_1.Button,
          {
            onClick: function() {
              return pushToast('error', true);
            },
          },
          'Add delayed error Toast',
        ),
      ),
    ),
    react_1.default.createElement(
      Button_1.Button,
      {
        buttonStyle: 'outline',
        onClick: function() {
          return toast.remove();
        },
      },
      'Pop current Toast',
    ),
  );
};
var Basic = function() {
  return react_1.default.createElement(
    ToastProvider_1.ToastProvider,
    {
      defaultTimeout: (0, integer_1.integer)(
        'defaultTimeout',
        3000,
        'ToastProvider',
      ),
      noTimeout:
        (0, addon_knobs_1.select)(
          'noTimeout',
          ['', 'info', 'success', 'warning', 'error', 'loading'],
          '',
          'ToastProvider',
        ) || undefined,
      position: (0, addon_knobs_1.select)(
        'position',
        [
          'top-left',
          'top',
          'top-right',
          'bottom-left',
          'bottom',
          'bottom-right',
        ],
        'top-right',
        'ToastProvider',
      ),
      customPadding: (0, addon_knobs_1.boolean)(
        'has customPadding',
        false,
        'ToastProvider',
      )
        ? 100
        : undefined,
    },
    react_1.default.createElement(DemoButtons, null),
  );
};
exports.Basic = Basic;
//# sourceMappingURL=ToastProvider.stories.js.map
