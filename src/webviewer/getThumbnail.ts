async function getThumbnail(document: CoreControls.Document) {
  const canvas: HTMLCanvasElement = await new Promise(resolve => {
    const pageWidth = document.getPageInfo(0).width;

    const zoom = 250 / pageWidth;

    document.loadCanvasAsync({ pageIndex: 0, drawComplete: resolve, zoom });

    // @ts-ignore (TODO: fix types)
    document.loadThumbnailAsync(0, resolve);
  });

  return canvas.toDataURL();
}

export default getThumbnail;
