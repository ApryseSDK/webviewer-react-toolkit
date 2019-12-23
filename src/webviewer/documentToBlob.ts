import { FuturableOrLazy, futureableOrLazyToFuturable } from '../data/futurable';

async function documentToBlob(documentObj: FuturableOrLazy<CoreControls.Document>) {
  const fetchedDocument = await futureableOrLazyToFuturable(documentObj);
  const data = await fetchedDocument.getFileData();
  const arr = new Uint8Array(data);
  return new Blob([arr], { type: 'application/pdf' });
}

export default documentToBlob;
