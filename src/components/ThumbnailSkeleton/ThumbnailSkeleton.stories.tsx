import React from 'react';
import { ThumbnailSkeleton } from '../ThumbnailSkeleton';
import readme from './README.md';

export default { title: 'Components/ThumbnailSkeleton', component: ThumbnailSkeleton, parameters: { readme } };

export const Basic = () => <ThumbnailSkeleton />;
