import React from 'react';
import { FilePlaceholder } from '../FilePlaceholder';
import readme from './README.md';
import { text } from '@storybook/addon-knobs';

export default { title: 'Components/FilePlaceholder', component: FilePlaceholder, parameters: { readme } };

export const Basic = () => <FilePlaceholder extension={text('extension', 'pdf')} />;
