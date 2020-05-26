import { FileLike } from '../../data/file';
import { FuturableOrLazy } from '../../data/futurable';
import { MemoizedPromise } from '../../data/memoizedPromise';
import testPdfThumbnailRotated from '../images/pdf-preview-2.png';
import testPdfThumbnail from '../images/pdf-preview.png';

export interface CreateFileOptions {
  pending?: boolean;
  lazy?: boolean;
  error?: boolean;
}

export function createFile(index: number, options: CreateFileOptions = {}) {
  return new FakeFile(index, options);
}

export class FakeFile implements FileLike {
  id: string;
  name: string;
  originalName: string;
  extension: string;
  thumbnail: MemoizedPromise<string>;
  fileObj: MemoizedPromise<Blob>;
  documentObj: MemoizedPromise<CoreControls.Document>;
  fullDocumentObj: CoreControls.Document | undefined;
  pageIndex: number | undefined;

  constructor(index: number, options: CreateFileOptions = {}) {
    this.id = `file_${index + 1}`;
    this.name = `file_${index + 1}.pdf`;
    this.originalName = `file_${index + 1}`;
    this.extension = 'pdf';
    this.thumbnail = this._getParameter(index % 2 ? testPdfThumbnailRotated : testPdfThumbnail, options);
    this.fileObj = new MemoizedPromise(new Blob());
    this.documentObj = new MemoizedPromise<CoreControls.Document>(('' as unknown) as CoreControls.Document);
  }

  private _getParameter<T>(parameter: T, options: CreateFileOptions) {
    const internals = (() => {
      if (options.pending) return async () => new Promise(() => {});
      if (options.lazy) return async () => Promise.resolve(parameter);
      if (options.error) return () => Promise.reject('Some error.');
      return parameter;
    })();
    return new MemoizedPromise(internals as FuturableOrLazy<T>);
  }

  subscribe() {
    return () => {};
  }
}
