import { Futurable, Include } from '../../utils/typeUtils';
import { File } from './useFile';

export type DocumentObjMutator = (document: CoreControls.Document) => Futurable<CoreControls.Document>;
export type FileObjMutator = (document: Blob) => Futurable<Blob>;

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
