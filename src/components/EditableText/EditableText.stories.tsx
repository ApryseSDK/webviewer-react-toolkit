import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import EditableText from '../EditableText';
import docs from './README.md';
import { action } from '@storybook/addon-actions';

export default { title: 'EditableText', parameters: { info: docs } };

export const basic = () => (
  <EditableText
    centerText={boolean('centerText', false)}
    bordered={boolean('bordered', true)}
    disabled={boolean('disabled', false)}
    placeholder={text('placeholder', '')}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    onEdit={action('onEdit')}
  />
);

export const withOnRenderText = () => (
  <EditableText
    onRenderText={value => (value ? `${value}.pdf` : '')}
    centerText={boolean('centerText', false)}
    bordered={boolean('bordered', true)}
    disabled={boolean('disabled', false)}
    placeholder={text('placeholder', '')}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    onEdit={action('onEdit')}
  />
);

export const controlledValue = () => (
  <EditableText
    value={text('value', '')}
    centerText={boolean('centerText', false)}
    bordered={boolean('bordered', true)}
    disabled={boolean('disabled', false)}
    placeholder={text('placeholder', '')}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    onEdit={action('onEdit')}
  />
);

export const controlledEditMode = () => (
  <EditableText
    editMode={boolean('editMode', false)}
    centerText={boolean('centerText', false)}
    bordered={boolean('bordered', true)}
    disabled={boolean('disabled', false)}
    placeholder={text('placeholder', '')}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    onEdit={action('onEdit')}
  />
);

export const fullyControlled = () => (
  <EditableText
    value={text('value', '')}
    editMode={boolean('editMode', false)}
    centerText={boolean('centerText', false)}
    bordered={boolean('bordered', true)}
    disabled={boolean('disabled', false)}
    placeholder={text('placeholder', '')}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
    onEdit={action('onEdit')}
  />
);
