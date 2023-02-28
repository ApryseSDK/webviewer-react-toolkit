'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var enzyme_1 = require('enzyme');
var react_1 = tslib_1.__importDefault(require('react'));
var sinon_1 = require('sinon');
var files_1 = require('../../storybook-helpers/data/files');
var Thumbnail_1 = require('../Thumbnail');
var testFile = (0, files_1.createFile)(0);
describe('Thumbnail component', function() {
  it('renders its contents', function() {
    var thumbnail = (0, enzyme_1.shallow)(
      react_1.default.createElement(Thumbnail_1.Thumbnail, { file: testFile }),
    );
    expect(thumbnail.find('.ui__thumbnail')).toHaveLength(1);
  });
  it('snapshot renders default thumbnail', function() {
    var thumbnail = (0, enzyme_1.shallow)(
      react_1.default.createElement(Thumbnail_1.Thumbnail, { file: testFile }),
    );
    expect(thumbnail).toMatchSnapshot();
  });
  it('clicking thumbnail triggers onClick prop', function() {
    var onClick = (0, sinon_1.spy)();
    (0, enzyme_1.shallow)(
      react_1.default.createElement(Thumbnail_1.Thumbnail, {
        file: testFile,
        onClick: onClick,
      }),
    ).simulate('click');
    expect(onClick.callCount).toBe(1);
  });
});
//# sourceMappingURL=Thumbnail.test.js.map
