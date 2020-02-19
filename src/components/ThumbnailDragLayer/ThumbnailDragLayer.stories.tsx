import React from 'react';
import { integer } from '../../storybook-helpers/knobs/integer';
import { ThumbnailDragLayer } from '../ThumbnailDragLayer';
import readme from './README.md';

export default { title: 'Components/ThumbnailDragLayer', component: ThumbnailDragLayer, parameters: { readme } };

export const Basic = () => <ThumbnailDragLayer numFiles={integer('numFiles', 1)} />;
