import { Futurable } from '../data/futurable';

async function getThumbnail(documentObj: Futurable<CoreControls.Document>) {
  const fetchedDocument = await documentObj;
  const canvas: HTMLCanvasElement = await new Promise(resolve => {
    const pageWidth = fetchedDocument.getPageInfo(0).width;
    const zoom = 250 / pageWidth;
    fetchedDocument.loadCanvasAsync({ pageIndex: 0, drawComplete: resolve, zoom });
    fetchedDocument.loadThumbnailAsync(0, resolve);
  });

  return canvas.toDataURL();
}

export default getThumbnail;
