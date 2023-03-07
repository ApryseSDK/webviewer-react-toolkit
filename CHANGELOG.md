# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.7.11](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.10...v0.7.11) (2023-03-07)

### [0.7.10](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.9...v0.7.10) (2023-03-06)

### [0.7.9](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.8...v0.7.9) (2023-03-06)

### [0.7.8](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.5...v0.7.8) (2023-03-06)

### [0.7.7](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.5...v0.7.7) (2023-03-06)

### [0.7.6](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.5...v0.7.6) (2023-03-06)

### [0.7.5](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.4...v0.7.5) (2021-10-20)

### [0.7.4](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.3...v0.7.4) (2021-10-13)

### [0.7.3](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.2...v0.7.3) (2021-10-07)

### [0.7.2](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.1...v0.7.2) (2021-04-01)

### Features

- make dnd provider optional ([252a64c](https://github.com/PDFTron/webviewer-react-toolkit/commit/252a64ca09292753b821cfd5639658cf489c0ab2))

### [0.7.1](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.7.0...v0.7.1) (2021-01-29)

### Features

- **Choice:** redesign of choice including disabled state and spacing ([2cd10e9](https://github.com/PDFTron/webviewer-react-toolkit/commit/2cd10e9a5994af5c60e820ed295e801103c1621f))

## [0.7.0](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.6.0...v0.7.0) (2020-12-04)

> Note: file functionality within toolkit v7 and above requires WebViewer v7 or higher. If you are on a previous version of WebViewer, you can use v0.6.0 of the toolkit:
>
> ```sh
> # Yarn
> yarn add @pdftron/webviewer-react-toolkit@0.6.0
>
> # npm
> npm install @pdftron/webviewer-react-toolkit@0.6.0
> ```

### ⚠ BREAKING CHANGES

- **file:** file now takes pageNumber instead of pageIndex, since WebViewer API has changed in version 7 to take 1-indexed page number values
- **WebViewer:** due to breaking changes in WebViewer v7, the toolkit will no longer work with previous version of WebViewer

### Features

- **file:** pageNumber prop replaces pageIndex to match WebViewer API ([216b588](https://github.com/PDFTron/webviewer-react-toolkit/commit/216b58811656e0b98a1d0d00463f721f09c8c8d7))
- **FileOrganizer:** thumbnailSize prop, fixed thumbnail auto size check ([9c3d65b](https://github.com/PDFTron/webviewer-react-toolkit/commit/9c3d65bcf303d50f8ec0b936b4a6108fe2bda1f8))

### Bug Fixes

- **FileOrganizer:** fixed bug that skipped setting thumbnail size ([c25d758](https://github.com/PDFTron/webviewer-react-toolkit/commit/c25d758a74f918ccf274089ad8608bb6050c1030))
- **useFileSubscribe:** correct typing of hook output ([953a352](https://github.com/PDFTron/webviewer-react-toolkit/commit/953a352550d561763b69ac891e88b373269f541c))

### Build and Dependencies

- **WebViewer:** peer dependency on version >=7 of WebViewer ([28450e6](https://github.com/PDFTron/webviewer-react-toolkit/commit/28450e6c670896e8e26310ba0c51ca699293c282))

## [0.6.0](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.5.0...v0.6.0) (2020-06-26)

### ⚠ BREAKING CHANGES

- **Thumbnail:** removed throttle and isShownOnLoad props as they are no longer required due to ability to cancel position in global queue

### Features

- **Choice:** added center prop to vertically center the choice ([2c6af08](https://github.com/PDFTron/webviewer-react-toolkit/commit/2c6af085bae0e63aeb46aad8165f3910bbbdb4a4))
- **FileOrganizer:** added gridRef prop to allow access to react-window grid ([77c0c0e](https://github.com/PDFTron/webviewer-react-toolkit/commit/77c0c0efcf9eae723547a5995b5c998c37e21011))
- **Thumbnail:** if label is empty string and no onRename given, hide thumbnail label ([04b791e](https://github.com/PDFTron/webviewer-react-toolkit/commit/04b791ea935afb82c0a6a9c6f793fb5fd182de07))
- **Toast:** added loading toast ([95364f5](https://github.com/PDFTron/webviewer-react-toolkit/commit/95364f5be0f3a244637f70e1b31d05d647cf5fdd))
- **ToastProvider:** added modify toast and exists methods ([f04731f](https://github.com/PDFTron/webviewer-react-toolkit/commit/f04731f1845cc506c1b5deb72dc20d89a541f6c0))
- **ToastProvider:** new props to control position of toast ([190c642](https://github.com/PDFTron/webviewer-react-toolkit/commit/190c642a228721e3d8404b1682f2f072cec155b9))

### Bug Fixes

- **Button:** restored broken padding on small button ([f03b079](https://github.com/PDFTron/webviewer-react-toolkit/commit/f03b0792e6394e260837e78088586e6eddb0792d))
- **ToastProvider:** using refs to keep exists query up to date ([b10d04e](https://github.com/PDFTron/webviewer-react-toolkit/commit/b10d04e82cecf017d1ef1e1b1bc3ad116e8018c6))

### Refactors

- **useFocusTrap:** reduced loop iterations when finding focus index ([1fd5232](https://github.com/PDFTron/webviewer-react-toolkit/commit/1fd5232ca34061e73d4b9cad0aa865a2196be5b6))
- **Thumbnail:** queue for expensive file operations ([3eb2e55](https://github.com/PDFTron/webviewer-react-toolkit/commit/3eb2e55d8c72c2cf9a0d936f0ded3569719b7546))
- **Thumbnail:** fewer file value subscriptions ([a148935](https://github.com/PDFTron/webviewer-react-toolkit/commit/a148935c593ced4652e5b20284a5ea47b8cfff4d))

### Build and Dependencies

- **dependencies:** updated project dependencies ([d30a518](https://github.com/PDFTron/webviewer-react-toolkit/commit/d30a5187aba5460caa9001a23d1cb173acf55d94))
- **Draggable:** updated react-dnd-multi-backend ([5921815](https://github.com/PDFTron/webviewer-react-toolkit/commit/59218158141460ae9394b276475c1e826fb73b80))

## [0.5.0](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.4.1...v0.5.0) (2020-04-29)

### ⚠ BREAKING CHANGES

- **useFileSubscribe:** removed options and replaced with optional throttle
- **useManagedFiles:** removed selectWithoutShift option, added preventMultiSelect option, shift no longer multi selects, instead it range selects multiple files, while pressing command or control will allow adding multiple single files to the selection

### Features

- **Choice:** added props to make choice a switch and move label to left ([1b51df0](https://github.com/PDFTron/webviewer-react-toolkit/commit/1b51df05e4c94bc0291581bf27b0119a2e9bc090))
- **file:** can add license key to enable full file functionality ([517f605](https://github.com/PDFTron/webviewer-react-toolkit/commit/517f605ff6b7a74a143c3d546814c26b7dd3996e))
- **file:** can provide optional id during instantiation ([50094df](https://github.com/PDFTron/webviewer-react-toolkit/commit/50094dfcb79746c2492bed59f087cb7dc534645e))
- **file:** generate thumbnail exits early if file type is not supported ([6963e18](https://github.com/PDFTron/webviewer-react-toolkit/commit/6963e188d1c39db62a77fc7c119657c4de146852))
- **file:** improved methods for setting global or local license ([94d827a](https://github.com/PDFTron/webviewer-react-toolkit/commit/94d827af4ce10a6cadb5ffb0d515a0aa10bc15fb))
- **FilePlaceholder:** added file placeholder component ([fe5e028](https://github.com/PDFTron/webviewer-react-toolkit/commit/fe5e028d4ea4e32fedd9f567234a2290e03d5b26))
- **Image:** added pending prop to manually set loading state to true ([83a1261](https://github.com/PDFTron/webviewer-react-toolkit/commit/83a126167035ccaa515396617d8fc752b70fc17a))
- **Image:** can handle rejected or falsy src with onRenderFallback ([0e3cec5](https://github.com/PDFTron/webviewer-react-toolkit/commit/0e3cec5ddfebe58f1cf17db261f570fda7ee79ea))
- **Modal:** added noUnmount prop to disable modal unmount when closed ([313341d](https://github.com/PDFTron/webviewer-react-toolkit/commit/313341d8b5f4195fe15e59ced2e33b378ebcb2c2))
- **Modal:** added wrapperClassName prop ([9f1348d](https://github.com/PDFTron/webviewer-react-toolkit/commit/9f1348dc1cf7281e6587d9945792fdd47cb5e6e4))
- **Modal:** fullWidth prop removes max width ([82c3ab3](https://github.com/PDFTron/webviewer-react-toolkit/commit/82c3ab3c6d8ec815a1448a9e7c175c5bbeecf158))
- **Modal:** header is now optional ([c48b234](https://github.com/PDFTron/webviewer-react-toolkit/commit/c48b234c69dc7afd57ce47b1a6d67022458ec039))
- **Thumbnail:** consume errors from useFile for image loading ([f093aea](https://github.com/PDFTron/webviewer-react-toolkit/commit/f093aea31df9952071f7dc172bff812d030ee620))
- **Thumbnail:** white background color on thumbnail image ([fbb8366](https://github.com/PDFTron/webviewer-react-toolkit/commit/fbb83669c254f30ba0e080a54949d35629965af9))
- **useFile:** added errors to useFile output ([67a77af](https://github.com/PDFTron/webviewer-react-toolkit/commit/67a77afa25e02b3daf85b032f1ec63d4366d2233))
- **useManagedFiles:** easyMultiSelect option ([f272fbe](https://github.com/PDFTron/webviewer-react-toolkit/commit/f272fbe2bbf43bf24afcbe7da5b49a1d4f23a58b))
- **useManagedFiles:** shift for range select, meta or ctrl for multi ([b8e7775](https://github.com/PDFTron/webviewer-react-toolkit/commit/b8e7775dd670ba6005076881bc746569ae3a6c1f))

### Bug Fixes

- **getThumbnail:** fixed empty resolve bug ([21da478](https://github.com/PDFTron/webviewer-react-toolkit/commit/21da478d5ff5560f9c670bc7e552b01d620b05a7))
- **getThumbnail:** removed unnecessary operations ([bf4c9df](https://github.com/PDFTron/webviewer-react-toolkit/commit/bf4c9dfb4eb8628dace35c92626ca8776324e140))
- **Modal:** click on modal no longer closes if background click enabled ([340b871](https://github.com/PDFTron/webviewer-react-toolkit/commit/340b871d216e395f3f0a7c57ce9aafa5e59bbfad))
- **Modal:** fixed focus lock logic ([43bfc3a](https://github.com/PDFTron/webviewer-react-toolkit/commit/43bfc3a987924a274fc35d71dc19a5d446ba2f9d))
- **Modal:** if noUnmount is true use visibility instead of display none ([bf4b04c](https://github.com/PDFTron/webviewer-react-toolkit/commit/bf4b04c808763b4d9d015c801f4078610f62306e))
- **Modal:** removed width auto above mobile ([a673f2c](https://github.com/PDFTron/webviewer-react-toolkit/commit/a673f2c9c7ce869b8959a57953fb2a34c3b8690c))
- **Thumbnail:** focus now appears on arrow nav as well as tabbing ([70efd90](https://github.com/PDFTron/webviewer-react-toolkit/commit/70efd9044a2a7fb751182f8dc9dd89f13a35ac06))
- **Thumbnail:** prevent image drag from interfering with file dragging ([53dfa12](https://github.com/PDFTron/webviewer-react-toolkit/commit/53dfa129682279a2d4b213d08ee6b915d369f055))
- **useFileSubscribe:** value getter ref to prevent infinite looping ([276a9bf](https://github.com/PDFTron/webviewer-react-toolkit/commit/276a9bfc55e8dff24597072bc6684272e965f6f2))
- **useFocusTrap:** fix infinite loop while server-side rendering ([77681c3](https://github.com/PDFTron/webviewer-react-toolkit/commit/77681c3c4c53c5c24be75a962b0f8d6e8e7efbe1))

## [0.4.1](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.3.2...v0.4.1) (2020-04-09)

### ⚠ BREAKING CHANGES

- **Image:** can no longer manually specify image loading, can now use native loading prop to mark an image for lazy loading
- **Image:** no longer accepts classes prop, image and loading placeholder are no longer wrapped by a div

### Features

- **file:** freezeThumbnail prevents thumbnail updates ([0cf27e7](https://github.com/PDFTron/webviewer-react-toolkit/commit/0cf27e776bdd9700f5fc7f42b0d848c639604fcd))
- **FilePicker:** created file picker component ([1d317de](https://github.com/PDFTron/webviewer-react-toolkit/commit/1d317de402e1da66704d180f690adb8a08d2b71e))
- **icons:** added download icon ([3bc32a7](https://github.com/PDFTron/webviewer-react-toolkit/commit/3bc32a724915ea33e6b7f7b4855f0f2df71abe72))
- **icons:** added menu icon ([71f3183](https://github.com/PDFTron/webviewer-react-toolkit/commit/71f31835c5256fa70c42e526936091e4631e06a0))
- **Image:** simplify image component ([7db5cf5](https://github.com/PDFTron/webviewer-react-toolkit/commit/7db5cf5a4f614583e0593bc8248999baf42b6046))
- **Input:** added leftElement and updated search example ([d0e0d60](https://github.com/PDFTron/webviewer-react-toolkit/commit/d0e0d60587549269e087cd815d65a7b2414f674a))
- **Input:** correct color and alignment of icons ([da5356b](https://github.com/PDFTron/webviewer-react-toolkit/commit/da5356bb4939a3250ae15a3427a57fd904a42e51))
- **Thumbnail:** always show toolbuttons on mobile ([a4f96a0](https://github.com/PDFTron/webviewer-react-toolkit/commit/a4f96a080ac24b0c8e7a621130864b28d8b839b6))
- **Thumbnail:** image class name prop ([26aeca3](https://github.com/PDFTron/webviewer-react-toolkit/commit/26aeca3b2c89f29c883367a8839faf2082a1bcc9))
- **Thumbnail:** only show focus state when using keyboard navigation ([420a156](https://github.com/PDFTron/webviewer-react-toolkit/commit/420a156c02b47001ef3a70a2f509594db73fcb96))
- **ThumbnailSkeleton:** skeleton loader for thumbnail ([0f994f3](https://github.com/PDFTron/webviewer-react-toolkit/commit/0f994f36bcfe4907293115a46c3b0ec25acf12e2))

### Bug Fixes

- **file:** parse extension from set name ([b37a1f7](https://github.com/PDFTron/webviewer-react-toolkit/commit/b37a1f7ca9d464afec70f8776413980177b89cd2))
- **Image:** removed loading prop as it clashed with image loading prop ([2cc917c](https://github.com/PDFTron/webviewer-react-toolkit/commit/2cc917c2d1014d9af28e2d1e0b2bbcb62b499c66))
- **Overlay:** check for document to prevent serverside errors ([e421805](https://github.com/PDFTron/webviewer-react-toolkit/commit/e4218059ac76ab878f11bcccb580299f1c8aedd4))
- **Overlay:** do not generate overlay if window does not exist ([742939f](https://github.com/PDFTron/webviewer-react-toolkit/commit/742939ff49e86f5f5cb3e7aa8b020715524f84dd))

### Styles

- **EditableText:** prevent letter cut off ([a54ee71](https://github.com/PDFTron/webviewer-react-toolkit/commit/a54ee711ab11649d2c2fc959e3253de0df171442))
- **FilePicker:** trim long file names ([1e99fc9](https://github.com/PDFTron/webviewer-react-toolkit/commit/1e99fc974bf84c834085a5ad3424285b7c6afdb2))

### Build and Dependencies

- **compiler:** compile to es5 rather than es2015 ([73fef01](https://github.com/PDFTron/webviewer-react-toolkit/commit/73fef015c3fda810337ba630b0305bf7a5767b9e))

### [0.3.2](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.3.1...v0.3.2) (2020-03-11)

### Features

- **Choice:** choice component for radio buttons or checkboxes ([124bcb1](https://github.com/PDFTron/webviewer-react-toolkit/commit/124bcb10877cb846f48d99d5d921b361dd17c8ed))
- **icons:** added Check and Circle icons ([8f81fba](https://github.com/PDFTron/webviewer-react-toolkit/commit/8f81fba3e0237d3b8e464cecc40f8ff982105cb5))
- **Input:** narrowed possible input types ([5885568](https://github.com/PDFTron/webviewer-react-toolkit/commit/5885568c1741f7a54dfe99b9b5e0daa913dda62f))
- **Label:** optional text for label ([71341c0](https://github.com/PDFTron/webviewer-react-toolkit/commit/71341c016d5b82018a794598dde4015734340842))
- **useID:** new hook to generate IDs if not given ([a5775a6](https://github.com/PDFTron/webviewer-react-toolkit/commit/a5775a6fd84967c8c974643bbeb892cb8b311924))

### Styles

- **colors:** lightened font secondary in light theme ([0a73451](https://github.com/PDFTron/webviewer-react-toolkit/commit/0a7345169cb1a6e820659d6a4728003d473f8117))

### [0.3.1](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.3.0...v0.3.1) (2020-03-09)

### Features

- **Label:** added a generic form field label ([88d3d3f](https://github.com/PDFTron/webviewer-react-toolkit/commit/88d3d3f4e6dd3e1823c542b366a3ffbab5fadfc8))

## [0.3.0](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.2.1...v0.3.0) (2020-03-04)

### ⚠ BREAKING CHANGES

- **Toast:** prop toastType renamed to message, as it will now be used across multiple components

### Features

- **a11y:** added aria-labels to close buttons of modal and toast ([fab395f](https://github.com/PDFTron/webviewer-react-toolkit/commit/fab395fcdba1e40c22cd46021ce1c4a7c7df46a5))
- **Icon:** added icon component for using included or custom icons ([741b6e5](https://github.com/PDFTron/webviewer-react-toolkit/commit/741b6e58e811db91ca7e75427b5161d155026bc1))
- **icons:** added ChevronDown and RotateRight icons ([af137c6](https://github.com/PDFTron/webviewer-react-toolkit/commit/af137c65ee3f9131e934a0c102d8bb68302e756d))
- **icons:** added Hide, Show and Search icons ([4cf10f5](https://github.com/PDFTron/webviewer-react-toolkit/commit/4cf10f5143e83c422f5fe734dbb6787c7b709c20))
- **Input:** added input component ([394a7be](https://github.com/PDFTron/webviewer-react-toolkit/commit/394a7beb3eaedc42188820a1b2f7a41cfd1e8f2d))
- **Input:** rightElement prop for adding custom right element ([9f441b1](https://github.com/PDFTron/webviewer-react-toolkit/commit/9f441b1bb368c9ecb91aea9684e8c26240b36202))
- **Toast:** renamed toastType prop to message ([238630f](https://github.com/PDFTron/webviewer-react-toolkit/commit/238630fbf31e868c964cad3bc36b92a44ad1c424))
- **ToolButton:** added expandProps for expandable menu button ([a65a7e3](https://github.com/PDFTron/webviewer-react-toolkit/commit/a65a7e3ebf57e7528a69ed25e3c78592c79bab23))

### Bug Fixes

- **Button:** fix font color icon buttons ([a04522e](https://github.com/PDFTron/webviewer-react-toolkit/commit/a04522e788cc90f132b5c5366be49e40679af1e0))
- **Icon:** display inline for icon ([2a67871](https://github.com/PDFTron/webviewer-react-toolkit/commit/2a67871917eddd8cead4c386aef5487b2921a29c))
- **Thumbnail:** fixed issue with keys not registering on tool buttons ([e24afb5](https://github.com/PDFTron/webviewer-react-toolkit/commit/e24afb52ecc8f03f6ff9874355a4e617a095944e))
- **useAccessibleFocus:** remove all listeners when no subscribers ([3ab273f](https://github.com/PDFTron/webviewer-react-toolkit/commit/3ab273f8edbb30a3d55626b8572fa8ed477d07e9))

### Styles

- **colors:** added focus shadows for message colors ([fc9eaa2](https://github.com/PDFTron/webviewer-react-toolkit/commit/fc9eaa2e60d15530e44fb204dffbabc7dec31f63))
- **Icon:** flex center items within icon ([df5c160](https://github.com/PDFTron/webviewer-react-toolkit/commit/df5c160044935767b0fcf0da2d0d7840f4cefdb7))

### Refactors

- **id:** switched to sequential ID generation ([65eb0b3](https://github.com/PDFTron/webviewer-react-toolkit/commit/65eb0b3aeb3308198cc1c643d925c8f4b18ce676))
- **useAccessibleFocus:** simplify observable class ([03c648d](https://github.com/PDFTron/webviewer-react-toolkit/commit/03c648d0104c82275abb2c030abad0877ddd4cb4))

### [0.2.1](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.2.0...v0.2.1) (2020-02-26)

### Features

- **Modal:** improved accessibility on modal ([9613ba7](https://github.com/PDFTron/webviewer-react-toolkit/commit/9613ba76db40067fb31cc6e48850ad8a82257121))
- **Toast:** improved accessibility on toast ([cf0e696](https://github.com/PDFTron/webviewer-react-toolkit/commit/cf0e696f524ae353e6cb5c01345c92a45cf0611a))

### Bug Fixes

- **Button:** no longer shows hover or active style when disabled ([43f8895](https://github.com/PDFTron/webviewer-react-toolkit/commit/43f8895d0c1a83d21774716d53d760b563f62bc6))
- **ToastProvider:** cancel close timeout on unmount ([ab9dcd9](https://github.com/PDFTron/webviewer-react-toolkit/commit/ab9dcd987a59dfeef3814cb0b215adac6152c7d9))
- **ToastProvider:** remove pointer events on toast wrapper ([e802738](https://github.com/PDFTron/webviewer-react-toolkit/commit/e8027380e8051934f2766c3650aeb40b22680940))

### Styles

- **Button:** opacity on internals when disabled ([21eeb27](https://github.com/PDFTron/webviewer-react-toolkit/commit/21eeb272ce35c07e3da90e931832b5b9448c4be1))
- **ButtonGroup:** can nest groups for more complex layouts ([d531544](https://github.com/PDFTron/webviewer-react-toolkit/commit/d53154466715dbb75ccf078abba9cb3b214facad))
- **font:** added Tahoma as backup font, made font-family a variable ([3d1756b](https://github.com/PDFTron/webviewer-react-toolkit/commit/3d1756b5b3c0b3aa777230849e7a2b949facea1d))
- **mixins:** added padding-bottom mixin ([704fb11](https://github.com/PDFTron/webviewer-react-toolkit/commit/704fb116b5ade3c1030d103a6d6d8c31041eeb80))
- **Modal:** allow scrolling modal if height is greater than screen ([1f508e1](https://github.com/PDFTron/webviewer-react-toolkit/commit/1f508e1322666cd83ae2c1629764900c25ce4436))

## [0.2.0](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0...v0.2.0) (2020-02-24)

### ⚠ BREAKING CHANGES

- **FileOrganizer:** removed virtualizeThreshold prop since the organizer is always virtualized
- **Thumbnail:** removed hideExtension prop, no longer necessary since Thumbnail will not display extension due to it being included in File.name

### Features

- **ButtonGroup:** added prop to center buttons on mobile widths ([a3e10be](https://github.com/PDFTron/webviewer-react-toolkit/commit/a3e10becc8a8167da3da9544083a469a3495e7ca))
- **File:** added clone function to safely duplicate files ([2597af1](https://github.com/PDFTron/webviewer-react-toolkit/commit/2597af1e9ce59e392286c9807e67d45d29c7e14e))
- **File:** added updateDocumentObj method for updating documentObj ([57d1760](https://github.com/PDFTron/webviewer-react-toolkit/commit/57d1760486531de4795ffdb05ac31dcc5311242a))
- **File:** clone accepts overrides arg to override any properties ([84a1e6c](https://github.com/PDFTron/webviewer-react-toolkit/commit/84a1e6c5c674f3f9f9afa53559aeae86a527bdd1))
- **FileOrganizer:** grid size based on first item, not hard-coded ([30eada0](https://github.com/PDFTron/webviewer-react-toolkit/commit/30eada0f284af9245a3f83045d8ce5845decc4ee))
- **FileOrganizer:** is now always virtualized and full height ([96aa70e](https://github.com/PDFTron/webviewer-react-toolkit/commit/96aa70ea12c8e2bd82e91ec339d7d6eee10641a8)), closes [#9](https://github.com/PDFTron/webviewer-react-toolkit/issues/9)
- **FileOrganizer:** multi-directional movement and focusing ([a835a48](https://github.com/PDFTron/webviewer-react-toolkit/commit/a835a48879c7e37ec532d750e50f5c6d9cb5a405))
- **ToastProvider:** added noTimeout prop to persist specified types ([d783400](https://github.com/PDFTron/webviewer-react-toolkit/commit/d783400a9acb61539dc0e1327f5974b29745bce9))

### Bug Fixes

- **Draggable:** prevent flicker when dragging items ([d0740ad](https://github.com/PDFTron/webviewer-react-toolkit/commit/d0740ad55914ddcbb2ab8ce289555e1148943936)), closes [#6](https://github.com/PDFTron/webviewer-react-toolkit/issues/6)
- **Overlay:** position fixed instead of absolute ([5eb0fe8](https://github.com/PDFTron/webviewer-react-toolkit/commit/5eb0fe8828e6184aaf27f24df69a1dda892d3dc7))
- **Thumbnail:** no longer displays extension, now included in name ([6360abd](https://github.com/PDFTron/webviewer-react-toolkit/commit/6360abd49d9e7a6ccc300f2cbb77ea2aa865fb9b))

### Build and Dependencies

- updated tslib ([09fb887](https://github.com/PDFTron/webviewer-react-toolkit/commit/09fb887f6433ac7ecc9aea3f27c4e3251e703040))

## [0.1.0](https://github.com/PDFTron/webviewer-react-toolkit/compare/v0.1.0-beta.1...v0.1.0) (2020-02-19)

### ⚠ BREAKING CHANGES

- **breakpoints:** media queries do not work with CSS variables, so created new Sass file for breakpoints, and removed breakpoints from mixins file
- **colors:** since color-blue-gray-4 was unused, shifted every color-blue-gray over so there is no longer a color-blue-gray-7, and every color above color-blue-gray-3 has been updated
- **css:** renamed tablet-lower-boundary to breakpoint-tablet, and desktop-lower-boundary to breakpoint-desktop
- **Overlay:** removed blockClicks and darkOverlay from Overlay, will be moved into components that require these properties
- **padding:** padding-half renamed to padding-small, padding-small renamed to padding-medium
- renamed white color variables to contrast since they are no longer white when dark theme is enabled
- sass and css are now in `/dist/scss` and `/dist/css` respectively (moved from `/lib/`)

### Features

- **ButtonGroup:** added button group for easy button layout ([9457c44](https://github.com/PDFTron/webviewer-react-toolkit/commit/9457c44242e6b8a92426cf3fbccd5ae3daa194a0))
- **FocusTrap:** added FocusTrap and useFocusTrap hook ([b691590](https://github.com/PDFTron/webviewer-react-toolkit/commit/b691590c3dc1a885eff81798ff66ce01932c6a41))
- **IconButton:** added icon button ([6fa450b](https://github.com/PDFTron/webviewer-react-toolkit/commit/6fa450be8d9242d8ce4656495bd930dec6382d7b))
- **icons:** exposed single and multi page icons ([a45e459](https://github.com/PDFTron/webviewer-react-toolkit/commit/a45e459f542f566bceb747349d3df463740eb174))
- **icons:** exposed some icons that are used internally ([0a35b58](https://github.com/PDFTron/webviewer-react-toolkit/commit/0a35b586ed437fb35cce32bae4cd479b647323ed))
- **Modal:** added focus lock to modal to ensure user can't tab out ([7b005a8](https://github.com/PDFTron/webviewer-react-toolkit/commit/7b005a8741fe423e421d5ad32320bca0b574a436))
- **Modal:** added modal component for displaying confirmations and info ([8a69e44](https://github.com/PDFTron/webviewer-react-toolkit/commit/8a69e44640e86701aeb271b39d4ed64188deefde))
- **Overlay:** created component ([946772c](https://github.com/PDFTron/webviewer-react-toolkit/commit/946772c606f8b21c4fbb5dfc539074cee6c23c35))
- **Toast:** added the Toast visual component ([b7b5eb0](https://github.com/PDFTron/webviewer-react-toolkit/commit/b7b5eb090f1f0323de2736ef0cdb5d401b65f328))
- **ToastProvider:** added toast provider to access toast management ([1452669](https://github.com/PDFTron/webviewer-react-toolkit/commit/1452669447f85c48a8ace9b50ae492c94e248fdd))
- **ToastProvider:** if added toast has timeout of 0 will not timeout ([c8c4f3c](https://github.com/PDFTron/webviewer-react-toolkit/commit/c8c4f3cdee1ecf8af5a5af1ba52866117302e00f))
- **useToast:** added hook for accessing adding and removal of toasts ([34b7e5d](https://github.com/PDFTron/webviewer-react-toolkit/commit/34b7e5d1b60bccaaf266d929e6b43a87fb9830ec))
- **useUnmountDelay:** added hook for delayed unmounts, used in Modal ([1ef4338](https://github.com/PDFTron/webviewer-react-toolkit/commit/1ef433879b1cdac27cfad98ca8bc7602cd31fb94))

### Bug Fixes

- **Button:** now works with svg icon children ([2c40b9d](https://github.com/PDFTron/webviewer-react-toolkit/commit/2c40b9d5dc0a78ca7b51bf0d3290c8fe887828c0))
- **css:** breakpoints renamed to breakpoint-\<device\> ([e0aeafc](https://github.com/PDFTron/webviewer-react-toolkit/commit/e0aeafc72f5a34e74dea764e63c039f231026908))
- **FileOrganizer:** fix to spacing issue with non-virtualized items ([804aa66](https://github.com/PDFTron/webviewer-react-toolkit/commit/804aa6698efd1cf25af39c36d5e307bc1b184515)), closes [#1](https://github.com/PDFTron/webviewer-react-toolkit/issues/1)
- **Overlay:** no longer unmounts when first item removed ([52ae549](https://github.com/PDFTron/webviewer-react-toolkit/commit/52ae549d7b774b3eeea71275a98f3c82c6dc1245))

### Styles

- **breakpoints:** moved breakpoints to own file, removed CSS variables ([39b1c4c](https://github.com/PDFTron/webviewer-react-toolkit/commit/39b1c4ce0d69003e76b8536cf180078917f8fe9c))
- **colors:** removed unused color-blue-gray-4 ([89a4a5a](https://github.com/PDFTron/webviewer-react-toolkit/commit/89a4a5a65308b476c2c63bddec44523b8063df48))
- **font:** made webkit font smoothing auto instead of antialiased ([0b2dca7](https://github.com/PDFTron/webviewer-react-toolkit/commit/0b2dca7c2537ab872351e398330c27a9d09c9b7d))
- **IconButton:** added padding to make button square given square icon ([39caaca](https://github.com/PDFTron/webviewer-react-toolkit/commit/39caacad795f8794d848ddc60e7cc45fe1b31a82))
- **mixins:** use CSS variables in mixins instead of Sass variables ([4fbe555](https://github.com/PDFTron/webviewer-react-toolkit/commit/4fbe555dbb5f62b615dc89773b96516b31804f4d))
- **padding:** renamed paddings to be more obvious as to size ([bef4c39](https://github.com/PDFTron/webviewer-react-toolkit/commit/bef4c3949b5a200f0460c45accd16dc5a13192b5))
- **Spinner:** references new spinner mixin for animation ([477cdc1](https://github.com/PDFTron/webviewer-react-toolkit/commit/477cdc1cf990cc7d7499ca9f6041d52e4c9478fa))
- **theme:** implemented dark theme across all components and docs ([5e075cb](https://github.com/PDFTron/webviewer-react-toolkit/commit/5e075cb6aae66dcddc95933f8f9631644e52eefb))

### Refactors

- **Draggable:** prevent unnecessary onDragChange calls ([5ec004a](https://github.com/PDFTron/webviewer-react-toolkit/commit/5ec004ae62b3cc17f28f8b2b423331d4284f9bb5))
- **Overlay:** correct memoization of props to avoid rerenders ([6e2879c](https://github.com/PDFTron/webviewer-react-toolkit/commit/6e2879cf82f4832e332c5d24fb487e28bce612ce))

### Build and Dependencies

- building sass and css into dist directory ([3a32dfc](https://github.com/PDFTron/webviewer-react-toolkit/commit/3a32dfc625ef2a9eb7b34612ae688b79553f3ff9))
- added esm build process and added tslib dependency ([161e2b1](https://github.com/PDFTron/webviewer-react-toolkit/commit/161e2b174a2b4ed57ea9075a70023eb492b31e90))
