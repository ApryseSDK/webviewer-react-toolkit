import { FuturableOrGetter, futureableOrGetterToFuturable } from '../data/futurable';

async function blobToDocument(blob: FuturableOrGetter<Blob>, extension: string) {
  const coreControls = window.CoreControls;
  const fetchedBlob = await futureableOrGetterToFuturable(blob);
  // @ts-ignore (TODO: fix types)
  const documentObj: CoreControls.Document = await coreControls.createDocument(fetchedBlob, { extension });
  return documentObj;
}

export default blobToDocument;
