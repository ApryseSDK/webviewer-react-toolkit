'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.File = void 0;
var tslib_1 = require('tslib');
var utils_1 = require('../utils');
var memoizedPromise_1 = require('./memoizedPromise');
/** A representation of the data within a file. */
var File = /** @class */ (function() {
  /**
   * Initialize the `File`.
   * @param fileDetails The file details object or file-like class to initialize
   * this `File` with.
   */
  function File(fileDetails) {
    var _this = this;
    /* --- Private helpers. --- */
    /** Generate a thumbnail from document object. */
    this._generateThumbnail = function() {
      return tslib_1.__awaiter(_this, void 0, void 0, function() {
        var result, e_1;
        return tslib_1.__generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              return [
                4 /*yield*/,
                (0, utils_1.getThumbnail)(
                  this.fullDocumentObj || this.documentObj.get(),
                  {
                    extension: this.extension,
                    pageNumber: this.pageNumber,
                  },
                ),
              ];
            case 1:
              result = _a.sent();
              return [2 /*return*/, result];
            case 2:
              e_1 = _a.sent();
              console.warn(
                'Unable to get thumbnail for extension '.concat(this.extension),
              );
              return [2 /*return*/, ''];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    };
    /** Generate a file object from document object. */
    this._generateFileObj = function() {
      return (0, utils_1.documentToBlob)(_this.documentObj.get());
    };
    /** Generate a document object from file object and extension. */
    this._generateDocumentObj = function() {
      return (0, utils_1.blobToDocument)(
        _this.fileObj.get(),
        _this.extension,
        _this._license,
      );
    };
    var name = fileDetails.name,
      id = fileDetails.id,
      originalName = fileDetails.originalName,
      extension = fileDetails.extension,
      fileObj = fileDetails.fileObj,
      documentObj = fileDetails.documentObj,
      thumbnail = fileDetails.thumbnail,
      license = fileDetails.license,
      fullDocumentObj = fileDetails.fullDocumentObj,
      pageNumber = fileDetails.pageNumber;
    if (!fileObj && !documentObj) {
      throw new Error(
        'One of `fileObj` or `documentObj` is required to initialize File.',
      );
    }
    if (fullDocumentObj) {
      if (typeof pageNumber !== 'number') {
        throw new Error(
          '"pageNumber" must be passed if using "fullDocumentObj"',
        );
      }
      this._fullDocumentObj = fullDocumentObj;
      this._pageNumber = pageNumber;
    }
    this._id = id || (0, utils_1.getStringId)('file');
    this._name = name;
    this._originalName = originalName || name;
    this._extension = extension || (0, utils_1.getExtension)(name);
    this._documentObj = new memoizedPromise_1.MemoizedPromise(
      documentObj !== null && documentObj !== void 0
        ? documentObj
        : this._generateDocumentObj,
    );
    this._fileObj = new memoizedPromise_1.MemoizedPromise(
      fileObj !== null && fileObj !== void 0 ? fileObj : this._generateFileObj,
    );
    this._thumbnail = new memoizedPromise_1.MemoizedPromise(
      thumbnail !== null && thumbnail !== void 0
        ? thumbnail
        : this._generateThumbnail,
    );
    this._freezeThumbnail = false;
    this._subscribers = {};
    this._license = license;
  }
  /**
   * Set the license key in order to use full WebViewer features. This only
   * needs to be done once, and will be used globally by all files.
   * @param license The license key for WebViewer.
   */
  File.setGlobalLicense = function(license) {
    utils_1.globalLicense.set(license);
  };
  Object.defineProperty(File.prototype, 'id', {
    /** A unique ID generated for the file. */
    get: function() {
      return this._id;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(File.prototype, 'originalName', {
    /** The original name of the file. */
    get: function() {
      return this._originalName;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(File.prototype, 'extension', {
    /** The extension of the file (for example `'pdf'`). */
    get: function() {
      return this._extension;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(File.prototype, 'thumbnail', {
    /** A memoized promise for the thumbnail. */
    get: function() {
      return this._thumbnail;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(File.prototype, 'fileObj', {
    /** A memoized promise for the fileObj. */
    get: function() {
      return this._fileObj;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(File.prototype, 'documentObj', {
    /** A memoized promise for the documentObj. */
    get: function() {
      return this._documentObj;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(File.prototype, 'fullDocumentObj', {
    /** Gets the full document object if provided during initialization. */
    get: function() {
      return this._fullDocumentObj;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(File.prototype, 'pageNumber', {
    /** Gets the page index if provided during initialization. */
    get: function() {
      return this._pageNumber;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(File.prototype, 'name', {
    /** The name of the file. */
    get: function() {
      return this._name;
    },
    set: function(name) {
      this._name = name;
      this._extension = (0, utils_1.getExtension)(name);
      this.dispatchEvent('onnamechange');
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(File.prototype, 'freezeThumbnail', {
    /** Freeze to prevent thumbnail from changing. */
    get: function() {
      return this._freezeThumbnail;
    },
    set: function(freezeThumbnail) {
      this._freezeThumbnail = freezeThumbnail;
      if (freezeThumbnail) this.dispatchEvent('onfreezethumbnail');
      else this.dispatchEvent('onunfreezethumbnail');
    },
    enumerable: false,
    configurable: true,
  });
  /* --- Memoized promise value setters. --- */
  /**
   * Set the thumbnail or give a futurable or getter.
   * @param thumbnail The thumbnail, promise, or getter for the thumbnail.
   */
  File.prototype.setThumbnail = function(thumbnail) {
    if (this.freezeThumbnail) return;
    this._thumbnail = new memoizedPromise_1.MemoizedPromise(
      thumbnail !== null && thumbnail !== void 0
        ? thumbnail
        : this._generateThumbnail,
    );
    this.dispatchEvent('onthumbnailchange');
  };
  /**
   * Set the fileObj or give a futurable or getter.
   * @param fileObj The fileObj, promise, or getter for the fileObj.
   */
  File.prototype.setFileObj = function(fileObj) {
    this._fileObj = new memoizedPromise_1.MemoizedPromise(
      fileObj !== null && fileObj !== void 0 ? fileObj : this._generateFileObj,
    );
    // Only update documentObj if fileObj was given, not generated.
    if (fileObj) this.setDocumentObj();
    this.dispatchEvent('onfileobjchange');
  };
  /**
   * Set the documentObj or give a futurable or getter.
   * @param documentObj The documentObj, promise, or getter for the documentObj.
   */
  File.prototype.setDocumentObj = function(documentObj) {
    this._documentObj = new memoizedPromise_1.MemoizedPromise(
      documentObj !== null && documentObj !== void 0
        ? documentObj
        : this._generateDocumentObj,
    );
    // Only update fileObj if documentObj was given, not generated.
    if (documentObj) this.setFileObj();
    this.setThumbnail();
    this.dispatchEvent('ondocumentobjchange');
  };
  /**
   * Use this file to make updates to `documentObj` that you want reflected in
   * `fileObj` and `thumbnail`. Since mutations directly to `documentObj` will
   * not be detected, using this function tells `File` to trigger an update.
   */
  File.prototype.updateDocumentObj = function(updater) {
    return tslib_1.__awaiter(this, void 0, void 0, function() {
      var documentObj;
      return tslib_1.__generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.documentObj.get()];
          case 1:
            documentObj = _a.sent();
            return [4 /*yield*/, updater(documentObj)];
          case 2:
            _a.sent();
            this.setDocumentObj(documentObj);
            return [2 /*return*/];
        }
      });
    });
  };
  /* --- File utility functions. --- */
  /**
   * Rotate 90 degrees clockwise unless `counterclockwise` is true.
   * @param counterclockwise Rotate 90 degrees counterclockwise.
   */
  File.prototype.rotate = function(counterclockwise) {
    return tslib_1.__awaiter(this, void 0, void 0, function() {
      var rotated;
      return tslib_1.__generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              (0, utils_1.getRotatedDocument)(
                this.documentObj.get(),
                counterclockwise,
              ),
            ];
          case 1:
            rotated = _a.sent();
            this.setDocumentObj(rotated);
            this.dispatchEvent('onrotate');
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Creates a clone of the file with a new `documentObj`. This is the
   * recommended way of duplicating files, as it will prevent them both
   * referencing the same documentObj.
   * @param overrides Override any of the `FileDetails` that initialize `File`.
   * Note that `fileObj` will be overridden by the `documentObj` in overrides,
   * or cloned from this file.
   */
  File.prototype.clone = function(overrides) {
    var _a = overrides || {},
      documentObj = _a.documentObj,
      rest = tslib_1.__rest(_a, ['documentObj']);
    return new File(
      tslib_1.__assign(
        tslib_1.__assign(
          {
            name: this.name,
            originalName: this.originalName,
            extension: this.extension,
          },
          rest,
        ),
        {
          documentObj:
            documentObj ||
            (0, utils_1.blobToDocument)(
              (0, utils_1.documentToBlob)(this.documentObj.get()),
              this.extension,
              this._license,
            ),
        },
      ),
    );
  };
  /* --- Events. --- */
  /**
   * Appends an subscriber for events whose type attribute value is type.
   * The callback argument sets the callback that will be invoked when the event
   * is dispatched.
   * @param type The event type that will invoke the listener.
   * @param subscriber The listener function that will be invoked.
   */
  File.prototype.subscribe = function(type, subscriber) {
    var _a;
    ((_a = this._subscribers[type]) !== null && _a !== void 0
      ? _a
      : (this._subscribers[type] = [])
    ).push(subscriber);
    return this._unsubscribe(type, subscriber);
  };
  /**
   * Dispatch an event for this file. Once all subscribers have been called for
   * the dispatched type, it will complete by calling all onchange subscribers.
   * @param type The file event type to dispatch.
   */
  File.prototype.dispatchEvent = function(type) {
    var _a;
    (_a = this._subscribers[type]) === null || _a === void 0
      ? void 0
      : _a.forEach(function(subscriber) {
          return subscriber();
        });
    if (type !== 'onchange') this.dispatchEvent('onchange');
  };
  /**
   * Removes the event listener in target's event listener list with the same
   * type and callback.
   * @param type The event type that the listener is registered for.
   * @param subscriber The listener to remove.
   */
  File.prototype._unsubscribe = function(type, subscriber) {
    var _this = this;
    return function() {
      var _a;
      return (_this._subscribers[type] =
        (_a = _this._subscribers[type]) === null || _a === void 0
          ? void 0
          : _a.filter(function(l) {
              return l !== subscriber;
            }));
    };
  };
  return File;
})();
exports.File = File;
//# sourceMappingURL=file.js.map
