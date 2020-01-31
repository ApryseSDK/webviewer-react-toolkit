import React from 'react';
import { integer } from '../../storybook-helpers/knobs/integer';
import { ThumbnailDragLayer } from '../ThumbnailDragLayer';
import info from './README.md';

export default { title: 'Components/ThumbnailDragLayer', component: ThumbnailDragLayer, parameters: { info } };

export const Basic = () => <ThumbnailDragLayer numFiles={integer('numFiles', 1)} />;
