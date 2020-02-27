import { select } from '@storybook/addon-knobs';
import { AvailableIcons } from '../../components';
import * as icons from '../../icons';

const availableIcons = Object.keys(icons) as AvailableIcons[];

export function selectIcon(name: string, value: AvailableIcons, groupId?: string): AvailableIcons {
  return select(name, availableIcons, value, groupId);
}
