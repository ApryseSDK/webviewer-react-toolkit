import classnames from 'classnames';
import React, { cloneElement, FC, LabelHTMLAttributes, ReactElement, ReactNode, useMemo } from 'react';
import { getStringId } from '../../utils';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The label to apply to any form element.
   */
  label: ReactNode;
  /**
   * Pass a child element which can accept an `id` prop. If you don't specify
   * the `id` prop, one will be generated to link the label to the element. If
   * you wish to link this label to a form field without passing children, you
   * should specify the `htmlFor` prop with the `id` of your form field.
   */
  children?: ReactElement;
}

export const Label: FC<LabelProps> = ({ label, children, className, htmlFor, ...props }) => {
  const childrenId = children?.props.id;
  const id = useMemo(() => {
    if (childrenId) return childrenId;
    return getStringId('label');
  }, [childrenId]);

  const labelClass = classnames(
    'ui__base ui__label',
    { 'ui__label--disabled': children?.props.disabled, 'ui__label--attached': children },
    className,
  );

  return (
    <>
      <label {...props} className={labelClass} htmlFor={htmlFor ?? id}>
        {label}
      </label>
      {children ? cloneElement(children, { id }) : undefined}
    </>
  );
};
