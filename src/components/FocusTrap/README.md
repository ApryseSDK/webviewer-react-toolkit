Traps the focus within the child component when `locked` is true. This wraps the
hook `useFocusTrap`, so you can just use that if you'd prefer a hook.

<!--
## Using `FocusTrap`

> Make sure that only a single, non-conditional child is passed to `FocusTrap`,
> and that the child is able to have a `ref` passed to it.

```jsx
return (
  <FocusTrap locked={locked} focusLastOnUnlock={focusLastOnUnlock}>
    <div>
      <input />
      <button>Some button</button>
    </div>
  </FocusTrap>
);
```

## Using `useFocusTrap`

```jsx
const focusRef = useFocusTrap(locked, { focusLastOnUnlock });

return (
  <div ref={focusRef}>
    <input />
    <button>Some button</button>
  </div>
);
```
 -->
