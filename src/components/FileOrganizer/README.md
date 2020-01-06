The file organizer allows you to view multiple page files and use drag-and-drop
to re-order them. Unless `preventArrowsToMove` is set to true, you can also use
the left and right arrows while focusing any part of the file thumbnail in order
to fire `onMove`. The `FileOrganizer` will automatically virtualize in order to
prevent stuttering at 50 items. You can adjust this using the
`virtualizeThreshold` prop.

## Rendering files

The easiest way to get started would be to use the `Thumbnail` element as the
item that is rendered in the `FileOrganizer`. The `Thumbnail` component includes
many default props that integrate well with the `FileOrganizer`.

## Managing files

It is recommended that you use the `useManagedFiles` hook, as it exposes many
valuable tools to save you effort when managing a list of files.

> Note: Multi-drag is currently broken on virtualized lists.
