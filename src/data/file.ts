import { RequireAtLeastOne } from '../types';
import { blobToDocument, documentToBlob, getExtension, getRotatedDocument, getStringId, getThumbnail } from '../utils';
import { FileEvent, FileEventListener, FileEventListenersObj, FileEventType } from './fileEvent';
import { FuturableOrLazy } from './futurable';
import { MemoizedPromise } from './memoizedPromise';

interface FileDetailsBase {
  /** File name. */
  name: string;
  /** The original name of the file */
  originalName?: string;
  /** File extension. For example, `'pdf'`. */
  extension?: string;
  /** File object, or function to get it. One of `fileObj` or `documentObj` must be given. */
  fileObj?: MemoizedPromise<Blob> | FuturableOrLazy<Blob>;
  /** Document object, or function to get it. One of `fileObj` or `documentObj` must be given. */
  documentObj?: MemoizedPromise<CoreControls.Document> | FuturableOrLazy<CoreControls.Document>;
  /** Thumbnail data URL string, or function to get it. */
  thumbnail?: MemoizedPromise<string> | FuturableOrLazy<string>;
}

/** The input object provided to the File constructor. */
export type FileDetails = RequireAtLeastOne<FileDetailsBase, 'fileObj' | 'documentObj'>;

export interface FileLike {
  id: string;
  name: string;
  originalName: string;
  extension: string;
  thumbnail: MemoizedPromise<string>;
  fileObj: MemoizedPromise<Blob>;
  documentObj: MemoizedPromise<CoreControls.Document>;
  addEventListener: Function;
  removeEventListener: Function;
}

/** A representation of the data within a file. */
export class File implements FileLike {
  private _id: string;
  private _name: string;
  private _originalName: string;
  private _extension: string;
  private _fileObj: MemoizedPromise<Blob>;
  private _documentObj: MemoizedPromise<CoreControls.Document>;
  private _thumbnail: MemoizedPromise<string>;
  private _eventListeners: FileEventListenersObj;

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

    this._eventListeners = {};
  }

  /** The name of the file. */
  get name() {
    return this._name;
  }
  set name(name: string) {
    this.dispatchEvent('onnamechange', () => {
      this._name = name;
    });
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

  /* --- Memoized promise value setters. --- */

  /**
   * Set the thumbnail or give a futurable or getter.
   * @param thumbnail The thumbnail, promise, or getter for the thumbnail.
   */
  setThumbnail(thumbnail?: FuturableOrLazy<string>) {
    this.dispatchEvent('onthumbnailchange', () => {
      this._thumbnail = new MemoizedPromise(thumbnail ?? this._generateThumbnail);
    });
  }

  /**
   * Set the fileObj or give a futurable or getter.
   * @param fileObj The fileObj, promise, or getter for the fileObj.
   */
  setFileObj(fileObj?: FuturableOrLazy<Blob>) {
    this.dispatchEvent('onfileobjchange', () => {
      this._fileObj = new MemoizedPromise(fileObj ?? this._generateFileObj);
      // Only update documentObj if fileObj was given, not generated.
      if (fileObj) this.setDocumentObj();
    });
  }

  /**
   * Set the documentObj or give a futurable or getter.
   * @param documentObj The documentObj, promise, or getter for the documentObj.
   * @param stopPropagation Prevent updates to _fileObj and thumbnail.
   */
  setDocumentObj(documentObj?: FuturableOrLazy<CoreControls.Document>) {
    this.dispatchEvent('ondocumentobjchange', () => {
      this._documentObj = new MemoizedPromise(documentObj ?? this._generateDocumentObj);
      // Only update fileObj if documentObj was given, not generated.
      if (documentObj) this.setFileObj();
      this.setThumbnail();
    });
  }

  /* --- File utility functions. --- */

  /**
   * Rotate 90 degrees clockwise unless `counterclockwise` is true.
   * @param counterclockwise Rotate 90 degrees counterclockwise.
   */
  rotate(counterclockwise?: boolean) {
    this.dispatchEvent('onrotate', () => {
      this.setDocumentObj(getRotatedDocument(this.documentObj.get(), counterclockwise));
    });
  }

  /* --- Events. --- */

  /**
   * Appends an event listener for events whose type attribute value is type.
   * The callback argument sets the callback that will be invoked when the event
   * is dispatched.
   * @param type The event type that will invoke the listener.
   * @param listener The listener function that will be invoked.
   */
  addEventListener(type: FileEventType, listener: FileEventListener) {
    (this._eventListeners[type] ?? (this._eventListeners[type] = [])).push(listener);
  }

  /**
   * Removes the event listener in target's event listener list with the same
   * type and callback.
   * @param type The event type that the listener is registered for.
   * @param listener The listener to remove.
   */
  removeEventListener(type: FileEventType, listener: FileEventListener) {
    this._eventListeners[type] = this._eventListeners[type]?.filter(l => l !== listener);
  }

  /**
   * Removes all event listeners for a given type, or if no type is given, will
   * remove all event listeners across every type.
   * @param type Optional. The event type to remove all listeners from.
   */
  removeAllEventListeners(type?: FileEventType) {
    if (typeof type === 'string') {
      delete this._eventListeners[type];
    } else if (type === undefined) {
      this._eventListeners = {};
    }
  }

  /**
   * Dispatch an event for this file. The event will complete by calling the
   * event default once it has finished propagating through all the listeners.
   * @param type The file event type to dispatch.
   * @param eventDefault The default action once all event listeners are called.
   */
  dispatchEvent(type: FileEventType, eventDefault?: Function) {
    new FileEvent(type, this, { eventDefault, listeners: this._eventListeners });
  }

  /* --- Private helpers. --- */

  /** Generate a thumbnail from document object. */
  private _generateThumbnail() {
    return getThumbnail(this.documentObj.get());
  }

  /** Generate a file object from document object. */
  private _generateFileObj() {
    return documentToBlob(this.documentObj.get());
  }

  /** Generate a document object from file object and extension. */
  private _generateDocumentObj() {
    return blobToDocument(this.fileObj.get(), this.extension);
  }
}
