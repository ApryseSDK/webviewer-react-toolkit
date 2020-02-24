The file organizer allows you to view multiple page files and use drag-and-drop
to re-order them. You can also use the arrow keys while focusing any part of the
file thumbnail in order to focus on a new file, or tab to move through them one
by one (tab will also focus internal elements, such as the editable text within
`Thumbnail`). The `FileOrganizer` is virtualized, so there will be no
performance issues even with thousands of thumbnails (see the stress test
playground).

## Moving files

You can click and drag to move items. If you are using `useManagedFiles` hook,
you can hold <kbd>Shift</kbd> to multi-select items and then move them together.
Unless `preventArrowsToMove` is set to true, you can hold the <kbd>⌘
Command</kbd> key on macOS, or the <kbd>Ctrl</kbd> key on Windows and use the
arrow keys, `onMove` will be fired.

## Rendering Files

The easiest way to get started would be to use the `Thumbnail` element as the
item that is rendered in the `FileOrganizer`. The `Thumbnail` component includes
many default props that integrate well with the `FileOrganizer`.

## Managing Files

It is recommended that you use the `useManagedFiles` hook, as it exposes many
valuable tools to save you effort when managing a list of files.
