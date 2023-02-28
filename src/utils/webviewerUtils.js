'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getThumbnail = exports.getRotatedDocument = exports.blobToDocument = exports.documentToBlob = exports.globalLicense = void 0;
var tslib_1 = require('tslib');
exports.globalLicense = (function() {
  var l = undefined;
  return {
    set: function(newLicense) {
      l = newLicense;
    },
    get: function() {
      return l;
    },
  };
})();
/**
 * Convert a WebViewer Core Document into a Blob.
 * @param documentObj A WebViewer Core Document, or promise to get it.
 */
function documentToBlob(documentObj) {
  return tslib_1.__awaiter(this, void 0, void 0, function() {
    var fetchedDocument, data, arr;
    return tslib_1.__generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, documentObj];
        case 1:
          fetchedDocument = _a.sent();
          return [4 /*yield*/, fetchedDocument.getFileData()];
        case 2:
          data = _a.sent();
          arr = new Uint8Array(data);
          return [2 /*return*/, new Blob([arr], { type: 'application/pdf' })];
      }
    });
  });
}
exports.documentToBlob = documentToBlob;
/**
 * Convert a Blob and extension into a WebViewer Core Document.
 * @param blob A Blob, or promise to get it.
 * @param extension The file extension of the provided Blob.
 * @param l License key. If not provided, will try to use global license.
 */
function blobToDocument(blob, extension, l) {
  return tslib_1.__awaiter(this, void 0, void 0, function() {
    var coreControls, fetchedBlob, document_1, e_1;
    return tslib_1.__generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          coreControls = window.Core;
          return [4 /*yield*/, blob];
        case 1:
          fetchedBlob = _a.sent();
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 5]);
          return [
            4 /*yield*/,
            coreControls.createDocument(fetchedBlob, {
              extension: extension,
              l: l || exports.globalLicense.get(),
            }),
          ];
        case 3:
          document_1 = _a.sent();
          return [2 /*return*/, document_1];
        case 4:
          e_1 = _a.sent();
          console.warn(e_1);
          return [2 /*return*/, undefined];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
exports.blobToDocument = blobToDocument;
/**
 * Rotate a document 90 degrees.
 * @param documentObj A WebViewer Core Document, or promise to get it.
 * @param counterclockwise If provided, will rotate counterclockwise instead of
 * the default clockwise.
 */
function getRotatedDocument(documentObj, counterclockwise) {
  return tslib_1.__awaiter(this, void 0, void 0, function() {
    var coreControls, fetchedDocument, pageNumbers, rotation;
    return tslib_1.__generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          coreControls = window.Core;
          if (!documentObj) return [3 /*break*/, 3];
          return [4 /*yield*/, documentObj];
        case 1:
          fetchedDocument = _a.sent();
          pageNumbers = Array.from(
            { length: fetchedDocument.getPageCount() },
            function(_, k) {
              return k + 1;
            },
          );
          rotation = counterclockwise
            ? coreControls.PageRotation.E_270
            : coreControls.PageRotation.E_90;
          return [
            4 /*yield*/,
            fetchedDocument.rotatePages(pageNumbers, rotation),
          ];
        case 2:
          _a.sent();
          return [2 /*return*/, fetchedDocument];
        case 3:
          return [2 /*return*/, undefined];
      }
    });
  });
}
exports.getRotatedDocument = getRotatedDocument;
/**
 * Gets the thumbnail for a document.
 * @param documentObj A WebViewer Core Document, or promise to get it.
 * @param options Additional options for the function.
 */
function getThumbnail(documentObj, options) {
  var _a;
  if (options === void 0) {
    options = {};
  }
  return tslib_1.__awaiter(this, void 0, void 0, function() {
    var extension, _b, pageNumber, supportedFiles, url;
    var _this = this;
    return tslib_1.__generator(this, function(_c) {
      (extension = options.extension),
        (_b = options.pageNumber),
        (pageNumber = _b === void 0 ? 1 : _b);
      if (extension) {
        supportedFiles =
          (_a = window.Core) === null || _a === void 0
            ? void 0
            : _a.SupportedFileFormats.CLIENT;
        if (supportedFiles && !supportedFiles.includes(extension)) {
          throw new Error(
            'Unsupported file type. Unable to get thumbnail for file extension '.concat(
              extension,
            ),
          );
        }
      }
      url = function() {
        return tslib_1.__awaiter(_this, void 0, void 0, function() {
          var fetchedDocument, canvas, url;
          return tslib_1.__generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, documentObj];
              case 1:
                fetchedDocument = _a.sent();
                return [
                  4 /*yield*/,
                  new Promise(function(resolve, reject) {
                    var callback = function(result) {
                      if (!result) return reject(result);
                      resolve(result);
                    };
                    fetchedDocument.loadThumbnailAsync(pageNumber, callback);
                  }),
                ];
              case 2:
                canvas = _a.sent();
                url = canvas.toDataURL();
                if (!url) throw new Error('Unable to get data url.');
                return [2 /*return*/, url];
            }
          });
        });
      };
      return [2 /*return*/, url()];
    });
  });
}
exports.getThumbnail = getThumbnail;
//# sourceMappingURL=webviewerUtils.js.map
