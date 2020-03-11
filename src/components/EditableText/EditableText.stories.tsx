import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { action } from '../../storybook-helpers/action/action';
import { EditableText } from '../EditableText';
import readme from './README.md';

export default { title: 'Components/EditableText', component: EditableText, parameters: { readme } };

export const Basic = () => (
  <EditableText
    centerText={boolean('centerText', false)}
    bordered={boolean('bordered', true)}
    disabled={boolean('disabled', false)}
    locked={boolean('locked', false)}
    placeholder={text('placeholder', '')}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    onEdit={action('onEdit')}
  />
);

export const WithOnRenderText = () => (
  <EditableText
    onRenderText={value => (value ? `[[ ${value.toUpperCase()} ]]` : '')}
    centerText={boolean('centerText', false)}
    bordered={boolean('bordered', true)}
    disabled={boolean('disabled', false)}
    locked={boolean('locked', false)}
    placeholder={text('placeholder', '')}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    onEdit={action('onEdit')}
  />
);

export const ControlledValue = () => (
  <EditableText
    value={text('value', '')}
    centerText={boolean('centerText', false)}
    bordered={boolean('bordered', true)}
    disabled={boolean('disabled', false)}
    locked={boolean('locked', false)}
    placeholder={text('placeholder', '')}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    onEdit={action('onEdit')}
  />
);

export const ControlledEditMode = () => (
  <EditableText
    editMode={boolean('editMode', false)}
    centerText={boolean('centerText', false)}
    bordered={boolean('bordered', true)}
    disabled={boolean('disabled', false)}
    locked={boolean('locked', false)}
    placeholder={text('placeholder', '')}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    onEdit={action('onEdit')}
  />
);

export const FullyControlled = () => (
  <EditableText
    value={text('value', '')}
    editMode={boolean('editMode', false)}
    centerText={boolean('centerText', false)}
    bordered={boolean('bordered', true)}
    disabled={boolean('disabled', false)}
    locked={boolean('locked', false)}
    placeholder={text('placeholder', '')}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    onEdit={action('onEdit')}
  />
);
