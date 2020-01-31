import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { EditableText } from '../EditableText';
import info from './README.md';

export default { title: 'Components/EditableText', component: EditableText, parameters: { info } };

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
    onRenderText={value => (value ? `${value}.pdf` : '')}
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
