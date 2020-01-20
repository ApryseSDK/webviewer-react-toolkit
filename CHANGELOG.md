## [Unreleased]

- [core] Dependency update to Storybook and utils (#27) @liamross

## [0.0.0-beta.6] - 2020-01-13

- [Thumbnail] **BREAKING:** New buttonProps array prop (#23) @liamross
  - No longer takes onRemove and onRotate
  - `buttonProps` is array of objects with properties `onClick` and `children`
  - Allows for flexibility when defining button on `Thumbnail`
- [docs] Added a11y and background plugins (#25) @liamross
- [Button] Changed style of small buttons (#25) @liamross
- [Thumbnail] Restored thumbnail outline, now smaller (#25) @liamross
- [DndMultiProvider] Supports touch and mouse events (#24) @liamross

## [0.0.0-beta.4] - 2020-01-09

- [FileOrganizer] Correctly forward default div props (#21) @liamross
- [FileOrganizer] Prevent arrow keys from moving when disabled (#21) @liamross
- [docs] Updated the docs and appearance of Storybook (#21) @liamross
- [EditableText] Bordered style fix, now shows border (#20) @liamross

## [0.0.0-beta.3] - 2020-01-08

- [style] Only show focus rings when using keyboard navigation (#15) @liamross
- [useManagedFile] Select any moved files (#14) @liamross
- [FileOrganizer] removed file argument from onMove callback (#14) @liamross
- [core] Updated type files for WebViewer API (#14) @liamross
- [FileOrganizer] Centered custom drag layer on mouse (#13) @liamross
- [DragLayer] Added customTranslate prop to adjust coords (#13) @liamross
- [FileOrganizer] Removed padding to match virtualized (#13) @liamross
- [FileOrganizer] Keeps items scrolled in view when moving (#12) @liamross
- [Thumbnail] Focuses main when selection ends (#12) @liamross
- [Draggable] Forwards ref to wrapper (#12) @liamross
- [utils] Created DOM and grid utilities (#12) @liamross
- [EditableText] Stop keyboard events from propagating out (#12) @liamross
- [FileOrganizer] Meta (ctrl or command) + A to select all (#11) @liamross
- [Thumbnail] Must select in order to tab to other controls (#11) @liamross
- [useManagedFiles] Shift key required for multi-select (#9) @liamross
- [FileOrganizer] Click off items or press Escape to unselect all (#7) @liamross
- [FileOrganizer] Passes isShownOnLoad to thumbnail render (#7) @liamross
- [useManagedFiles] Hook for managing files for FileOrganizer (#7) @liamross
- [FileOrganizer] Virtualized if many files (#4) @liamross
- [File] Implemented MemoizedPromise (#3) @liamross
- [Thumbnail] Fixed space key not working for renaming (#2) @liamross
- [File] Added event-based file methods (#1) @liamross
