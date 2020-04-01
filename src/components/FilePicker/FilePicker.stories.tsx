import React from 'react';
import { action } from '../../storybook-helpers/action/action';
import { FilePicker } from '../FilePicker';
import { FilePickerItem } from './FilePicker';
import readme from './README.md';

export default { title: 'Components/FilePicker', component: FilePicker, parameters: { readme } };

const getFiles = (editable = false): FilePickerItem[] => [
  {
    key: 0,
    name: 'file_1.pdf',
    onRename: editable ? action('onRename file 1') : undefined,
    onDelete: editable ? action('onDelete file 1') : undefined,
  },
  {
    key: 1,
    name: 'file_2.pdf',
    onRename: editable ? action('onRename file 2') : undefined,
    onDelete: editable ? action('onDelete file 2') : undefined,
  },
];

export const Basic = () => (
  <div style={{ width: 200 }}>
    <FilePicker items={getFiles()} />
  </div>
);

export const Editable = () => (
  <div style={{ width: 200 }}>
    <FilePicker items={getFiles(true)} />
  </div>
);
