import type { Core } from '@pdftron/webviewer';
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
 * Convert a WebViewer Core Document into a Blob.
 * @param documentObj A WebViewer Core Document, or promise to get it.
 */
export async function documentToBlob(documentObj: Futurable<Core.Document | undefined>): Promise<Blob> {
  const fetchedDocument = (await documentObj) as Core.Document;
  const data = await fetchedDocument.getFileData();
  const arr = new Uint8Array(data);
  return new Blob([arr], { type: 'application/pdf' });
}

/**
 * Convert a Blob and extension into a WebViewer Core Document.
 * @param blob A Blob, or promise to get it.
 * @param extension The file extension of the provided Blob.
 * @param l License key. If not provided, will try to use global license.
 */
export async function blobToDocument(
  blob: Futurable<Blob>,
  extension: string,
  l?: string,
): Promise<Core.Document | undefined> {
  const coreControls = window.Core;
  const fetchedBlob = await blob;
  try {
    const document = await coreControls.createDocument(fetchedBlob, { extension, l: l || globalLicense.get() });
    return document;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

/**
 * Rotate a document 90 degrees.
 * @param documentObj A WebViewer Core Document, or promise to get it.
 * @param counterclockwise If provided, will rotate counterclockwise instead of
 * the default clockwise.
 */
export async function getRotatedDocument(
  documentObj: Futurable<Core.Document | undefined>,
  counterclockwise?: boolean,
): Promise<Core.Document | undefined> {
  const coreControls = window.Core;
  if (documentObj) {
    const fetchedDocument = (await documentObj) as Core.Document;

    const pageNumbers = Array.from({ length: fetchedDocument.getPageCount() }, (_, k) => k + 1);

    const rotation = counterclockwise ? coreControls.PageRotation.E_270 : coreControls.PageRotation.E_90;

    await fetchedDocument.rotatePages(pageNumbers, rotation);
    return fetchedDocument;
  }
  return undefined;
}

type GetThumbnailOptions = {
  extension?: string;
  pageNumber?: number;
};
/**
 * Gets the thumbnail for a document.
 * @param documentObj A WebViewer Core Document, or promise to get it.
 * @param options Additional options for the function.
 */
export async function getThumbnail(
  documentObj: Futurable<Core.Document | undefined>,
  options: GetThumbnailOptions = {},
): Promise<string> {
  const { extension, pageNumber = 1 } = options;

  if (extension) {
    const supportedFiles = window.Core?.SupportedFileFormats.CLIENT;
    if (supportedFiles && !supportedFiles.includes(extension)) {
      throw new Error(`Unsupported file type. Unable to get thumbnail for file extension ${extension}`);
    }
  }

  const url = async () => {
    const fetchedDocument = (await documentObj) as Core.Document;
    const canvas: HTMLCanvasElement = await new Promise((resolve, reject) => {
      const callback = (result: HTMLCanvasElement | undefined) => {
        if (!result) return reject(result);
        resolve(result);
      };
      fetchedDocument.loadThumbnail(pageNumber, callback);
    });

    const url = canvas.toDataURL();
    if (!url) throw new Error('Unable to get data url.');
    return url;
  };

  return url();
}
