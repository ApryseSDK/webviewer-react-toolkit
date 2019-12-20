import { Include } from '../../utils/typeUtils';
import { Futurable } from '../../data/futurable';

/** The output of this hook is an object representing a file. */
export interface File {
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
  /**
   * The thumbnail for the file. This will remain undefined until it is fetched
   * (this may be async).
   */
  thumbnail?: string;
  /**
   * The file object blob. This will remain undefined until it is fetched (this
   * may be async). Mutations on this must **not** be done directly, but using
   * the `setFileObj` function.
   */
  fileObj?: Blob;
  /**
   * The Document object for the file. This will remain undefined until it is
   * fetched (this may be async). Mutations on this must **not** be done
   * directly, but using the `setDocumentObj` function.
   */
  documentObj?: CoreControls.Document;
  /**
   * Do any mutation on the document object.
   */
  mutateDocumentObj: (documentObjMutator: DocumentObjMutator) => void;
  /**
   * Do any mutations on the file object.
   */
  mutateFileObj: (fileObjMutator: FileObjMutator) => void;
  /**
   * Set the document object to a new document object.
   */
  setDocumentObj: (newDocumentObj: Futurable<CoreControls.Document>) => Promise<void>;
  /**
   * Set the file object to a new file object.
   */
  setFileObj: (newFileObj: Futurable<Blob>) => Promise<void>;
  /**
   * Set the name of the file.
   */
  setName: (newName: string) => Promise<void>;
}

type DocumentObjMutator = (document: CoreControls.Document) => Futurable<CoreControls.Document>;
type FileObjMutator = (document: Blob) => Futurable<Blob>;

/** The input object provided to the useFile hook. */
export interface FileDetails {
  /** File name. */
  name: string;
  /** The original name of the file */
  originalName?: string;
  /** File extension. For example, `'pdf'`. */
  extension?: string;
  /** File object, or Promise to get it. One of `fileObj` or `documentObj` must be given. */
  fileObj?: Blob | Promise<Blob>;
  /** Document object, or Promise to get it. One of `fileObj` or `documentObj` must be given. */
  documentObj?: CoreControls.Document | Promise<CoreControls.Document>;
  /** Thumbnail data URL string, or Promise to get it. */
  thumbnail?: string | Promise<string>;
}

/** Can also initialize with a function to prevent expensive recalculation. */
export type FileInitializer = () => FileDetails;

export type FileAsyncValue = Include<File, 'fileObj' | 'thumbnail' | 'documentObj'>;

export interface AsyncValuesState {
  fileObj: { value: File['fileObj'] };
  documentObj: { value: File['documentObj'] };
  thumbnail: { value: File['thumbnail'] };
}

/** Set a futurable value within the file hook. */
export type FutureSet = <T extends keyof FileAsyncValue>(
  key: T,
  future: Futurable<FileAsyncValue[T]>,
  tries?: number,
) => Promise<void>;

/**
 * Function given to the file hook in order to handle failures. Because this is
 * captured as a ref, any updates you make to this function will not be used in
 * the hook.
 */
export type FileFailed = <T extends keyof FileAsyncValue>(key: T, error: any) => Futurable<FileAsyncValue[T]>; // eslint-disable-line @typescript-eslint/no-explicit-any
