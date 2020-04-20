import { Futurable } from '../data';
import { THUMBNAIL_WIDTH } from './constantUtils';

/**
 * Convert a CoreControls Document into a Blob.
 * @param documentObj A CoreControls Document, or promise to get it.
 */
export async function documentToBlob(documentObj: Futurable<CoreControls.Document>): Promise<Blob> {
  const fetchedDocument = await documentObj;
  const data = await fetchedDocument.getFileData();
  const arr = new Uint8Array(data);
  return new Blob([arr], { type: 'application/pdf' });
}

/**
 * Convert a Blob and extension into a CoreControls Document.
 * @param blob A Blob, or promise to get it.
 * @param extension The file extension of the provided Blob.
 */
export async function blobToDocument(blob: Futurable<Blob>, extension: string): Promise<CoreControls.Document> {
  // @ts-ignore no typing for `l` method.
  const l = window.WebViewer?.l?.();
  const coreControls = window.CoreControls;
  const fetchedBlob = await blob;
  return await coreControls.createDocument(fetchedBlob, { extension, l });
}

/**
 * Rotate a document 90 degrees.
 * @param documentObj A CoreControls Document, or promise to get it.
 * @param counterclockwise If provided, will rotate counterclockwise instead of
 * the default clockwise.
 */
export async function getRotatedDocument(
  documentObj: Futurable<CoreControls.Document>,
  counterclockwise?: boolean,
): Promise<CoreControls.Document> {
  const coreControls = window.CoreControls;
  const fetchedDocument = await documentObj;

  const pageNumbers = Array.from({ length: fetchedDocument.getPageCount() }, (_, k) => k + 1);

  const rotation = counterclockwise ? coreControls.PageRotation.e_270 : coreControls.PageRotation.e_90;

  await fetchedDocument.rotatePages(pageNumbers, rotation);
  return fetchedDocument;
}

/**
 * Gets the thumbnail for a document.
 * @param documentObj A CoreControls Document, or promise to get it.
 */
export async function getThumbnail(documentObj: Futurable<CoreControls.Document>): Promise<string> {
  const fetchedDocument = await documentObj;
  const canvas: HTMLCanvasElement = await new Promise(resolve => {
    const pageWidth = fetchedDocument.getPageInfo(0).width;
    const zoom = THUMBNAIL_WIDTH / pageWidth;
    fetchedDocument.loadCanvasAsync({ pageIndex: 0, drawComplete: resolve, zoom });
    fetchedDocument.loadThumbnailAsync(0, resolve);
  });

  return canvas.toDataURL();
}
