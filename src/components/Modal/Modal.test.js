'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var Modal_1 = require('../Modal');
describe('Modal component', function() {
  it('renders its contents when open', function() {
    var modal = (0, enzyme_1.shallow)(
      react_1.default.createElement(
        Modal_1.Modal,
        { heading: '', open: true },
        'children',
      ),
    );
    expect(modal.find('.ui__modal')).toHaveLength(1);
  });
  it('hides its contents when closed', function() {
    var modal = (0, enzyme_1.shallow)(
      react_1.default.createElement(Modal_1.Modal, { heading: '' }, 'children'),
    );
    expect(modal.find('.ui__modal')).toHaveLength(0);
  });
  it('snapshot renders default modal', function() {
    var modal = (0, enzyme_1.shallow)(
      react_1.default.createElement(Modal_1.Modal, { heading: '' }, 'children'),
    );
    expect(modal).toMatchSnapshot();
  });
});
//# sourceMappingURL=Modal.test.js.map
