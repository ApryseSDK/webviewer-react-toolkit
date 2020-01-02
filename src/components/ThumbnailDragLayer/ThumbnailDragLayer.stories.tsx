import React from 'react';
import ThumbnailDragLayer from '../ThumbnailDragLayer';
import docs from './README.md';
import { number } from '@storybook/addon-knobs';

export default { title: 'ThumbnailDragLayer', parameters: { info: docs } };

export const basic = () => (
  <ThumbnailDragLayer numFiles={number('numFiles', 1, { min: 1, max: 100, range: true, step: 1 })} />
);
