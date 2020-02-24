# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.0-beta.1](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.2.0-beta.5...v0.3.0-beta.1) (2020-02-24)

### Styles

- **Button:** opacity on internals when disabled ([21eeb27](https://github.com/PDFTron/webviewer-react-toolkit/commit/21eeb272ce35c07e3da90e931832b5b9448c4be1))
- **ButtonGroup:** can nest groups for more complex layouts ([d531544](https://github.com/PDFTron/webviewer-react-toolkit/commit/d53154466715dbb75ccf078abba9cb3b214facad))

## [0.2.0](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.2.0-beta.5...v0.2.0) (2020-02-24)

### Features

- **ToastProvider:** added noTimeout prop to persist specified types ([d783400](https://github.com/PDFTron/webviewer-react-toolkit/commit/d783400a9acb61539dc0e1327f5974b29745bce9))

### Bug Fixes

- **Overlay:** position fixed instead of absolute ([5eb0fe8](https://github.com/PDFTron/webviewer-react-toolkit/commit/5eb0fe8828e6184aaf27f24df69a1dda892d3dc7))

### Build and Dependencies

- updated tslib ([09fb887](https://github.com/PDFTron/webviewer-react-toolkit/commit/09fb887f6433ac7ecc9aea3f27c4e3251e703040))

## [0.2.0-beta.5](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.2.0-beta.4...v0.2.0-beta.5) (2020-02-24)

### Features

- **FileOrganizer:** grid size based on first item, not hard-coded ([30eada0](https://github.com/PDFTron/webviewer-react-toolkit/commit/30eada0f284af9245a3f83045d8ce5845decc4ee))
- **FileOrganizer:** multi-directional movement and focusing ([a835a48](https://github.com/PDFTron/webviewer-react-toolkit/commit/a835a48879c7e37ec532d750e50f5c6d9cb5a405))

## [0.2.0-beta.4](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.2.0-beta.3...v0.2.0-beta.4) (2020-02-21)

### ⚠ BREAKING CHANGES

- **FileOrganizer:** removed virtualizeThreshold prop since the organizer is always virtualized

### Features

- **ButtonGroup:** added prop to center buttons on mobile widths ([a3e10be](https://github.com/PDFTron/webviewer-react-toolkit/commit/a3e10becc8a8167da3da9544083a469a3495e7ca))
- **FileOrganizer:** is now always virtualized and full height ([96aa70e](https://github.com/PDFTron/webviewer-react-toolkit/commit/96aa70ea12c8e2bd82e91ec339d7d6eee10641a8)), closes [#9](https://github.com/PDFTron/webviewer-react-toolkit/issues/9)

### Bug Fixes

- **Draggable:** prevent flicker when dragging items ([d0740ad](https://github.com/PDFTron/webviewer-react-toolkit/commit/d0740ad55914ddcbb2ab8ce289555e1148943936)), closes [#6](https://github.com/PDFTron/webviewer-react-toolkit/issues/6)

## [0.2.0-beta.3](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.2.0-beta.2...v0.2.0-beta.3) (2020-02-21)

### Features

- **File:** clone accepts overrides arg to override any properties ([84a1e6c](https://github.com/PDFTron/webviewer-react-toolkit/commit/84a1e6c5c674f3f9f9afa53559aeae86a527bdd1))

## [0.2.0-beta.2](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.2.0-beta.1...v0.2.0-beta.2) (2020-02-20)

### Features

- **File:** added updateDocumentObj method for updating documentObj ([57d1760](https://github.com/PDFTron/webviewer-react-toolkit/commit/57d1760486531de4795ffdb05ac31dcc5311242a))

## [0.2.0-beta.1](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0...v0.2.0-beta.1) (2020-02-20)

### ⚠ BREAKING CHANGES

- **Thumbnail:** removed hideExtension prop, no longer necessary since Thumbnail will not display extension due to it being included in File.name

### Features

- **File:** added clone function to safely duplicate files ([2597af1](https://github.com/PDFTron/webviewer-react-toolkit/commit/2597af1e9ce59e392286c9807e67d45d29c7e14e))

### Bug Fixes

- **Thumbnail:** no longer displays extension, now included in name ([6360abd](https://github.com/PDFTron/webviewer-react-toolkit/commit/6360abd49d9e7a6ccc300f2cbb77ea2aa865fb9b))

## [0.1.0](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0-beta.8...v0.1.0) (2020-02-19)

### Refactors

- **Draggable:** prevent unnecessary onDragChange calls ([5ec004a](https://github.com/PDFTron/webviewer-react-toolkit/commit/5ec004ae62b3cc17f28f8b2b423331d4284f9bb5))

## [0.1.0-beta.8](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0-beta.7...v0.1.0-beta.8) (2020-02-19)

### ⚠ BREAKING CHANGES

- **Overlay:** removed blockClicks and darkOverlay from Overlay, will be moved into components that require these properties
- **colors:** since color-blue-gray-4 was unused, shifted every color-blue-gray over so there is no longer a color-blue-gray-7, and every color above color-blue-gray-3 has been updated

### Features

- **ButtonGroup:** added button group for easy button layout ([9457c44](https://github.com/PDFTron/webviewer-react-toolkit/commit/9457c44242e6b8a92426cf3fbccd5ae3daa194a0))
- **IconButton:** added icon button ([6fa450b](https://github.com/PDFTron/webviewer-react-toolkit/commit/6fa450be8d9242d8ce4656495bd930dec6382d7b))
- **icons:** exposed single and multi page icons ([a45e459](https://github.com/PDFTron/webviewer-react-toolkit/commit/a45e459f542f566bceb747349d3df463740eb174))
- **icons:** exposed some icons that are used internally ([0a35b58](https://github.com/PDFTron/webviewer-react-toolkit/commit/0a35b586ed437fb35cce32bae4cd479b647323ed))
- **Modal:** added focus lock to modal to ensure user can't tab out ([7b005a8](https://github.com/PDFTron/webviewer-react-toolkit/commit/7b005a8741fe423e421d5ad32320bca0b574a436))
- **Modal:** added modal component for displaying confirmations and info ([8a69e44](https://github.com/PDFTron/webviewer-react-toolkit/commit/8a69e44640e86701aeb271b39d4ed64188deefde))
- **ToastProvider:** if added toast has timeout of 0 will not timeout ([c8c4f3c](https://github.com/PDFTron/webviewer-react-toolkit/commit/c8c4f3cdee1ecf8af5a5af1ba52866117302e00f))
- **useUnmountDelay:** added hook for delayed unmounts, used in Modal ([1ef4338](https://github.com/PDFTron/webviewer-react-toolkit/commit/1ef433879b1cdac27cfad98ca8bc7602cd31fb94))

### Bug Fixes

- **Overlay:** no longer unmounts when first item removed ([52ae549](https://github.com/PDFTron/webviewer-react-toolkit/commit/52ae549d7b774b3eeea71275a98f3c82c6dc1245))

### Styles

- **colors:** removed unused color-blue-gray-4 ([89a4a5a](https://github.com/PDFTron/webviewer-react-toolkit/commit/89a4a5a65308b476c2c63bddec44523b8063df48))
- **IconButton:** added padding to make button square given square icon ([39caaca](https://github.com/PDFTron/webviewer-react-toolkit/commit/39caacad795f8794d848ddc60e7cc45fe1b31a82))

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
