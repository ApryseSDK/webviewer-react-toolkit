import { FuturableOrLazy, futureableOrLazyToFuturable } from '../data/futurable';

async function blobToDocument(blob: FuturableOrLazy<Blob>, extension: string) {
  const coreControls = window.CoreControls;
  const fetchedBlob = await futureableOrLazyToFuturable(blob);
  // @ts-ignore (TODO: fix types)
  const documentObj: CoreControls.Document = await coreControls.createDocument(fetchedBlob, { extension });
  return documentObj;
}

export default blobToDocument;
