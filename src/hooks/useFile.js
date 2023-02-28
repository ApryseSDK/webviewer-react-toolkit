'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useFile = void 0;
var react_1 = require('react');
var useFileSubscribe_1 = require('./useFileSubscribe');
/**
 * This hook converts a file class with async values into a React-friendly hook
 * with async values set to undefined until they are fetched.
 * @param file The file to convert to react observable values.
 */
function useFile(file) {
  var _a = (0, useFileSubscribe_1.useFileSubscribe)(
      file,
      function(f) {
        return f.name;
      },
      'onnamechange',
    ),
    name = _a[0],
    nameErr = _a[1];
  var _b = (0, useFileSubscribe_1.useFileSubscribe)(
      file,
      function(f) {
        return f.thumbnail;
      },
      'onthumbnailchange',
    ),
    thumbnail = _b[0],
    thumbnailErr = _b[1];
  var _c = (0, useFileSubscribe_1.useFileSubscribe)(
      file,
      function(f) {
        return f.fileObj;
      },
      'onfileobjchange',
    ),
    fileObj = _c[0],
    fileObjErr = _c[1];
  var _d = (0, useFileSubscribe_1.useFileSubscribe)(
      file,
      function(f) {
        return f.documentObj;
      },
      'ondocumentobjchange',
    ),
    documentObj = _d[0],
    documentObjErr = _d[1];
  var fileValue = (0, react_1.useMemo)(
    function() {
      return {
        file: file,
        id: file.id,
        originalName: file.originalName,
        extension: file.extension,
        name: name,
        thumbnail: thumbnail,
        fileObj: fileObj,
        documentObj: documentObj,
        errors: {
          name: nameErr,
          thumbnail: thumbnailErr,
          fileObj: fileObjErr,
          documentObj: documentObjErr,
        },
      };
    },
    [
      documentObj,
      documentObjErr,
      file,
      fileObj,
      fileObjErr,
      name,
      nameErr,
      thumbnail,
      thumbnailErr,
    ],
  );
  return fileValue;
}
exports.useFile = useFile;
//# sourceMappingURL=useFile.js.map
