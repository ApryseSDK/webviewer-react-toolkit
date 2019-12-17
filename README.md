# 🚧 PDFTron Component Library 🚧

> This library is under heavy construction. We will update the information on
> here once it is ready to be used. In the meantime, we advise against using it
> in your project. Documentation will be out of date or absent -- changes are
> happening quickly and documentation will be updated once we are closer to
> releasing.

[View the components here!](https://xododocs.github.io/component-library)

This component library will contain various React components that integrate with
the PDFTron WebViewer API.

## Quick guide

### To spin this up:

```sh
yarn       # 1. To install dependencies (or `npm i`)
yarn start # 2. To start the Storybook environment (or `npm start`)
```

### To test:

```sh
yarn test         # Single test run (or `npm test`)
yarn test --watch # Watch for changes (or `npm test -- --watch`)
```

### To lint:

```sh
yarn lint # Lint for errors (or `npm lint`)
```

## Goal

To create a set of highly customizable components that take WebViewer documents
(and other objects), and wrap them in specific functionality.

One example might be a `<Thumbnail />` component, which takes a WebViewer
document as a prop and displays a thumbnail.

## Possible components

- `<Thumbnail />`
- `<FileOrganizer />`

## Tech stack

- Typescript
- React

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
import Thumbnail from '@pdftron/component-library/Thumbnail';

export default () => {
  return <Thumbnail document={document} width={250} />;
};
```

Example of rendering a page organizer

```js
import FileOrganizer, {
  useFileOrganizer,
} from '@pdftron/component-library/FileOrganizer';
import Thumbnail from '@pdftron/component-library/Thumbnail';

export default () => {
  const { submit, organizer } = useFileOrganizer({
    document,
    onComplete: newDocument => {
      // do something with new document
    },
  });

  const renderThumb = page => <Thumbnail page={page} />;

  return (
    <>
      <FileOrganizer renderThumbnail={renderThumb} organizer={organizer} />
      <Button onClick={submit} />
    </>
  );
};
```
