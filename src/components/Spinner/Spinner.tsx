import classnames from 'classnames';
import React, { FC } from 'react';

export interface SpinnerProps {
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ className }) => {
  const spinnerClass = classnames('ui__base ui__spinner', className);

  return (
    <div className={spinnerClass}>
      <div className="ui__spinner__animated" />
    </div>
  );
};
