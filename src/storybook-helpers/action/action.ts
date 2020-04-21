import { action as _action, ActionOptions } from '@storybook/addon-actions';
import { SyntheticEvent } from 'react';

/**
 * Async actions for increased performance. Doesn't block thread.
 * @param name Action name. Should match your prop name.
 * @param options Options for the action.
 */
export function action(name: string, options?: ActionOptions) {
  const primedAction = _action(name, options);
  return (event?: SyntheticEvent<HTMLElement> | any, ...args: any[]) => {
    if (event && event.nativeEvent) event = event.nativeEvent;
    setTimeout(() => primedAction(event, ...args));
  };
}
