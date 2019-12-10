import classnames from 'classnames';
import React, { FC } from 'react';

export enum SpinnerStyle {
  Default = 'default',
  OnGray = 'on-gray',
}

export enum SpinnerSize {
  Tiny = 'tiny',
  Small = 'small',
  Default = 'default',
  Large = 'large',
}

export interface SpinnerProps {
  /**
   * @default SpinnerStyle.Default
   */
  spinnerStyle?: SpinnerStyle;
  /**
   * @default SpinnerSize.Default
   */
  spinnerSize?: SpinnerSize;
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({
  spinnerStyle = SpinnerStyle.Default,
  spinnerSize = SpinnerSize.Default,
  className,
}) => {
  const spinnerClass = classnames(
    'ui__base ui__spinner',
    `ui__spinner--style-${spinnerStyle}`,
    `ui__spinner--size-${spinnerSize}`,
    className,
  );

  return (
    <div className={spinnerClass}>
      <div className="ui__spinner__animated" />
    </div>
  );
};
