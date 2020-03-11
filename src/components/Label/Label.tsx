import classnames from 'classnames';
import React, { cloneElement, FC, LabelHTMLAttributes, ReactElement, ReactNode } from 'react';
import { useID } from '../../hooks/useID';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The label to apply to any form element.
   */
  label: ReactNode;
  /**
   * Provide a string specifying that this field is optional.
   */
  optionalText?: string;
  /**
   * Pass a child element which can accept an `id` prop. If you don't specify
   * the `id` prop, one will be generated to link the label to the element. If
   * you wish to link this label to a form field without passing children, you
   * should specify the `htmlFor` prop with the `id` of your form field.
   */
  children?: ReactElement;
}

export const Label: FC<LabelProps> = ({ label, optionalText, children, className, htmlFor, ...props }) => {
  const childrenId = children?.props.id;
  const id = useID(childrenId);

  const labelClass = classnames(
    'ui__base ui__label',
    { 'ui__label--disabled': children?.props.disabled, 'ui__label--attached': children },
    className,
  );

  return (
    <>
      <label {...props} className={labelClass} htmlFor={htmlFor ?? id}>
        {label}
        {optionalText ? <span className="ui__label__optional">{optionalText}</span> : undefined}
      </label>
      {children ? cloneElement(children, { id }) : undefined}
    </>
  );
};
