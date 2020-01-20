import { Futurable } from '../data';
import { THUMBNAIL_WIDTH } from './constantUtils';

export async function documentToBlob(documentObj: Futurable<CoreControls.Document>) {
  const fetchedDocument = await documentObj;
  const data = await fetchedDocument.getFileData();
  const arr = new Uint8Array(data);
  return new Blob([arr], { type: 'application/pdf' });
}

export async function blobToDocument(blob: Futurable<Blob>, extension: string) {
  const coreControls = window.CoreControls;
  const fetchedBlob = await blob;
  const documentObj: CoreControls.Document = await coreControls.createDocument(fetchedBlob, { extension });
  return documentObj;
}

export async function getRotatedDocument(documentObj: Futurable<CoreControls.Document>, counterclockwise?: boolean) {
  const coreControls = window.CoreControls;
  const fetchedDocument = await documentObj;

  const pageNumbers = Array.from({ length: fetchedDocument.getPageCount() }, (_v, k) => k + 1);

  const rotation = counterclockwise ? coreControls.PageRotation.e_270 : coreControls.PageRotation.e_90;

  await fetchedDocument.rotatePages(pageNumbers, rotation);
  return fetchedDocument;
}

export async function getThumbnail(documentObj: Futurable<CoreControls.Document>) {
  const fetchedDocument = await documentObj;
  const canvas: HTMLCanvasElement = await new Promise(resolve => {
    const pageWidth = fetchedDocument.getPageInfo(0).width;
    const zoom = THUMBNAIL_WIDTH / pageWidth;
    fetchedDocument.loadCanvasAsync({ pageIndex: 0, drawComplete: resolve, zoom });
    fetchedDocument.loadThumbnailAsync(0, resolve);
  });

  return canvas.toDataURL();
}
