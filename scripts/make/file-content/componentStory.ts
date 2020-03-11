export const componentStory = (componentName: string) =>
  `import { action } from '../../storybook-helpers/action/action';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { ${componentName} } from '../${componentName}';
import readme from './README.md';

export default { title: 'Components/${componentName}', component: ${componentName}, parameters: { readme } };

export const Basic = () => <${componentName} onClick={action('onClick')}>{text('children', 'Hello, World!')}</${componentName}>;
`;
