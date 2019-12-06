export const componentStory = (componentName: string) =>
  `import {action} from '@storybook/addon-actions';
import {boolean, text} from '@storybook/addon-knobs';
import React from 'react';
import ${componentName} from '../${componentName}';

export default {title: '${componentName}'};

export const basic = () => (
  <${componentName}
    someProp={text('someProp', 'Hello, World!')}
    disabled={boolean('disabled', false)}
    onClick={action('onClick')}
  />
);
`;
