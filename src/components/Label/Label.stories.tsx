import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { Input } from '../Input';
import { Label } from '../Label';
import readme from './README.md';

export default { title: 'Components/Label', component: Label, parameters: { readme } };

export const Basic = () => (
  <Label
    label={text('label', 'Labeled input field')}
    optionalText={boolean('has optionalText?', false) ? '- optional' : undefined}
  >
    <Input />
  </Label>
);

export const WithCustomId = () => (
  <Label
    label={text('label', 'Labeled input field')}
    optionalText={boolean('has optionalText?', false) ? '- optional' : undefined}
  >
    <Input id="custom_input_id" />
  </Label>
);

export const WithDisabledFormElement = () => (
  <Label
    label={text('label', 'Labeled input field')}
    optionalText={boolean('has optionalText?', false) ? '- optional' : undefined}
  >
    <Input id="custom_input_id" disabled={boolean('disabled', false)} />
  </Label>
);

export const Detached = () => (
  <>
    <Label
      htmlFor="custom_input_id"
      label={text('label', 'Labeled input field')}
      optionalText={boolean('has optionalText?', false) ? '- optional' : undefined}
    />
    <p>Some other stuff</p>
    <Input id="custom_input_id" disabled={boolean('disabled', false)} />
  </>
);
