import { Futurable } from '../utils/typeUtils';

async function blobToDocument(blob: Futurable<Blob>, extension: string) {
  const coreControls = window.CoreControls;
  const fetchedBlob = await blob;
  // @ts-ignore (TODO: fix types)
  const documentObj: CoreControls.Document = await coreControls.createDocument(fetchedBlob, { extension });
  return documentObj;
}

export default blobToDocument;
