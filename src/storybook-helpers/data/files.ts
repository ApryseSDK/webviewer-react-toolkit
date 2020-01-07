import { File } from '../../data/file';
import { MemoizedPromise } from '../../data/memoizedPromise';
import testPdfThumbnailRotated from '../images/pdf-preview-2.png';
import testPdfThumbnail from '../images/pdf-preview.png';

/* eslint-disable @typescript-eslint/no-empty-function */

export interface CreateFileOptions {
  pending?: boolean;
  lazy?: boolean;
}

export function createFile(index: number, options: CreateFileOptions = {}) {
  const getParameter = <T>(parameter: T) => {
    const internals = (() => {
      if (options.pending) return async () => new Promise(() => {});
      if (options.lazy) return async () => parameter;
      return parameter;
    })();
    return new MemoizedPromise(internals);
  };

  return ({
    id: `file_${index + 1}`,
    name: `file_${index + 1}`,
    originalName: `file_${index + 1}`,
    extension: 'pdf',
    thumbnail: getParameter(index % 2 ? testPdfThumbnailRotated : testPdfThumbnail),
    fileObj: {},
    documentObj: {},
    rotate: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  } as unknown) as File;
}
