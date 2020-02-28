import classnames from 'classnames';
import React, { ButtonHTMLAttributes, forwardRef, RefAttributes, useMemo } from 'react';
import { useAccessibleFocus, useOnClick } from '../../hooks';
import { Remove } from '../../utils';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

export interface ToolButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If provided will add an expand button. You can provide any standard button
   * props, except for children (children will be a drop down arrow
   * automatically). There is an additional `position` prop so you can set
   * the position to be `'right'` rather than the default `'bottom'`.
   */
  expandProps?: { position?: 'right' | 'bottom' } & Remove<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
    RefAttributes<HTMLButtonElement>;
}

export const ToolButton = forwardRef<HTMLButtonElement, ToolButtonProps>(
  ({ className, expandProps, children, onClick, ...buttonProps }, ref) => {
    const handleOnClick = useOnClick(onClick, { stopPropagation: true });

    const isUserTabbing = useAccessibleFocus();

    const positionRight = expandProps?.position === 'right';
    const expandClass = expandProps?.className;
    const hasExpandProps = !!expandProps;

    const classes = useMemo(() => {
      const enabledObj = {
        'ui__toolButton--disabled': buttonProps.disabled,
        'ui__toolButton--tabbing': isUserTabbing,
        'ui__toolButton--expanded': hasExpandProps,
        'ui__toolButton--right': positionRight,
        'ui__toolButton--bottom': !positionRight,
      };
      const wrapper = classnames('ui__base ui__toolButton', enabledObj);
      const action = classnames('ui__toolButton__action', enabledObj, className);
      const expand = classnames('ui__toolButton__expand', enabledObj, expandClass);
      return { wrapper, action, expand };
    }, [buttonProps.disabled, className, expandClass, hasExpandProps, isUserTabbing, positionRight]);

    return (
      <div className={classes.wrapper}>
        <IconButton
          disabled={buttonProps.disabled}
          {...buttonProps}
          className={classes.action}
          onClick={handleOnClick}
          ref={ref}
        >
          {children}
        </IconButton>
        {expandProps ? (
          <IconButton disabled={buttonProps.disabled} {...expandProps} className={classes.expand}>
            <Icon icon="ChevronDown" />
          </IconButton>
        ) : (
          undefined
        )}
      </div>
    );
  },
);
