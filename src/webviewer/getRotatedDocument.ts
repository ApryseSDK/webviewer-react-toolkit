import { FuturableOrLazy, futureableOrLazyToFuturable } from '../data/futurable';

async function getRotatedDocument(documentObj: FuturableOrLazy<CoreControls.Document>, counterclockwise?: boolean) {
  const coreControls = window.CoreControls;
  const fetchedDocument = await futureableOrLazyToFuturable(documentObj);

  const pageNumbers = Array.from({ length: fetchedDocument.getPageCount() }, (_v, k) => k + 1);

  const rotation = counterclockwise ? coreControls.PageRotation.e_270 : coreControls.PageRotation.e_90;

  await fetchedDocument.rotatePages(pageNumbers, rotation);
  return fetchedDocument;
}

export default getRotatedDocument;
