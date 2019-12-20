import { useCallback, useEffect, useMemo, useState } from 'react';
import { File } from '../data/file';
import { FileEventType } from '../data/fileEvent';
import useThrottle from './useThrottle';

/** The output of this hook is an object representing a file. */
interface FileHook {
  file: File;

  id: File['id'];
  name: File['name'];
  originalName: File['originalName'];
  extension: File['extension'];

  thumbnail?: string;
  fileObj?: Blob;
  documentObj?: CoreControls.Document;
}

/**
 * This hook converts a file class with async values into a React-friendly hook
 * with async values set to undefined until they are fetched.
 * @param fileDetails The file details object, or function returning file details.
 * @param throttleTimeout If given, will throttle all async calls.
 */
function useFile(inputFile: File, throttleTimeout?: number): FileHook {
  const [file, _setFile] = useState({ file: inputFile });
  const setFile = useCallback(async () => _setFile({ file: inputFile }), [inputFile]);
  const setFileThrottle = useThrottle(setFile, throttleTimeout);

  const [thumbnail, _setThumbnail] = useState<string>();
  const setThumbnail = useCallback(async () => _setThumbnail(await inputFile.getThumbnail()), [inputFile]);
  const setThumbnailThrottle = useThrottle(setThumbnail, throttleTimeout);

  const [fileObj, _setFileObj] = useState<Blob>();
  const setFileObj = useCallback(async () => _setFileObj(await inputFile.getFileObj()), [inputFile]);
  const setFileObjThrottle = useThrottle(setFileObj, throttleTimeout);

  const [documentObj, _setDocumentObj] = useState<CoreControls.Document>();
  const setDocumentObj = useCallback(async () => _setDocumentObj(await inputFile.getDocumentObj()), [inputFile]);
  const setDocumentObjThrottle = useThrottle(setDocumentObj, throttleTimeout);

  useEffect(() => {
    const setFileToUse = throttleTimeout ? setFileThrottle : setFile;
    const setThumbnailToUse = throttleTimeout ? setThumbnailThrottle : setThumbnail;
    const setFileObjToUse = throttleTimeout ? setFileObjThrottle : setFileObj;
    const setDocumentObjToUse = throttleTimeout ? setDocumentObjThrottle : setDocumentObj;

    setFileToUse();
    setThumbnailToUse();
    setFileObjToUse();
    setDocumentObjToUse();

    inputFile.addEventListener(FileEventType.Change, setFileToUse);
    inputFile.addEventListener(FileEventType.ThumbnailChange, setThumbnailToUse);
    inputFile.addEventListener(FileEventType.FileObjChange, setFileObjToUse);
    inputFile.addEventListener(FileEventType.DocumentObjChange, setDocumentObjToUse);
    return () => {
      inputFile.removeEventListener(FileEventType.Change, setFileToUse);
      inputFile.removeEventListener(FileEventType.ThumbnailChange, setThumbnailToUse);
      inputFile.removeEventListener(FileEventType.FileObjChange, setFileObjToUse);
      inputFile.removeEventListener(FileEventType.DocumentObjChange, setDocumentObjToUse);
    };
  }, [
    inputFile,
    setFile,
    setThumbnail,
    setFileObj,
    setDocumentObj,
    throttleTimeout,
    setFileThrottle,
    setThumbnailThrottle,
    setFileObjThrottle,
    setDocumentObjThrottle,
  ]);

  const fileHook = useMemo<FileHook>(() => {
    const f = file.file;
    return {
      file: f,

      id: f.id,
      name: f.name,
      originalName: f.originalName,
      extension: f.extension,

      thumbnail,
      fileObj,
      documentObj,
    };
  }, [documentObj, file, fileObj, thumbnail]);

  return fileHook;
}

export default useFile;
