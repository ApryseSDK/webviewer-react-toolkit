import { useCallback, useEffect, useMemo, useState } from 'react';
import { File } from '../data/file';
import { FileEventType } from '../data/fileEvent';

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
 * @param onFailed A callback which is fired whenever async fetching of a value fails.
 */
function useFile(inputFile: File): FileHook {
  const [file, _setFile] = useState({ file: inputFile });
  const setFile = useCallback(async () => _setFile({ file: inputFile }), [inputFile]);

  const [thumbnail, _setThumbnail] = useState<string>();
  const setThumbnail = useCallback(async () => _setThumbnail(await inputFile.getThumbnail()), [inputFile]);

  const [fileObj, _setFileObj] = useState<Blob>();
  const setFileObj = useCallback(async () => _setFileObj(await inputFile.getFileObj()), [inputFile]);

  const [documentObj, _setDocumentObj] = useState<CoreControls.Document>();
  const setDocumentObj = useCallback(async () => _setDocumentObj(await inputFile.getDocumentObj()), [inputFile]);

  useEffect(() => {
    setFile();
    setThumbnail();
    setFileObj();
    setDocumentObj();

    inputFile.addEventListener(FileEventType.Change, setFile);
    inputFile.addEventListener(FileEventType.ThumbnailChange, setThumbnail);
    inputFile.addEventListener(FileEventType.FileObjChange, setFileObj);
    inputFile.addEventListener(FileEventType.DocumentObjChange, setDocumentObj);
    return () => {
      inputFile.removeEventListener(FileEventType.Change, setFile);
      inputFile.removeEventListener(FileEventType.ThumbnailChange, setThumbnail);
      inputFile.removeEventListener(FileEventType.FileObjChange, setFileObj);
      inputFile.removeEventListener(FileEventType.DocumentObjChange, setDocumentObj);
    };
  }, [inputFile, setFile, setThumbnail, setFileObj, setDocumentObj]);

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
