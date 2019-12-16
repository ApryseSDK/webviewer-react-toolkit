import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getExtension } from '../../utils/fileUtils';
import { getStringId } from '../../utils/idUtils';
import { Futurable } from '../../utils/typeUtils';
import blobToDocument from '../../webviewer/blobToDocument';
import documentToBlob from '../../webviewer/documentToBlob';
import getThumbnail from '../../webviewer/getThumbnail';
import {
  AsyncValuesState,
  DocumentObjMutator,
  FileDetails,
  FileFailed,
  FileInitializer,
  FileObjMutator,
  FutureSet,
} from './types';

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
   * Do any mutation on the document. If your docMutator is a promise and it
   * rejects, will not update.
   */
  mutateDocumentObj: (documentObjMutator: DocumentObjMutator) => void;
  mutateFileObj: (fileObjMutator: FileObjMutator) => void;
  setDocumentObj: (newDocumentObj: Futurable<CoreControls.Document>) => Promise<void>;
  setFileObj: (newFileObj: Futurable<Blob>) => Promise<void>;
  setName: (newName: string) => Promise<void>;
}

/**
 * This hook generates a file which will update as async pieces are fetched.
 * @param fileDetails The file details object, or function returning file details.
 * @param onFailed A callback which is fired whenever async fetching of a value fails.
 */
function useFile(_fileDetails: FileDetails | FileInitializer, _onFailed?: FileFailed, _retries = 3): File {
  // We only care about initial values of initializer, and we only call onFailed
  // when there's an actual failure, so we put them in a ref to prevent updates
  // if it changes. This also allows arrow functions for onFailed.
  const fileDetails = useRef(typeof _fileDetails === 'function' ? _fileDetails() : _fileDetails);
  const onFailed = useRef(_onFailed);
  const retries = useRef(_retries);

  const id = useMemo(() => getStringId('File'), []);

  // Sync values.
  const [syncValues, setSyncValues] = useState<Pick<File, 'name' | 'originalName' | 'extension'>>(() => ({
    name: fileDetails.current.name,
    originalName: fileDetails.current.originalName || fileDetails.current.name,
    extension: fileDetails.current.extension || getExtension(fileDetails.current.name),
  }));

  // Async values. These are objects so that things can detect when they change.
  const [asyncValues, setAsyncValues] = useState<AsyncValuesState>({
    documentObj: { value: undefined },
    fileObj: { value: undefined },
    thumbnail: { value: undefined },
  });

  // Call with a promise to set a key of file in the future. Will set the key to
  // undefined while waiting for the future to complete.
  const futureSet = useCallback<FutureSet>(async (key, future, tries = retries.current) => {
    setAsyncValues(prev => ({ ...prev, [key]: undefined }));
    if (future === undefined) return;
    try {
      const value = await future;
      setAsyncValues(prev => ({ ...prev, [key]: { value } }));
    } catch (error) {
      if (onFailed.current) futureSet(key, onFailed.current(key, error), tries - 1);
    }
  }, []);

  /* --- Effects. --- */

  // Set file and document objects.
  useEffect(() => {
    const { fileObj, documentObj } = fileDetails.current;

    // Throw error if one of file or document not given.
    if (!fileObj && !documentObj) throw new TypeError('One of fileObj or documentObj is required');

    // Set fileObj, or use documentObj to set it.
    if (fileObj) {
      futureSet('fileObj', fileObj);
    } else if (documentObj) {
      futureSet('fileObj', documentToBlob(documentObj));
    }

    // Set documentObj, or use fileObj and extension to set it.
    if (documentObj) {
      futureSet('documentObj', documentObj);
    } else if (fileObj) {
      futureSet('documentObj', blobToDocument(fileObj, syncValues.extension));
    }
  }, [futureSet, syncValues.extension]);

  // Set thumbnail whenever documentObj changes.
  useEffect(() => {
    if (asyncValues.documentObj.value) {
      futureSet('thumbnail', getThumbnail(asyncValues.documentObj.value));
    }
  }, [asyncValues.documentObj, futureSet]);

  /* --- Mutators. --- */

  const mutateDocumentObj = useCallback<File['mutateDocumentObj']>(
    async documentObjHandler => {
      const documentObj = asyncValues.documentObj.value;
      if (!documentObj) return;
      futureSet('documentObj', documentObjHandler(documentObj));
    },
    [asyncValues.documentObj, futureSet],
  );

  const mutateFileObj = useCallback<File['mutateFileObj']>(
    async fileObjHandler => {
      const fileObj = asyncValues.fileObj.value;
      if (!fileObj) return;
      futureSet('fileObj', fileObjHandler(fileObj));
    },
    [asyncValues.fileObj, futureSet],
  );

  const setDocumentObj = useCallback<File['setDocumentObj']>(
    async newDocumentObj => {
      futureSet('documentObj', newDocumentObj);
    },
    [futureSet],
  );

  const setFileObj = useCallback<File['setFileObj']>(
    async newFileObj => {
      futureSet('fileObj', newFileObj);
    },
    [futureSet],
  );

  const setName = useCallback<File['setName']>(async newName => {
    setSyncValues(prev => ({ ...prev, name: newName }));
  }, []);

  const file = useMemo(
    () => ({
      id,
      ...syncValues,
      thumbnail: asyncValues.thumbnail.value,
      fileObj: asyncValues.fileObj.value,
      documentObj: asyncValues.documentObj.value,
      mutateDocumentObj,
      mutateFileObj,
      setDocumentObj,
      setFileObj,
      setName,
    }),
    [id, syncValues, asyncValues, mutateDocumentObj, mutateFileObj, setDocumentObj, setFileObj, setName],
  );

  return file;
}

export default useFile;
