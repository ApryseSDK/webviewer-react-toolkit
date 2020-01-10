This is a draggable wrapper that implements
[`react-dnd`](https://react-dnd.github.io/react-dnd) internally. It allows you
to have drag-and-drop-able elements. In this component library, it is used to
wrap the thumbnails of `FileOrganizer`. It must be within a
[DndProvider](https://react-dnd.github.io/react-dnd/docs/api/dnd-provider) with
a backend (in our example we are using our own internal component called
`DndMultiProvider` which bundles together mouse and touch handlers).
