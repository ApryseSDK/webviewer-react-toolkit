export const componentStory = (componentName: string) =>
  `import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { ${componentName} } from '../${componentName}';
import info from './README.md';

export default { title: 'Components/${componentName}', component: ${componentName}, parameters: { info } };

export const Basic = () => (
  <${componentName}
    someProp={text('someProp', 'Hello, World!')}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  />
);
`;
