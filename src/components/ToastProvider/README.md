A provider to allow you to manage notification toasts in your application. Use
in combination with the `useToast` hook.

## Using

1. Make sure that you have the `ToastProvider` placed at the root of your
   project
1. Use the `useToast` hook to access the `ToastContext`

## Details

When hovering a toast, any existing timeout will be cancelled, and will restart
once the mouse leaves the toast.
