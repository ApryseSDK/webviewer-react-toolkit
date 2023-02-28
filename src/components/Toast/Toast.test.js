'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var Toast_1 = require('../Toast');
jest.mock('../../utils', function() {
  return {
    getStringId: function(prefix) {
      return ''.concat(prefix, '_1234');
    },
  };
});
describe('Toast component', function() {
  it('renders its contents', function() {
    var toast = (0, enzyme_1.shallow)(
      react_1.default.createElement(Toast_1.Toast, { heading: '' }),
    );
    expect(toast.find('.ui__toast')).toHaveLength(1);
  });
  it('snapshot renders default toast', function() {
    var toast = (0, enzyme_1.shallow)(
      react_1.default.createElement(Toast_1.Toast, { heading: '' }),
    );
    expect(toast).toMatchSnapshot();
  });
});
//# sourceMappingURL=Toast.test.js.map
