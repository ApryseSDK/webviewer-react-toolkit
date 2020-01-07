import { Futurable } from '../data/futurable';

async function getRotatedDocument(documentObj: Futurable<CoreControls.Document>, counterclockwise?: boolean) {
  const coreControls = window.CoreControls;
  const fetchedDocument = await documentObj;

  const pageNumbers = Array.from({ length: fetchedDocument.getPageCount() }, (_v, k) => k + 1);

  const rotation = counterclockwise ? coreControls.PageRotation.e_270 : coreControls.PageRotation.e_90;

  await fetchedDocument.rotatePages(pageNumbers, rotation);
  return fetchedDocument;
}

export default getRotatedDocument;
