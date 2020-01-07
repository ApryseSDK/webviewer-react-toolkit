import { Futurable } from '../data/futurable';

async function documentToBlob(documentObj: Futurable<CoreControls.Document>) {
  const fetchedDocument = await documentObj;
  const data = await fetchedDocument.getFileData();
  const arr = new Uint8Array(data);
  return new Blob([arr], { type: 'application/pdf' });
}

export default documentToBlob;
