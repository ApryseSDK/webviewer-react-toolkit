import classnames from 'classnames';
import React, { forwardRef, HTMLAttributes, ReactNode, SVGProps, useMemo } from 'react';
import * as icons from './../../icons';

export type AvailableIcons = keyof typeof icons;

export interface IconProps extends HTMLAttributes<HTMLElement> {
  /**
   * Specify one of the included icons from the toolkit. If provided, do not add
   * `children` or they will override this.
   */
  icon?: AvailableIcons;
  /**
   * Props that will be passed to the included icons. This will not be used if
   * `children` is provided.
   */
  svgProps?: SVGProps<SVGSVGElement>;
  /**
   * Provide a custom child instead of a provided icon. Will override `icon` if
   * provided.
   */
  children?: ReactNode;
}

export const Icon = forwardRef<HTMLButtonElement, IconProps>(
  ({ icon, svgProps, className, children, ...props }, ref) => {
    const iconClass = classnames('ui__base ui__icon', className);

    const child = useMemo(() => {
      if (children !== undefined) return children;
      if (icons === undefined) return undefined;
      const IconChild = icons[icon!];
      return <IconChild {...svgProps} />;
    }, [children, icon, svgProps]);

    return (
      <i {...props} className={iconClass} ref={ref}>
        {child}
      </i>
    );
  },
);
