import { File } from '../../hooks/useFile';
import testPdfThumbnailRotated from '../images/pdf-preview-2.png';
import testPdfThumbnail from '../images/pdf-preview.png';

/* eslint-disable @typescript-eslint/no-empty-function */

export function createFile(index: number, pending = false): File {
  return {
    id: `file_${index + 1}`,
    name: `file_${index + 1}`,
    extension: 'pdf',
    originalName: `file_${index + 1}`,
    thumbnail: pending ? undefined : index % 2 ? testPdfThumbnailRotated : testPdfThumbnail,
    mutateDocumentObj: () => {},
    mutateFileObj: () => {},
    setDocumentObj: async () => {},
    setFileObj: async () => {},
    setName: async () => {},
  };
}
