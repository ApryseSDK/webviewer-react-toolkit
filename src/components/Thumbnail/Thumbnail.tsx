import classnames from 'classnames';
import React, { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ThumbnailProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Set the internals of the button.
   * @default "Default value"
   */
  someProp?: string;
}

export const Thumbnail = forwardRef<HTMLButtonElement, ThumbnailProps>(
  ({ someProp = 'Default value', className, ...buttonProps }, ref) => {
    const thumbnailClass = classnames('ui__thumbnail', className, {
      ['ui__thumbnail--disabled']: buttonProps.disabled,
    });

    return (
      <button className={thumbnailClass} {...buttonProps} ref={ref}>
        {someProp}
      </button>
    );
  },
);
