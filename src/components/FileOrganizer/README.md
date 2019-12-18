The file organizer allows you to view multiple page files and use drag-and-drop
to re-order them. Unless `preventArrowsToMove` is set to true, you can also use
the left and right arrows while focusing any part of the file thumbnail in order
to fire `onMove`.

> Note: this is a view component, so there are various things it does not take
> care of internally:
>
> 1. This component will merely fire `onMove`, it will not change the order of
>    the files. The file order must be stored in an external state and adjusted
>    every time `onMove` is called if you wish to see the pages change order.
