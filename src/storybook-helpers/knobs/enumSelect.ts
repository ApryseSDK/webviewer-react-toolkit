import { select } from '@storybook/addon-knobs';
import { SelectTypeOptionsProp, SelectTypeKnobValue } from '@storybook/addon-knobs/dist/components/types';

/**
 * Lets you use Enums and display them properly.
 * @param propName The name of the prop.
 * @param enumObj An object containing your enum. Ex: { MyEnum }
 * @param value The default value to start the select with.
 * @param groupId Optional group ID.
 */
export function enumSelect<T extends SelectTypeKnobValue>(
  propName: string,
  enumObj: { [key: string]: SelectTypeOptionsProp<T> },
  value: T,
  groupId?: string,
) {
  const [enumName, enumToParse] = Object.entries(enumObj)[0];
  const enumEntries = Object.entries(enumToParse);

  const selectObj: { [key: string]: string } = {};
  enumEntries.forEach(([enumKey, enumVal]) => (selectObj[`${enumName}.${enumKey}`] = enumVal));

  return select(propName, selectObj, value as string, groupId) as T;
}
