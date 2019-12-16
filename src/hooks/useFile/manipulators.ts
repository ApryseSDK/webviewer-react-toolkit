import { File } from './types';

export function rotateFile(file: File) {
  const coreControls = window.CoreControls;
  if (!coreControls) return;
  file.mutateDocumentObj(documentObj => {
    // Make array of each page number.
    const pageNumbers = Array.from({ length: documentObj.getPageCount() }, (_v, index) => index + 1);
    documentObj.rotatePages(pageNumbers, coreControls.PageRotation.e_90);
    return documentObj;
  });
}
