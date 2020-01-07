import { Futurable } from '../data/futurable';

async function blobToDocument(blob: Futurable<Blob>, extension: string) {
  const coreControls = window.CoreControls;
  const fetchedBlob = await blob;
  const documentObj: CoreControls.Document = await coreControls.createDocument(fetchedBlob, { extension });
  return documentObj;
}

export default blobToDocument;
