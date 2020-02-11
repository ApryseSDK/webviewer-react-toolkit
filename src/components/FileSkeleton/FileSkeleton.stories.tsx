import React from 'react';
import { FileSkeleton } from '../FileSkeleton';
import readme from './README.md';

export default { title: 'Components/FileSkeleton', component: FileSkeleton, parameters: { readme } };

export const Basic = () => <FileSkeleton />;
