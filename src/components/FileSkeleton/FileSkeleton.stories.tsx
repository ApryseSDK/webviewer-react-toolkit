import React from 'react';
import { FileSkeleton } from '../FileSkeleton';
import info from './README.md';

export default { title: 'Components/FileSkeleton', component: FileSkeleton, parameters: { info } };

export const Basic = () => <FileSkeleton />;
