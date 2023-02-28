'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UseManagedFilesHook = exports.WithGridRef = exports.DifferentThumbnailSize = exports.WithCustomDragLayer = exports.EditableWithButtons = exports.Basic = void 0;
var tslib_1 = require('tslib');
var addon_knobs_1 = require('@storybook/addon-knobs');
var react_1 = tslib_1.__importStar(require('react'));
var hooks_1 = require('../../hooks');
var action_1 = require('../../storybook-helpers/action/action');
var files_1 = require('../../storybook-helpers/data/files');
var forwardAction_1 = require('../../storybook-helpers/knobs/forwardAction');
var integer_1 = require('../../storybook-helpers/knobs/integer');
var Button_1 = require('../Button');
var FileOrganizer_1 = require('../FileOrganizer');
var Icon_1 = require('../Icon');
var Thumbnail_1 = require('../Thumbnail');
var ThumbnailDragLayer_1 = require('../ThumbnailDragLayer');
var README_md_1 = tslib_1.__importDefault(require('./README.md'));
exports.default = {
  title: 'Components/FileOrganizer',
  component: FileOrganizer_1.FileOrganizer,
  parameters: { readme: README_md_1.default, info: { disable: true } },
};
var Template = function(_a) {
  var onRenderDragLayer = _a.onRenderDragLayer,
    _b = _a.numFiles,
    numFiles = _b === void 0 ? 2 : _b,
    editable = _a.editable,
    scrollToTop = _a.scrollToTop,
    customSizedThumbnail = _a.customSizedThumbnail;
  // This is the index organizing function.
  var _c = (0, react_1.useState)(function() {
      var newFiles = [];
      for (var index = 0; index < numFiles; index++) {
        newFiles.push((0, files_1.createFile)(index));
      }
      return newFiles;
    }),
    files = _c[0],
    setFiles = _c[1];
  var handleOnMove = (0, react_1.useCallback)(function(fromIndex, toIndex) {
    setFiles(function(prev) {
      if (toIndex < 0 || toIndex >= prev.length) return prev;
      var clone = prev.slice();
      var item = clone.splice(fromIndex, 1)[0];
      clone.splice(toIndex, 0, item);
      return clone;
    });
    return true;
  }, []);
  var gridRef = (0, react_1.useRef)(null);
  var onScrollToTop = function() {
    var _a;
    (_a = gridRef.current) === null || _a === void 0
      ? void 0
      : _a.scrollTo({ scrollTop: 0, scrollLeft: 0 });
  };
  var _d = (0, react_1.useState)(false),
    largerSize = _d[0],
    setLargerSize = _d[1];
  var changeSize = function() {
    return setLargerSize(function(prev) {
      return !prev;
    });
  };
  var size = largerSize
    ? { width: 200, height: 250 }
    : { width: 150, height: 200 };
  // This is just a helper for adding or removing files.
  (0, react_1.useEffect)(
    function() {
      setFiles(function(prev) {
        if (prev.length > numFiles) {
          return prev.slice(0, numFiles);
        }
        if (prev.length < numFiles) {
          var newFiles = [];
          for (var index = prev.length; index < numFiles; index++) {
            newFiles.push((0, files_1.createFile)(index));
          }
          return tslib_1.__spreadArray(
            tslib_1.__spreadArray([], prev, true),
            newFiles,
            true,
          );
        }
        return prev;
      });
    },
    [numFiles],
  );
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(FileOrganizer_1.FileOrganizer, {
      files: files,
      gridRef: gridRef,
      preventArrowsToMove: (0, addon_knobs_1.boolean)(
        'preventArrowsToMove',
        false,
      ),
      preventClickAwayDeselect: (0, addon_knobs_1.boolean)(
        'preventClickAwayDeselect',
        false,
      ),
      disableMove: (0, addon_knobs_1.boolean)('disableMove', false),
      padding: (0, integer_1.integer)('padding', 0),
      onMove: (0, forwardAction_1.forwardAction)('onMove', handleOnMove),
      onDragChange: (0, action_1.action)('onDragChange'),
      onDeselectAll: (0, action_1.action)('onDeselectAll'),
      onSelectAll: (0, action_1.action)('onSelectAll'),
      thumbnailSize: customSizedThumbnail ? size : undefined,
      onRenderDragLayer: onRenderDragLayer
        ? function() {
            return react_1.default.createElement(
              ThumbnailDragLayer_1.ThumbnailDragLayer,
              null,
            );
          }
        : undefined,
      onRenderThumbnail: function(_a) {
        var onRenderThumbnailProps = _a.onRenderThumbnailProps,
          index = _a.index;
        return customSizedThumbnail
          ? react_1.default.createElement(
              'div',
              {
                style: tslib_1.__assign(tslib_1.__assign({}, size), {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'lightblue',
                  border: '1px solid orange',
                }),
              },
              'Thumbnail ',
              index + 1,
            )
          : react_1.default.createElement(
              Thumbnail_1.Thumbnail,
              tslib_1.__assign({}, onRenderThumbnailProps, {
                onRename: editable ? function() {} : undefined,
                buttonProps: editable
                  ? [
                      {
                        children: react_1.default.createElement(Icon_1.Icon, {
                          icon: 'Close',
                        }),
                        onClick: function() {},
                        key: 0,
                      },
                    ]
                  : undefined,
              }),
            );
      },
    }),
    scrollToTop &&
      react_1.default.createElement(
        Button_1.Button,
        { onClick: onScrollToTop },
        'Scroll to top',
      ),
    customSizedThumbnail &&
      react_1.default.createElement(
        Button_1.Button,
        { onClick: changeSize },
        'Change thumbnail size',
      ),
  );
};
var Basic = function() {
  var numFiles = (0, addon_knobs_1.number)('number of files', 2, {
    min: 0,
    max: 16,
    step: 1,
    range: true,
  });
  return react_1.default.createElement(Template, { numFiles: numFiles });
};
exports.Basic = Basic;
var EditableWithButtons = function() {
  var numFiles = (0, addon_knobs_1.number)('number of files', 2, {
    min: 0,
    max: 16,
    step: 1,
    range: true,
  });
  return react_1.default.createElement(Template, {
    numFiles: numFiles,
    editable: true,
  });
};
exports.EditableWithButtons = EditableWithButtons;
var WithCustomDragLayer = function() {
  var numFiles = (0, addon_knobs_1.number)('number of files', 2, {
    min: 0,
    max: 16,
    step: 1,
    range: true,
  });
  return react_1.default.createElement(Template, {
    numFiles: numFiles,
    onRenderDragLayer: true,
  });
};
exports.WithCustomDragLayer = WithCustomDragLayer;
var DifferentThumbnailSize = function() {
  var numFiles = (0, addon_knobs_1.number)('number of files', 2, {
    min: 0,
    max: 16,
    step: 1,
    range: true,
  });
  return react_1.default.createElement(Template, {
    numFiles: numFiles,
    customSizedThumbnail: true,
  });
};
exports.DifferentThumbnailSize = DifferentThumbnailSize;
var WithGridRef = function() {
  return react_1.default.createElement(Template, {
    numFiles: 100,
    scrollToTop: true,
  });
};
exports.WithGridRef = WithGridRef;
var UseManagedFilesHook = function() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  var _a = (0, hooks_1.useManagedFiles)({
      initialFiles: Array.from({ length: 1000 }, function(_, index) {
        return (0, files_1.createFile)(index);
      }),
      preventMultiDrag: (0, addon_knobs_1.boolean)(
        'preventMultiDrag',
        false,
        'useManagedFiles options',
      ),
      preventMultiSelect: (0, addon_knobs_1.boolean)(
        'preventMultiSelect',
        false,
        'useManagedFiles options',
      ),
      preventDeselectOnDragOther: (0, addon_knobs_1.boolean)(
        'preventDeselectOnDragOther',
        false,
        'useManagedFiles options',
      ),
      preventSelectOnDrag: (0, addon_knobs_1.boolean)(
        'preventSelectOnDrag',
        false,
        'useManagedFiles options',
      ),
      easyMultiSelect: (0, addon_knobs_1.boolean)(
        'easyMultiSelect',
        false,
        'useManagedFiles options',
      ),
    }),
    fileOrganizerProps = _a.fileOrganizerProps,
    getThumbnailSelectionProps = _a.getThumbnailSelectionProps,
    draggingIds = _a.draggingIds;
  return react_1.default.createElement(
    FileOrganizer_1.FileOrganizer,
    tslib_1.__assign({}, fileOrganizerProps, {
      onRenderDragLayer: function() {
        return react_1.default.createElement(
          ThumbnailDragLayer_1.ThumbnailDragLayer,
          { numFiles: draggingIds.length },
        );
      },
      preventArrowsToMove: (0, addon_knobs_1.boolean)(
        'preventArrowsToMove',
        false,
        'FileOrganizer',
      ),
      preventClickAwayDeselect: (0, addon_knobs_1.boolean)(
        'preventClickAwayDeselect',
        false,
        'FileOrganizer',
      ),
      disableMove: (0, addon_knobs_1.boolean)(
        'disableMove',
        false,
        'FileOrganizer',
      ),
      padding: (0, integer_1.integer)('padding', 0, 'FileOrganizer'),
      onRenderThumbnail: function(_a) {
        var id = _a.id,
          onRenderThumbnailProps = _a.onRenderThumbnailProps;
        return react_1.default.createElement(
          Thumbnail_1.Thumbnail,
          tslib_1.__assign(
            {},
            getThumbnailSelectionProps(id),
            onRenderThumbnailProps,
          ),
        );
      },
    }),
  );
};
exports.UseManagedFilesHook = UseManagedFilesHook;
exports.UseManagedFilesHook.story = { name: 'useManagedFiles Hook' };
//# sourceMappingURL=FileOrganizer.stories.js.map
