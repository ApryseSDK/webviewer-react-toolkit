import React from 'react';
import { selectIcon } from '../../storybook-helpers/knobs/selectIcon';
import { Icon } from '../Icon';
import readme from './README.md';

export default { title: 'Components/Icon', component: Icon, parameters: { readme } };

export const Basic = () => <Icon icon={selectIcon('icon', 'Close')} />;
