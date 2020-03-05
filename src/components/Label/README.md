A generic label for labelling form fields. If the child form field has an `id`
specified, that will be automatically parsed and used in the label's `htmlFor`
attribute to link the two. If no `id` is specified for the child, one will be
automatically generated.

You can also link the label to a form field without passing it as a child by
giving the field an `id` and passing the same `id` to the `htmlFor` prop for the
input. This is useful if the two elements do not sit near each other on the
page.

If the child element is disabled, the label will automatically change appearance
to a disabled state. This will not happen if the form field is not the child.
