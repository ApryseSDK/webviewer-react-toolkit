import { File } from './types';

export function rotateFile(file: File) {
  const coreControls = window.CoreControls;
  if (!coreControls) return;
  file.mutateDocumentObj(documentObj => {
    const pageNumbers = Array.from({ length: documentObj.getPageCount() }, (_v, k) => k + 1);
    documentObj.rotatePages(pageNumbers, coreControls.PageRotation.e_90);
    return documentObj;
  });
}
