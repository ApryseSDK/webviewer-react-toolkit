import { getExtension } from '../utils/fileUtils';
import { getStringId } from '../utils/idUtils';
import { FuturableGetter, FuturableOrGetter } from '../utils/typeUtils';
import blobToDocument from '../webviewer/blobToDocument';
import documentToBlob from '../webviewer/documentToBlob';
import getThumbnail from '../webviewer/getThumbnail';

/** The input object provided to the File constructor. */
export interface FileDetails {
  /** File name. */
  name: string;
  /** The original name of the file */
  originalName?: string;
  /** File extension. For example, `'pdf'`. */
  extension?: string;
  /** File object, or function to get it. One of `fileObj` or `documentObj` must be given. */
  fileObj?: Blob | FuturableGetter<Blob>;
  /** Document object, or function to get it. One of `fileObj` or `documentObj` must be given. */
  documentObj?: CoreControls.Document | FuturableGetter<CoreControls.Document>;
  /** Thumbnail data URL string, or function to get it. */
  thumbnail?: string | FuturableGetter<string>;
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

  private _fileObj?: Blob | FuturableGetter<Blob>;
  private _documentObj?: CoreControls.Document | FuturableGetter<CoreControls.Document>;
  private _thumbnail?: string | FuturableGetter<string>;

  constructor(fileDetails: FileDetails) {
    this.id = getStringId('File');
    this.name = fileDetails.name;
    this.originalName = fileDetails.originalName || fileDetails.name;
    this.extension = fileDetails.extension || getExtension(fileDetails.name);

    this._thumbnail = fileDetails.thumbnail;
    this._fileObj = fileDetails.fileObj;
    this._documentObj = fileDetails.documentObj;
  }

  /**
   * The thumbnail for the file. This will remain undefined until it is fetched
   * (this may be async).
   */
  getThumbnail(): Promise<string> {
    return this._getHelper('_thumbnail', this._thumbnail, () => getThumbnail(this.getDocumentObj()));
  }

  setThumbnail(thumbnail: FuturableOrGetter<string>) {
    this._setHelper('_thumbnail', thumbnail);
  }

  /**
   * The file object blob. This will remain undefined until it is fetched (this
   * may be async). Mutations on this must **not** be done directly, but using
   * the `setFileObj` function.
   */
  getFileObj(): Promise<Blob> {
    return this._getHelper('_fileObj', this._fileObj, () => documentToBlob(this.getDocumentObj()));
  }

  setFileObj(fileObj: FuturableOrGetter<Blob>) {
    this._setHelper('_fileObj', fileObj);
  }

  /**
   * The Document object for the file. This will remain undefined until it is
   * fetched (this may be async). Mutations on this must **not** be done
   * directly, but using the `setDocumentObj` function.
   */
  getDocumentObj(): Promise<CoreControls.Document> {
    return this._getHelper('_documentObj', this._documentObj, () => blobToDocument(this.getFileObj(), this.extension));
  }

  setDocumentObj(documentObj: FuturableOrGetter<CoreControls.Document>) {
    this._setHelper('_documentObj', documentObj);
  }

  /** Gets a lazy property, and stores it if it was async retrieved. */
  protected _getHelper = async <T>(
    key: '_fileObj' | '_documentObj' | '_thumbnail',
    property: FuturableGetter<T> | T | undefined,
    fallback: FuturableGetter<T>,
  ) => {
    if (!(typeof property === 'function') && property != undefined) {
      return Promise.resolve(property);
    }
    const futureGetter = property instanceof Function ? property : fallback;
    const value = await futureGetter();
    this[key] = value as any;
    return value;
  };

  /** Sets a lazy property within the File. */
  protected _setHelper = async <T>(key: '_fileObj' | '_documentObj' | '_thumbnail', property: FuturableOrGetter<T>) => {
    if (property instanceof Promise) {
      this[key] = () => property;
    } else if (typeof property === 'function') {
      this[key] = property as any;
    } else {
      this[key] = property as any;
    }
  };
}
