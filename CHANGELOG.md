# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.1.0-beta.7](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0-beta.6...v0.1.0-beta.7) (2020-02-13)

### ⚠ BREAKING CHANGES

- **padding:** padding-half renamed to padding-small, padding-small renamed to padding-medium
- **breakpoints:** media queries do not work with CSS variables, so created new Sass file for breakpoints, and removed breakpoints from mixins file

### Features

- **FocusTrap:** added FocusTrap and useFocusTrap hook ([b691590](https://github.com/PDFTron/webviewer-react-toolkit/commit/b691590c3dc1a885eff81798ff66ce01932c6a41))
- **Toast:** added the Toast visual component ([b7b5eb0](https://github.com/PDFTron/webviewer-react-toolkit/commit/b7b5eb090f1f0323de2736ef0cdb5d401b65f328))
- **ToastProvider:** added toast provider to access toast management ([1452669](https://github.com/PDFTron/webviewer-react-toolkit/commit/1452669447f85c48a8ace9b50ae492c94e248fdd))
- **useToast:** added hook for accessing adding and removal of toasts ([34b7e5d](https://github.com/PDFTron/webviewer-react-toolkit/commit/34b7e5d1b60bccaaf266d929e6b43a87fb9830ec))

### Bug Fixes

- **Button:** now works with svg icon children ([2c40b9d](https://github.com/PDFTron/webviewer-react-toolkit/commit/2c40b9d5dc0a78ca7b51bf0d3290c8fe887828c0))

### Styles

- **breakpoints:** moved breakpoints to own file, removed CSS variables ([39b1c4c](https://github.com/PDFTron/webviewer-react-toolkit/commit/39b1c4ce0d69003e76b8536cf180078917f8fe9c))
- **font:** made webkit font smoothing auto instead of antialiased ([0b2dca7](https://github.com/PDFTron/webviewer-react-toolkit/commit/0b2dca7c2537ab872351e398330c27a9d09c9b7d))
- **padding:** renamed paddings to be more obvious as to size ([bef4c39](https://github.com/PDFTron/webviewer-react-toolkit/commit/bef4c3949b5a200f0460c45accd16dc5a13192b5))
- **Spinner:** references new spinner mixin for animation ([477cdc1](https://github.com/PDFTron/webviewer-react-toolkit/commit/477cdc1cf990cc7d7499ca9f6041d52e4c9478fa))

## [0.1.0-beta.6](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0-beta.5...v0.1.0-beta.6) (2020-02-10)

### Refactors

- **Overlay:** correct memoization of props to avoid rerenders ([6e2879c](https://github.com/PDFTron/webviewer-react-toolkit/commit/6e2879cf82f4832e332c5d24fb487e28bce612ce))

## [0.1.0-beta.5](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0-beta.4...v0.1.0-beta.5) (2020-02-10)

### ⚠ BREAKING CHANGES

- **css:** renamed tablet-lower-boundary to breakpoint-tablet, and desktop-lower-boundary to breakpoint-desktop

### Features

- **Overlay:** created component ([946772c](https://github.com/PDFTron/webviewer-react-toolkit/commit/946772c606f8b21c4fbb5dfc539074cee6c23c35))

### Bug Fixes

- **css:** breakpoints renamed to breakpoint-\<device\> ([e0aeafc](https://github.com/PDFTron/webviewer-react-toolkit/commit/e0aeafc72f5a34e74dea764e63c039f231026908))

### Styles

- **mixins:** use CSS variables in mixins instead of Sass variables ([4fbe555](https://github.com/PDFTron/webviewer-react-toolkit/commit/4fbe555dbb5f62b615dc89773b96516b31804f4d))

## [0.1.0-beta.4](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0-beta.3...v0.1.0-beta.4) (2020-02-06)

### ⚠ BREAKING CHANGES

- sass and css are now in `/dist/scss` and `/dist/css` respectively (moved from `/lib/`)

### Build and Dependencies

- building sass and css into dist directory ([3a32dfc](https://github.com/PDFTron/webviewer-react-toolkit/commit/3a32dfc625ef2a9eb7b34612ae688b79553f3ff9))
- added esm build process and added tslib dependency ([161e2b1](https://github.com/PDFTron/webviewer-react-toolkit/commit/161e2b174a2b4ed57ea9075a70023eb492b31e90))

## [0.1.0-beta.3](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0-beta.2...v0.1.0-beta.3) (2020-02-05)

### ⚠ BREAKING CHANGES

- renamed white color variables to contrast since they are no longer white when dark theme is enabled

### Bug Fixes

- **FileOrganizer:** fix to spacing issue with non-virtualized items ([804aa66](https://github.com/PDFTron/webviewer-react-toolkit/commit/804aa6698efd1cf25af39c36d5e307bc1b184515)), closes [#1](https://github.com/PDFTron/webviewer-react-toolkit/issues/1)

### Styles

- implemented dark theme across all components and docs ([5e075cb](https://github.com/PDFTron/webviewer-react-toolkit/commit/5e075cb6aae66dcddc95933f8f9631644e52eefb))

## [0.1.0-beta.2](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0-beta.1...v0.1.0-beta.2) (2020-02-03)

### Documentation

- fixed uneven titles across docs ([caf01ce](https://github.com/PDFTron/webviewer-react-toolkit/commit/caf01ce6e8edf17c011ee65544124511a90c7000))

## 0.1.0-beta.1 (2020-02-01)

### Build and Dependencies

- **release:** Initial public release ([ca2f892](https://github.com/PDFTron/webviewer-react-toolkit/commit/ca2f8929b3c015cb0d979c7dd540180dca1a8e51))
