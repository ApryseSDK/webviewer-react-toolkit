import {
  blobToDocument,
  documentToBlob,
  getExtension,
  getRotatedDocument,
  getStringId,
  getThumbnail,
  globalLicense,
} from '../utils';
import { FuturableOrLazy } from './futurable';
import { MemoizedPromise } from './memoizedPromise';

export interface FileDetails {
  /**
   * The name of the file.
   */
  name: string;
  /**
   * Optional ID for file. If falsy, will generate a unique ID.
   */
  id?: string;
  /**
   * The original name of the file.
   * @default name
   */
  originalName?: string;
  /**
   * File extension. For example, `'pdf'`. If not provided, will be parsed from
   * `name`.
   */
  extension?: string;
  /**
   * File object, or function to get it. One of `fileObj` or `documentObj` must
   * be given.
   */
  fileObj?: MemoizedPromise<Blob> | FuturableOrLazy<Blob>;
  /**
   * Document object, or function to get it. One of `fileObj` or `documentObj`
   * must be given.
   */
  documentObj?: MemoizedPromise<CoreControls.Document> | FuturableOrLazy<CoreControls.Document>;
  /**
   * Thumbnail data URL string, or function to get it.
   */
  thumbnail?: MemoizedPromise<string> | FuturableOrLazy<string>;
  /**
   * Set the WebViewer license key for only this file. If you wish to set for
   * all files, use the static `File.setGlobalLicense` method. This local
   * license will take priority over the global license.
   */
  license?: string;
  /**
   * A reference to the document that was used to create this File class. Used as an optimization
   * where applicable. If passed, 'pageIndex' must also be passed
   */
  fullDocumentObj?: CoreControls.Document;
  /**
   * Used in conjunction with 'fullDocumentObj'. Represents the pageIndex of 'fullDocumentObj' that this
   * file belongs too
   */
  pageIndex?: number;
}

export interface FileLike {
  id: string;
  name: string;
  originalName: string;
  extension: string;
  thumbnail: MemoizedPromise<string>;
  fileObj: MemoizedPromise<Blob>;
  documentObj: MemoizedPromise<CoreControls.Document>;
  subscribe: (...args: any) => () => void;
  fullDocumentObj?: CoreControls.Document;
  pageIndex?: number;
}

export type FileEventType =
  /** Triggered when the documentObj is updated. */
  | 'onrotate'
  /** Triggered when the documentObj is updated. */
  | 'ondocumentobjchange'
  /** Triggered when the fileObj is updated. */
  | 'onfileobjchange'
  /** Triggered when the thumbnail is updated. */
  | 'onthumbnailchange'
  /** Triggered when the name is updated. */
  | 'onnamechange'
  /** Triggered when the thumbnail is frozen. */
  | 'onfreezethumbnail'
  /** Triggered when the thumbnail is unfrozen. */
  | 'onunfreezethumbnail'
  /** Change is always fired after every other event, unless stopPropagation was called. */
  | 'onchange';

export type FileEventListener = () => void;

export type FileEventListenersObj = Partial<{ [type in FileEventType]: FileEventListener[] }>;

/** A representation of the data within a file. */
export class File implements FileLike {
  private _id: string;
  private _name: string;
  private _originalName: string;
  private _extension: string;
  private _fileObj: MemoizedPromise<Blob>;
  private _documentObj: MemoizedPromise<CoreControls.Document>;
  private _thumbnail: MemoizedPromise<string>;
  private _freezeThumbnail: boolean;
  private _subscribers: FileEventListenersObj;
  private _license?: string;
  private _fullDocumentObj?: CoreControls.Document;
  private _pageIndex?: number;

  /**
   * Initialize the `File`.
   * @param fileDetails The file details object or file-like class to initialize
   * this `File` with.
   */
  constructor(fileDetails: FileDetails) {
    const {
      name,
      id,
      originalName,
      extension,
      fileObj,
      documentObj,
      thumbnail,
      license,
      fullDocumentObj,
      pageIndex,
    } = fileDetails;

    if (!fileObj && !documentObj) {
      throw new Error('One of `fileObj` or `documentObj` is required to initialize File.');
    }

    if (fullDocumentObj) {
      if (typeof pageIndex !== 'number') {
        throw new Error('"pageIndex" must be passed if using "fullDocumentObj"');
      }
      this._fullDocumentObj = fullDocumentObj;
      this._pageIndex = pageIndex;
    }

    this._id = id || getStringId('file');
    this._name = name;
    this._originalName = originalName || name;
    this._extension = extension || getExtension(name);

    this._documentObj = new MemoizedPromise(documentObj ?? this._generateDocumentObj);
    this._fileObj = new MemoizedPromise(fileObj ?? this._generateFileObj);
    this._thumbnail = new MemoizedPromise(thumbnail ?? this._generateThumbnail);

    this._freezeThumbnail = false;

    this._subscribers = {};

    this._license = license;
  }

  /**
   * Set the license key in order to use full WebViewer features. This only
   * needs to be done once, and will be used globally by all files.
   * @param license The license key for WebViewer.
   */
  static setGlobalLicense(license: string) {
    globalLicense.set(license);
  }

  /** A unique ID generated for the file. */
  get id() {
    return this._id;
  }

  /** The original name of the file. */
  get originalName() {
    return this._originalName;
  }

  /** The extension of the file (for example `'pdf'`). */
  get extension() {
    return this._extension;
  }

  /** A memoized promise for the thumbnail. */
  get thumbnail() {
    return this._thumbnail;
  }

  /** A memoized promise for the fileObj. */
  get fileObj() {
    return this._fileObj;
  }

  /** A memoized promise for the documentObj. */
  get documentObj() {
    return this._documentObj;
  }

  /** Gets the full document object if provided during initialization. */
  get fullDocumentObj() {
    return this._fullDocumentObj;
  }

  /** Gets the page index if provided during initialization. */
  get pageIndex() {
    return this._pageIndex;
  }

  /** The name of the file. */
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    this._extension = getExtension(name);
    this.dispatchEvent('onnamechange');
  }

  /** Freeze to prevent thumbnail from changing. */
  get freezeThumbnail() {
    return this._freezeThumbnail;
  }
  set freezeThumbnail(freezeThumbnail: boolean) {
    this._freezeThumbnail = freezeThumbnail;
    if (freezeThumbnail) this.dispatchEvent('onfreezethumbnail');
    else this.dispatchEvent('onunfreezethumbnail');
  }

  /* --- Memoized promise value setters. --- */

  /**
   * Set the thumbnail or give a futurable or getter.
   * @param thumbnail The thumbnail, promise, or getter for the thumbnail.
   */
  setThumbnail(thumbnail?: FuturableOrLazy<string>) {
    if (this.freezeThumbnail) return;
    this._thumbnail = new MemoizedPromise(thumbnail ?? this._generateThumbnail);
    this.dispatchEvent('onthumbnailchange');
  }

  /**
   * Set the fileObj or give a futurable or getter.
   * @param fileObj The fileObj, promise, or getter for the fileObj.
   */
  setFileObj(fileObj?: FuturableOrLazy<Blob>) {
    this._fileObj = new MemoizedPromise(fileObj ?? this._generateFileObj);
    // Only update documentObj if fileObj was given, not generated.
    if (fileObj) this.setDocumentObj();
    this.dispatchEvent('onfileobjchange');
  }

  /**
   * Set the documentObj or give a futurable or getter.
   * @param documentObj The documentObj, promise, or getter for the documentObj.
   */
  setDocumentObj(documentObj?: FuturableOrLazy<CoreControls.Document>) {
    this._documentObj = new MemoizedPromise(documentObj ?? this._generateDocumentObj);
    // Only update fileObj if documentObj was given, not generated.
    if (documentObj) this.setFileObj();
    this.setThumbnail();
    this.dispatchEvent('ondocumentobjchange');
  }

  /**
   * Use this file to make updates to `documentObj` that you want reflected in
   * `fileObj` and `thumbnail`. Since mutations directly to `documentObj` will
   * not be detected, using this function tells `File` to trigger an update.
   */
  async updateDocumentObj(updater: (documentObj: CoreControls.Document) => Promise<void>) {
    const documentObj = await this.documentObj.get();
    await updater(documentObj);
    this.setDocumentObj(documentObj);
  }

  /* --- File utility functions. --- */

  /**
   * Rotate 90 degrees clockwise unless `counterclockwise` is true.
   * @param counterclockwise Rotate 90 degrees counterclockwise.
   */
  async rotate(counterclockwise?: boolean) {
    const rotated = await getRotatedDocument(this.documentObj.get(), counterclockwise);
    this.setDocumentObj(rotated);
    this.dispatchEvent('onrotate');
  }

  /**
   * Creates a clone of the file with a new `documentObj`. This is the
   * recommended way of duplicating files, as it will prevent them both
   * referencing the same documentObj.
   * @param overrides Override any of the `FileDetails` that initialize `File`.
   * Note that `fileObj` will be overridden by the `documentObj` in overrides,
   * or cloned from this file.
   */
  clone(overrides?: Partial<FileDetails>) {
    const { documentObj, ...rest } = overrides || {};
    return new File({
      name: this.name,
      originalName: this.originalName,
      extension: this.extension,
      ...rest,
      documentObj: documentObj || blobToDocument(documentToBlob(this.documentObj.get()), this.extension, this._license),
    });
  }

  /* --- Events. --- */

  /**
   * Appends an subscriber for events whose type attribute value is type.
   * The callback argument sets the callback that will be invoked when the event
   * is dispatched.
   * @param type The event type that will invoke the listener.
   * @param subscriber The listener function that will be invoked.
   */
  subscribe(type: FileEventType, subscriber: FileEventListener) {
    (this._subscribers[type] ?? (this._subscribers[type] = [])).push(subscriber);
    return this._unsubscribe(type, subscriber);
  }

  /**
   * Dispatch an event for this file. Once all subscribers have been called for
   * the dispatched type, it will complete by calling all onchange subscribers.
   * @param type The file event type to dispatch.
   */
  dispatchEvent(type: FileEventType) {
    this._subscribers[type]?.forEach((subscriber) => subscriber());
    if (type !== 'onchange') this.dispatchEvent('onchange');
  }

  /**
   * Removes the event listener in target's event listener list with the same
   * type and callback.
   * @param type The event type that the listener is registered for.
   * @param subscriber The listener to remove.
   */
  private _unsubscribe(type: FileEventType, subscriber: FileEventListener) {
    return () => (this._subscribers[type] = this._subscribers[type]?.filter((l) => l !== subscriber));
  }

  /* --- Private helpers. --- */

  /** Generate a thumbnail from document object. */
  private _generateThumbnail = () => {
    return getThumbnail(this.fullDocumentObj || this.documentObj.get(), {
      extension: this.extension,
      pageIndex: this.pageIndex,
    });
  };

  /** Generate a file object from document object. */
  private _generateFileObj = () => {
    return documentToBlob(this.documentObj.get());
  };

  /** Generate a document object from file object and extension. */
  private _generateDocumentObj = () => {
    return blobToDocument(this.fileObj.get(), this.extension, this._license);
  };
}
