import classnames from 'classnames';
import React, { FC } from 'react';

export interface SpinnerProps {
  /**
   * Set the size of the spinner.
   * @default "default"
   */
  spinnerSize?: 'tiny' | 'small' | 'default' | 'large';
  /**
   * Classname for the container div.
   */
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ spinnerSize = 'default', className }) => {
  const spinnerClass = classnames('ui__base ui__spinner', `ui__spinner--size-${spinnerSize}`, className);

  return (
    <div className={spinnerClass}>
      <div className="ui__spinner__animated" />
    </div>
  );
};
