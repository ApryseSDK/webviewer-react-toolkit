import { Futurable } from '../data';

export const globalLicense = (() => {
  let l: string | undefined = undefined;

  return {
    set(newLicense: string) {
      l = newLicense;
    },
    get() {
      return l;
    },
  };
})();

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
 * @param l License key. If not provided, will try to use global license.
 */
export async function blobToDocument(
  blob: Futurable<Blob>,
  extension: string,
  l?: string,
): Promise<CoreControls.Document> {
  const coreControls = window.CoreControls;
  const fetchedBlob = await blob;
  return await coreControls.createDocument(fetchedBlob, { extension, l: l || globalLicense.get() });
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
 * @param extension If provided, will exit early if extension is not supported.
 */
export async function getThumbnail(documentObj: Futurable<CoreControls.Document>, extension?: string): Promise<string> {
  if (extension) {
    // TODO(types): once types are supported, remove `as unknown`
    const supportedFiles = (window.CoreControls?.SupportedFileFormats?.CLIENT as unknown) as string[] | undefined;
    if (supportedFiles && !supportedFiles.includes(extension)) throw new Error('Unsupported file type.');
  }
  const fetchedDocument = await documentObj;
  const canvas: HTMLCanvasElement = await new Promise((resolve, reject) => {
    const callback = (result: HTMLCanvasElement | undefined) => {
      if (!result) return reject();
      resolve();
    };
    fetchedDocument.loadThumbnailAsync(0, callback);
  });

  const url = canvas.toDataURL();
  if (!url) throw new Error('Unable to get data url.');

  return url;
}
