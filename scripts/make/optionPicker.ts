import { prompt } from 'enquirer';
import { MakeOptions } from './types';

/**
 * Option picker function for make script.
 */
export const optionPicker = async (): Promise<MakeOptions> => {
  /* --- Naming the component --- */

  const componentName: string = (
    await prompt({
      type: 'input',
      name: 'componentName',
      message: 'What will your component be called?',
      validate: value => {
        if (!/^[A-Z]/.test(value)) {
          return 'Must begin with a capital';
        }
        if (!/^[A-Za-z]+$/.test(value)) {
          return 'Must only contain letters';
        }
        if (value.length < 2) {
          return 'Must be at least 2 letters long';
        }
        return true;
      },
    })
  )['componentName'];

  /* --- Forwards ref --- */

  const isRef: boolean = await (async () => {
    const result = (
      await prompt({
        type: 'select',
        name: 'isRef',
        message: 'Will your component forward a ref?',
        hint: 'https://reactjs.org/docs/forwarding-refs.html',
        choices: [
          { name: 'no', hint: ' Component does not require a ref (ex: Tooltip)' },
          { name: 'yes', hint: 'Component should forward a ref (ex: Button, Input)' },
        ],
      })
    )['isRef'];

    return result === 'yes';
  })();

  return { componentName, isRef };
};
