Passing children to `Overlay` will cause them to be rendered inside of an
overlay on top of any other components. This can be used for modals, tooltips,
or any other kind of overlay component.

## Multiple Components

Since components use [React portals](https://reactjs.org/docs/portals.html) to
mount into the overlay root, they are inserted in the order they are mounted.
Therefore, if you un-mount and remount a component, it will be inserted as the
last child, regardless of it's position in the React tree.
