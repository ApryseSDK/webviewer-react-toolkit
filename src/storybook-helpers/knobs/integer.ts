import { number } from '@storybook/addon-knobs';

export function integer(name: string, value: number, groupId?: string) {
  const num = number(name, value, undefined, groupId);
  if (!Number.isInteger(num) || !Number.isFinite(num) || num < 0) return undefined;
  return num;
}
