# 🚧 PDFTron Component Library 🚧

> This library is under heavy construction. We will update the information on
> here once it is ready to be used. In the meantime, we advise against using it
> in your project. Documentation will be out of date or absent -- changes are
> happening quickly and documentation will be updated once we are closer to
> releasing.

[View the components here!](https://xododocs.github.io/component-library)

This component library will contain various React components that integrate with
the PDFTron WebViewer API.

## Using the toolkit:

We have designed these components to look good with the
[Lato](https://fonts.google.com/specimen/Lato) font. It should work with any
font, but if you want to include Lato as the base font, you can do it like this:

```html
<style>
  @import url('https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i&display=swap');
</style>
```

## Cloning this repo:

### To spin this up:

```sh
yarn       # 1. To install dependencies (or `npm i`)
yarn peers # 2. To install peer dependencies (or `npm run peers`)
yarn start # 3. To start the Storybook environment (or `npm start`)
```

> [You must install peers separately](https://github.com/yarnpkg/yarn/issues/1503)

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
