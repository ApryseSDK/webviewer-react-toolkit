import { useCallback, useEffect, useMemo, useState } from 'react';
import { File } from '../data/file';
import { FileEvent, FileEventType } from '../data/fileEvent';

/** The output of this hook is an object representing a file. */
interface FileHook {
  id: File['id'];
  name: File['name'];
  originalName: File['originalName'];
  extension: File['extension'];
  getThumbnail: File['getThumbnail'];
  setThumbnail: File['setThumbnail'];
  getFileObj: File['getFileObj'];
  setFileObj: File['setFileObj'];
  getDocumentObj: File['getDocumentObj'];
  setDocumentObj: File['setDocumentObj'];
  rotate: File['rotate'];
  addEventListener: File['addEventListener'];
  removeEventListener: File['removeEventListener'];
  removeAllEventListeners: File['removeAllEventListeners'];
}

/**
 * This hook generates a file which will update as async pieces are fetched.
 * @param fileDetails The file details object, or function returning file details.
 * @param onFailed A callback which is fired whenever async fetching of a value fails.
 */
function useFile(file: File): FileHook {
  const [fileClass, setFileClass] = useState({ file });

  const changeListener = useCallback((event: FileEvent) => {
    // Set the file class to the same file (event.target), but inside new object
    // to trigger the refresh.
    setFileClass({ file: event.target });
  }, []);

  useEffect(() => {
    setFileClass({ file });
    file.addEventListener(FileEventType.Change, changeListener);
    return () => {
      file.removeEventListener(FileEventType.Change, changeListener);
    };
  }, [changeListener, file]);

  const fileHook = useMemo<FileHook>(() => {
    const f = fileClass.file;
    return {
      id: f.id,
      name: f.name,
      originalName: f.originalName,
      extension: f.extension,
      getThumbnail: f.getThumbnail,
      setThumbnail: f.setThumbnail,
      getFileObj: f.getFileObj,
      setFileObj: f.setFileObj,
      getDocumentObj: f.getDocumentObj,
      setDocumentObj: f.setDocumentObj,
      rotate: f.rotate,
      addEventListener: f.addEventListener,
      removeEventListener: f.removeEventListener,
      removeAllEventListeners: f.removeAllEventListeners,
    };
  }, [fileClass]);

  return fileHook;
}

export default useFile;
