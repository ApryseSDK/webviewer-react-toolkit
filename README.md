# PDFTron Component Library

This component library will contain a number of React components that integrate
nicely with the WebViewer API.

This README is currently used for planning purposes.

## Goal

To create a set of highly customizable components that takes WebViewer documents
(and other objects), and wraps them in specific functionality.

One example might be a `<Thumbnail />` component, which takes a WebViewer
document as a prop and displays a thumbnail.

## Possible components

- `<Thumbnail />`
- `<PageOrganizer />`

## Tech stack

- Typescript
- React
- Lerna

## Tech requirements

- Components interact nicely with each other when required.
- Components are strongly typed
- IE11 and all major browser support
- Use modern tech (React hooks, etc)

## Considerations

- Different versions of WebViewer may have different APIs. We need to be able to
  account for these differences.
- UX > UI. The focus of this library should be functionality, not UI. Leave UI
  to the people using the components.

## Possible Example Usage

Example of rendering a thumbnail

```js
import Thumbnail from '@pdftron/thumbnail';

export default () => {
  return <Thumbnail document={document} width={250} />;
};
```

Example of rendering a page organizer

```js
import PageOrganizer, { usePageOrganizer } from '@pdftron/page-organizer';
import Thumbnail from '@pdftron/thumbnail';

export default () => {
  const { submit, organizer } = usePageOrganizer({
    document,
    onComplete: newDocument => {
      // do something with new document
    },
  });

  const renderThumb = page => <Thumbnail page={page} />;

  return (
    <>
      <PageOrganizer renderThumbnail={renderThumb} organizer={organizer} />
      <Button onClick={submit} />
    </>
  );
};
```
