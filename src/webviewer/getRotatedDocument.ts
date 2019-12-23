import { FuturableOrLazy, futureableOrLazyToFuturable } from '../data/futurable';

async function getRotatedDocument(documentObj: FuturableOrLazy<CoreControls.Document>) {
  const coreControls = window.CoreControls;
  const fetchedDocument = await futureableOrLazyToFuturable(documentObj);

  const pageNumbers = Array.from({ length: fetchedDocument.getPageCount() }, (_v, k) => k + 1);

  await fetchedDocument.rotatePages(pageNumbers, coreControls.PageRotation.e_90);
  return fetchedDocument;
}

export default getRotatedDocument;
