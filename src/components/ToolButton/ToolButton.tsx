import classnames from 'classnames';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import useOnClick from '../../hooks/useOnClick';

export interface ToolButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ToolButton = forwardRef<HTMLButtonElement, ToolButtonProps>(
  ({ className, children, onClick, ...buttonProps }, ref) => {
    const handleOnClick = useOnClick(onClick, { stopPropagation: true });

    const toolButtonClass = classnames(
      'ui__base ui__toolButton',
      { ['ui__toolButton--disabled']: buttonProps.disabled },
      className,
    );

    return (
      <button {...buttonProps} className={toolButtonClass} onClick={handleOnClick} ref={ref}>
        <div className="ui__toolButton__internals">{children}</div>
      </button>
    );
  },
);
