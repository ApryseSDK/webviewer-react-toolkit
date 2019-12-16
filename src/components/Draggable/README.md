This is a draggable wrapper that implements
[`react-dnd`](https://react-dnd.github.io/react-dnd) internally. It allows you
to have drag-and-drop-able elements. In this component library, it is used to
wrap the thumbnails of `FileOrganizer`. It must be within a
[DndProvider](https://react-dnd.github.io/react-dnd/docs/api/dnd-provider) with
a backend (in our example we are using the
[react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend)).

Here is an absolute basic example of how to implement it:

```js
import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import Draggable from '../Draggable';

export const BasicExample = () => (
  <DndProvider backend={Backend}>
    <Draggable index={0}>
      <div>This div is draggable</div>
    </Draggable>
  </DndProvider>
);
```
