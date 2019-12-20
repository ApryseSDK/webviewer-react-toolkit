import { FuturableOrLazy, futureableOrGetterToFuturable } from '../data/futurable';

async function documentToBlob(documentObj: FuturableOrLazy<CoreControls.Document>) {
  const fetchedDocument = await futureableOrGetterToFuturable(documentObj);
  const data = await fetchedDocument.getFileData();
  const arr = new Uint8Array(data);
  return new Blob([arr], { type: 'application/pdf' });
}

export default documentToBlob;
