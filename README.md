# WebViewer React Toolkit

The WebViewer React Toolkit is a React component library contains various
components that integrate with the
[PDFTron WebViewer API](https://www.pdftron.com/documentation/web/).

Check out the [documentation](https://pdftron.github.io/webviewer-react-toolkit)
to get started with the toolkit!

For a demo showcasing some of the functionality, along with step-by-step
instructions on how to build it, check out the
[demo repository](https://github.com/PDFTron/webviewer-react-toolkit-demo).

> Note: file functionality within toolkit v7 and above requires WebViewer v7 or
> higher. If you are on a previous version of WebViewer, you can use v0.6.0 of
> the toolkit:
>
> ```sh
> # Yarn
> yarn add @pdftron/webviewer-react-toolkit@0.6.0
>
> # npm
> npm install @pdftron/webviewer-react-toolkit@0.6.0
> ```

## Installation

You can install the toolkit from npm using your preferred package manager:

```bash
# Yarn
yarn add @pdftron/webviewer-react-toolkit

# npm
npm install @pdftron/webviewer-react-toolkit
```

## Using the toolkit

Check the [introduction](https://pdftron.github.io/webviewer-react-toolkit) for
information on using the toolkit.

## Contributing

> Warning: There are issues building with versions of Node >=11. For now, use
> [nvm](https://github.com/nvm-sh/nvm) to get latest node 10 version (works fine
> with `v10.23.3`).

### To start up Storybook

```bash
yarn       # 1. To install dependencies (or `npm i`)
yarn start # 2. To start the Storybook environment (or `npm start`)
```

### To test

```bash
yarn test         # Single test run (or `npm test`)
yarn test --watch # Watch for changes (or `npm test -- --watch`)
```

### To lint

```bash
yarn lint # Lint for errors (or `npm lint`)
```

## Goal

To create a set of highly customizable components that take WebViewer documents
(and other objects), and wrap them in specific functionality.
