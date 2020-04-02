import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import { action } from '../../storybook-helpers/action/action';
import { FilePicker } from '../FilePicker';
import readme from './README.md';

export default { title: 'Components/FilePicker', component: FilePicker, parameters: { readme } };

export const Basic = () => {
  const onRename = boolean('has onRename', false);
  const onDelete = boolean('has onDelete', false);
  const long = boolean('has long name', false);

  return (
    <div style={{ width: 200 }}>
      <FilePicker
        items={[
          {
            key: 0,
            name: `file_1${long ? '_with_long_name_to_show_cut_off' : ''}.pdf`,
            onRename: onRename ? action('onRename file 1') : undefined,
            onDelete: onDelete ? action('onDelete file 1') : undefined,
          },
          {
            key: 1,
            name: `file_2${long ? '_with_long_name_to_show_cut_off' : ''}.pdf`,
            onRename: onRename ? action('onRename file 2') : undefined,
            onDelete: onDelete ? action('onDelete file 2') : undefined,
          },
        ]}
      />
    </div>
  );
};
