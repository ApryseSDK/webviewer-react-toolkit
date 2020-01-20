export const componentStory = (componentName: string) =>
  `import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { ${componentName} } from '../${componentName}';
import docs from './README.md';

export default { title: '${componentName}', component: ${componentName}, parameters: { info: docs } };

export const Basic = () => (
  <${componentName}
    someProp={text('someProp', 'Hello, World!')}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  />
);
`;
