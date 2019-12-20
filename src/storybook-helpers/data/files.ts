import { File } from '../../data/file';
import testPdfThumbnailRotated from '../images/pdf-preview-2.png';
import testPdfThumbnail from '../images/pdf-preview.png';

/* eslint-disable @typescript-eslint/no-empty-function */

export function createFile(index: number, pending = false) {
  return ({
    id: `file_${index + 1}`,
    name: `file_${index + 1}`,
    originalName: `file_${index + 1}`,
    extension: 'pdf',
    getThumbnail: async () => (pending ? undefined : index % 2 ? testPdfThumbnailRotated : testPdfThumbnail),
    getFileObj: async () => new Blob(),
    getDocumentObj: async () => 'Document_Object',
    rotate: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  } as unknown) as File;
}
