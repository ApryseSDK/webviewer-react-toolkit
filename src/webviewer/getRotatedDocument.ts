import { FuturableOrGetter, futureableOrGetterToFuturable } from '../data/futurable';

async function getRotatedDocument(documentObj: FuturableOrGetter<CoreControls.Document>) {
  const coreControls = window.CoreControls;
  const fetchedDocument = await futureableOrGetterToFuturable(documentObj);

  const pageNumbers = Array.from({ length: fetchedDocument.getPageCount() }, (_v, k) => k + 1);

  await fetchedDocument.rotatePages(pageNumbers, coreControls.PageRotation.e_90);
  return fetchedDocument;
}

export default getRotatedDocument;
