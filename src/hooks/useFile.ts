import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getStringId } from '../utils/idUtils';
import { Include } from '../utils/typeUtils';

/** Object representing a file. */
export interface File {
  id: string;
  name: string;
  originalName: string;
  extension: string;
  fileObj?: Blob;
  thumbnail?: string;
  documentObj?: CoreControls.Document;
  rotate?: () => void;
}

/** The input object provided to the useFile hook. */
export interface FileDetails {
  /** File name. */
  name: string;
  /** The original name of the file */
  originalName?: string;
  /** File extension. For example, `"pdf"`. */
  extension?: string;
  /** File object, or Promise to get it. */
  fileObj?: Blob | Promise<Blob>;
  /** Thumbnail data URL string, or Promise to get it. */
  thumbnail?: string | Promise<string>;
}

/** Must return type that matches key. */
// TODO: Better typing for this.
export type FileFailed = (key: FileAsyncValueKeys, error: any) => any;

/** Can also initialize with a function to prevent expensive recalculation. */
export type FileInitializer = () => FileDetails;

type FileAsyncValueKeys = keyof Include<File, 'fileObj' | 'thumbnail' | 'documentObj'>;

type FutureDispatch = <T>(
  dispatch: Dispatch<SetStateAction<T>>,
  future: Promise<NonNullable<T>>,
  key: FileAsyncValueKeys,
) => Promise<void>;

function useFile(fileInitializer: FileDetails | FileInitializer, onFailed?: FileFailed): File {
  // We only care about initial values of initializer, and we only call onFailed
  // when there's an actual failure, so we put them in a ref to prevent updates
  // if it changes. This also allows arrow functions in useFile.
  const fileDetails = useRef(typeof fileInitializer === 'function' ? fileInitializer() : fileInitializer);
  const onFailedRef = useRef(onFailed);

  const [lastMutation, setLastMutation] = useState(new Date());

  // Constant sync values.
  const { id, name, originalName, extension } = useMemo<Pick<File, 'id' | 'name' | 'originalName' | 'extension'>>(
    () => ({
      id: getStringId('File'),
      name: fileDetails.current.name,
      originalName: fileDetails.current.originalName || fileDetails.current.name,
      // TODO: fallback function for extension.
      extension: fileDetails.current.extension || '',
    }),
    [],
  );

  // Async values.
  const [fileObj, setFileObj] = useState<File['fileObj']>();
  const [thumbnail, setThumbnail] = useState<File['thumbnail']>();
  const [documentObj, setDocumentObj] = useState<File['documentObj']>();

  // Call with a promise to set a key of file in the future.
  const futureSet = useCallback<FutureDispatch>(async (dispatch, future, key) => {
    try {
      const value = await future;
      dispatch(value);
    } catch (error) {
      if (onFailedRef.current) dispatch(onFailedRef.current(key, error));
    }
  }, []);

  // When this hook is initialized, set async values.
  useEffect(() => {
    const { fileObj: fileObjOrPromise, thumbnail: thumbnailOrPromise } = fileDetails.current;

    if (fileObjOrPromise instanceof Promise) {
      futureSet(setFileObj, fileObjOrPromise, 'fileObj');
    } else {
      // TODO: Get fileObj if undefined
      setFileObj(fileObjOrPromise || undefined);
    }

    if (thumbnailOrPromise instanceof Promise) {
      futureSet(setThumbnail, thumbnailOrPromise, 'thumbnail');
    } else {
      // TODO: Get thumbnail if undefined
      setThumbnail(thumbnailOrPromise || undefined);
    }
  }, [futureSet]);

  // Set document object based on file object and extension.
  useEffect(() => {
    if (fileObj && extension) {
      // TODO: futureSet documentObj based on these.
      setDocumentObj(undefined);
    }
  }, [fileObj, extension]);

  const rotate = useCallback(() => {
    const coreControls = window.CoreControls;
    if (!documentObj || !coreControls) return;
    const pageNumbers = Array.from({ length: documentObj.getPageCount() }, (_v, k) => k + 1);
    documentObj.rotatePages(pageNumbers, coreControls.PageRotation.e_90);
    setLastMutation(new Date());
  }, [documentObj]);

  const file = useMemo(
    () => ({
      id,
      name,
      originalName,
      extension,
      fileObj,
      thumbnail,
      documentObj,
      rotate: documentObj !== undefined ? rotate : undefined,
      lastMutation, // To force updates when documentObj is updated.
    }),
    [id, name, originalName, extension, fileObj, thumbnail, documentObj, rotate, lastMutation],
  );

  return file;
}

export default useFile;
