This is a drag layer that implements
[react-dnd](https://react-dnd.github.io/react-dnd) internally. It allows you to
have a custom drag preview for any drag-and-drop container. In this component
library, it is used to generate the page drag icons in `FileOrganizer`. It must
be within a
[DndProvider](https://react-dnd.github.io/react-dnd/docs/api/dnd-provider) with
a backend (in our example we are using the
[react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend)).
