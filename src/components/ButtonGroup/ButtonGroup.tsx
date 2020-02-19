import classnames from 'classnames';
import React, { FC, HTMLAttributes } from 'react';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Position the buttons within the group.
   * @default "right"
   */
  position?: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
  /**
   * If given, will wrap the buttons in reverse order. This is valuable if you
   * have an accept button on the left, but want it on the bottom when wrapped.
   */
  reverseWrap?: boolean;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
  position = 'right',
  reverseWrap,
  children,
  className,
  ...props
}) => {
  const buttonGroupClass = classnames(
    'ui__base ui__buttonGroup',
    `ui__buttonGroup--position-${position}`,
    {
      'ui__buttonGroup--reverse': reverseWrap,
    },
    className,
  );

  return (
    <div {...props} className={buttonGroupClass}>
      {children}
    </div>
  );
};
