import { FuturableOrGetter, futureableOrGetterToFuturable } from '../data/futurable';

async function getThumbnail(documentObj: FuturableOrGetter<CoreControls.Document>) {
  const fetchedDocument = await futureableOrGetterToFuturable(documentObj);
  const canvas: HTMLCanvasElement = await new Promise(resolve => {
    const pageWidth = fetchedDocument.getPageInfo(0).width;

    const zoom = 250 / pageWidth;

    fetchedDocument.loadCanvasAsync({ pageIndex: 0, drawComplete: resolve, zoom });

    // @ts-ignore (TODO: fix types)
    fetchedDocument.loadThumbnailAsync(0, resolve);
  });

  return canvas.toDataURL();
}

export default getThumbnail;
