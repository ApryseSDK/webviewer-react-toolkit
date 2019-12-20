import { getExtension } from '../utils/fileUtils';
import { getStringId } from '../utils/idUtils';
import blobToDocument from '../webviewer/blobToDocument';
import documentToBlob from '../webviewer/documentToBlob';
import getThumbnail from '../webviewer/getThumbnail';
import { FileEvent, FileEventListener, FileEventType } from './fileEvent';
import { FuturableOrGetter, futureableOrGetterToFuturable } from './futurable';

/** The input object provided to the File constructor. */
export interface FileDetails {
  /** File name. */
  name: string;
  /** The original name of the file */
  originalName?: string;
  /** File extension. For example, `'pdf'`. */
  extension?: string;
  /** File object, or function to get it. One of `fileObj` or `documentObj` must be given. */
  fileObj?: FuturableOrGetter<Blob>;
  /** Document object, or function to get it. One of `fileObj` or `documentObj` must be given. */
  documentObj?: FuturableOrGetter<CoreControls.Document>;
  /** Thumbnail data URL string, or function to get it. */
  thumbnail?: FuturableOrGetter<string>;
}

export class File {
  /**
   * A unique ID generated for the file.
   */
  id: string;
  /**
   * The name of the file.
   */
  name: string;
  /**
   * The original name of the file (will fallback to the name if not provided
   * during initialization).
   */
  originalName: string;
  /**
   * The extension of the file (for example `'pdf'`).
   */
  extension: string;

  private _fileObj: FuturableOrGetter<Blob>;
  private _documentObj: FuturableOrGetter<CoreControls.Document>;
  private _thumbnail: FuturableOrGetter<string>;
  private _eventListeners: Partial<{ [type in FileEventType]: FileEventListener[] }>;

  constructor({ name, originalName, extension, fileObj, documentObj, thumbnail }: FileDetails) {
    if (!fileObj && !documentObj) throw new Error('One of `fileObj` or `documentObj` is required');

    this.id = getStringId('File');
    this.name = name;
    this.originalName = originalName || name;
    this.extension = extension || getExtension(name);

    this._documentObj = documentObj ?? this._generateDocumentObj;
    this._fileObj = fileObj ?? this._generateFileObj;
    this._thumbnail = thumbnail ?? this._generateThumbnail;

    this._eventListeners = {};
  }

  /**
   * Get a promise for the thumbnail.
   */
  async getThumbnail(): Promise<string> {
    return futureableOrGetterToFuturable(this._thumbnail);
  }

  /**
   * Set the thumbnail or give a futurable or getter.
   * @param thumbnail The thumbnail, promise, or getter for the thumbnail.
   */
  setThumbnail(thumbnail?: FuturableOrGetter<string>) {
    this._thumbnail = thumbnail ?? this._generateThumbnail;
  }

  /**
   * Get a promise for the fileObj.
   */
  async getFileObj(): Promise<Blob> {
    return futureableOrGetterToFuturable(this._fileObj);
  }

  /**
   * Set the fileObj or give a futurable or getter.
   * @param fileObj The fileObj, promise, or getter for the fileObj.
   */
  setFileObj(fileObj?: FuturableOrGetter<Blob>) {
    this._fileObj = fileObj ?? this._generateFileObj;
  }

  /**
   * Get a promise for the documentObj.
   */
  async getDocumentObj(): Promise<CoreControls.Document> {
    return futureableOrGetterToFuturable(this._documentObj);
  }

  /**
   * Set the documentObj or give a futurable or getter.
   * @param documentObj The documentObj, promise, or getter for the documentObj.
   */
  setDocumentObj(documentObj?: FuturableOrGetter<CoreControls.Document>) {
    this._documentObj = documentObj ?? this._generateDocumentObj;
  }

  addEventListener(type: FileEventType, listener: FileEventListener) {
    const eventListeners = this._eventListeners[type] ?? (this._eventListeners[type] = []);
    if (!eventListeners.includes(listener)) eventListeners.push(listener);
  }

  removeEventListener(type: FileEventType, listener: FileEventListener) {
    const eventListeners = this._eventListeners[type];
    if (!eventListeners) return;
    const index = eventListeners.indexOf(listener);
    if (index > -1) eventListeners.splice(index, 1);
  }

  private _dispatchEvent(type: FileEventType) {
    const fileEvent = new FileEvent(type, this);

    const eventListeners = this._eventListeners[fileEvent.type] ?? [];

    for (let index = 0; index < eventListeners.length; index++) {
      if (!fileEvent.bubbles) break;
      const listener = eventListeners[index];
      listener(fileEvent);
    }

    if (fileEvent.defaultPrevented) return;
    const eventDefault = this._getEventDefaultByType(fileEvent.type);
    eventDefault?.();
  }

  private _generateThumbnail() {
    return getThumbnail(this.getDocumentObj);
  }

  private _generateFileObj() {
    return documentToBlob(this.getDocumentObj);
  }

  private _generateDocumentObj() {
    return blobToDocument(this.getFileObj, this.extension);
  }

  private _getEventDefaultByType(type: FileEventType): Function | null {
    if (type === 'rotate') {
      return () => {
        //
      };
    }
    return null;
  }
}
