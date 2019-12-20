This is an image that handles multiple `src` parameters. Specifically, it can
accept promises, as well as functions that return the `src` string or a promise
for the string. If you want to throttle the fetching of the image, you can do so
by giving a function for `src`. You can provide a loading placeholder using the
`onRenderLoading` prop.
