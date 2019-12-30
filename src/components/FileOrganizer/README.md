The file organizer allows you to view multiple page files and use drag-and-drop
to re-order them. Unless `preventArrowsToMove` is set to true, you can also use
the left and right arrows while focusing any part of the file thumbnail in order
to fire `onMove`. The `FileOrganizer` will automatically virtualize in order to
prevent stuttering at 100 items. You can adjust this using the
`virtualizeThreshold` prop.

> Note: if you are using the keyboard to move an item in a virtualized list, it
> will stop working if the item reaches the edge of the rendered area. This is
> because moving an item is only permitted when the item is focused, and it
> can't be focused if it is unmounted due to the virtualization.
