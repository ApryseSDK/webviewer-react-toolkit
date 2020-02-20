import { blobToDocument, documentToBlob, getExtension, getRotatedDocument, getStringId, getThumbnail } from '../utils';
import { FuturableOrLazy } from './futurable';
import { MemoizedPromise } from './memoizedPromise';

export interface FileDetails {
  /**
   * The name of the file.
   */
  name: string;
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
}

export interface FileLike {
  id: string;
  name: string;
  originalName: string;
  extension: string;
  thumbnail: MemoizedPromise<string>;
  fileObj: MemoizedPromise<Blob>;
  documentObj: MemoizedPromise<CoreControls.Document>;
  subscribe: (...args: any) => Function; // eslint-disable-line @typescript-eslint/no-explicit-any
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
  private _subscribers: FileEventListenersObj;

  /**
   * Initialize the `File`.
   * @param fileDetails The file details object or file-like class to initialize
   * this `File` with.
   */
  constructor(fileDetails: FileDetails) {
    const { name, originalName, extension, fileObj, documentObj, thumbnail } = fileDetails;

    if (!fileObj && !documentObj) {
      throw new Error('One of `fileObj` or `documentObj` is required to initialize File.');
    }

    this._id = getStringId('File');
    this._name = name;
    this._originalName = originalName || name;
    this._extension = extension || getExtension(name);

    this._documentObj = new MemoizedPromise(documentObj ?? this._generateDocumentObj);
    this._fileObj = new MemoizedPromise(fileObj ?? this._generateFileObj);
    this._thumbnail = new MemoizedPromise(thumbnail ?? this._generateThumbnail);

    this._subscribers = {};
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

  /** The name of the file. */
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    this.dispatchEvent('onnamechange');
  }

  /* --- Memoized promise value setters. --- */

  /**
   * Set the thumbnail or give a futurable or getter.
   * @param thumbnail The thumbnail, promise, or getter for the thumbnail.
   */
  setThumbnail(thumbnail?: FuturableOrLazy<string>) {
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
   */
  clone() {
    return new File({
      name: this._name,
      originalName: this._originalName,
      extension: this._extension,
      documentObj: blobToDocument(documentToBlob(this._documentObj.get()), this._extension),
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
    this._subscribers[type]?.forEach(subscriber => subscriber());
    if (type !== 'onchange') this.dispatchEvent('onchange');
  }

  /**
   * Removes the event listener in target's event listener list with the same
   * type and callback.
   * @param type The event type that the listener is registered for.
   * @param subscriber The listener to remove.
   */
  private _unsubscribe(type: FileEventType, subscriber: FileEventListener) {
    return () => (this._subscribers[type] = this._subscribers[type]?.filter(l => l !== subscriber));
  }

  /* --- Private helpers. --- */

  /** Generate a thumbnail from document object. */
  private _generateThumbnail = () => {
    return getThumbnail(this.documentObj.get());
  };

  /** Generate a file object from document object. */
  private _generateFileObj = () => {
    return documentToBlob(this.documentObj.get());
  };

  /** Generate a document object from file object and extension. */
  private _generateDocumentObj = () => {
    return blobToDocument(this.fileObj.get(), this.extension);
  };
}
