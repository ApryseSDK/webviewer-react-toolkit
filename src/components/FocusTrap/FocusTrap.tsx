import { cloneElement, FC, ReactElement, RefAttributes } from 'react';
import { useFocusTrap, UseFocusTrapOptions } from '../../hooks';

export interface FocusLockProps extends UseFocusTrapOptions {
  /**
   * When true, focus will be locked within the child element.
   */
  locked?: boolean;
  /**
   * A child with a targetable ref to lock focus on. This component must accept
   * the `ref` prop in order to work with `FocusTrap`.
   */
  children: ReactElement<RefAttributes<HTMLElement>>;
}

export const FocusTrap: FC<FocusLockProps> = ({ locked, focusLastOnUnlock, children }) => {
  const focusRef = useFocusTrap(locked, { focusLastOnUnlock });

  return cloneElement(children, { ref: focusRef });
};
