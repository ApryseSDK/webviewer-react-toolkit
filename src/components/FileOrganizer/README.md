The file organizer allows you to view multiple page files and use drag-and-drop
to re-order them.

## Handling `onMove`

These stories handle the `onMove` callback to change the order to change the
order of the files passed in. **This must be implemented externally**. Here's
the way these stories do it, but you can do it any way you want!

```js
const [files, setFiles] = useState([file1, file2]);

const handleOnMove = useCallback((fromIndex: number, toIndex: number) => {
  setFiles(prev => {
    // Make a copy so you don't mutate the state.
    const clone = prev.slice();
    // Get the item at the old index to move while removing it from the copy.
    const item = clone.splice(fromIndex, 1)[0];
    // Insert the item into the copy at the new index.
    clone.splice(toIndex, 0, item);
    // The state now becomes the copy.
    return clone;
  });
}, []);

return (
  <FileOrganizer
    files={files}
    onMove={handleOnMove}
    //...
  />
);
```
