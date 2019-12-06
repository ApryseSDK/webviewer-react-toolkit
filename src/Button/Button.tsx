import React, {FC, ButtonHTMLAttributes} from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({...buttonProps}) => {
  return <button {...buttonProps} />;
};
