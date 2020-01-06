import { useMemo } from 'react';
import { File } from '../data/file';
import { FileEventType } from '../data/fileEvent';
import useFileSubscribe from './useFileSubscribe';

/** The output of this hook is an object representing a file. */
interface FileHook {
  /** The entire file class. */
  file: File;
  /** The file id. */
  id: File['id'];
  /** The file originalName. */
  originalName: File['originalName'];
  /** The file extension. */
  extension: File['extension'];
  /** The file name. */
  name?: File['name'];
  /** The resolved file thumbnail or undefined until it is resolved. */
  thumbnail?: string;
  /** The resolved file fileObj or undefined until it is resolved. */
  fileObj?: Blob;
  /** The resolved file documentObj or undefined until it is resolved. */
  documentObj?: CoreControls.Document;
}

/**
 * This hook converts a file class with async values into a React-friendly hook
 * with async values set to undefined until they are fetched.
 * @param file The file to convert to react observable values.
 * @param throttle The timeout if unfetched memo promise.
 */
function useFile(file: File, throttle?: number): FileHook {
  const [name] = useFileSubscribe(file, f => f.name, FileEventType.NameChange, { throttle });
  const [thumbnail] = useFileSubscribe(file, f => f.thumbnail, FileEventType.ThumbnailChange, { throttle });
  const [fileObj] = useFileSubscribe(file, f => f.fileObj, FileEventType.FileObjChange, { throttle });
  const [documentObj] = useFileSubscribe(file, f => f.documentObj, FileEventType.DocumentObjChange, { throttle });

  const fileValue = useMemo<FileHook>(
    () => ({
      file,
      id: file.id,
      originalName: file.originalName,
      extension: file.extension,
      name,
      thumbnail,
      fileObj,
      documentObj,
    }),
    [file, name, documentObj, fileObj, thumbnail],
  );

  return fileValue;
}

export default useFile;