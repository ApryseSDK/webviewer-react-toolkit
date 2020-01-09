import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import React, { CSSProperties } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import Draggable from '../Draggable';
import docs from './README.md';

export default { title: 'Draggable', component: Draggable, parameters: { info: docs } };

const commonStyle: CSSProperties = {
  padding: 16,
  background: 'lightgray',
  width: 200,
  height: 50,
  textAlign: 'center',
};

export const basic = () => (
  <DndProvider backend={Backend}>
    <Draggable
      index={0}
      onMove={action('onMove')}
      onDragChange={action('onDragChange')}
      disableDrag={boolean('disableDrag', false)}
      hideDragPreview={boolean('hideDragPreview', false)}
    >
      <div style={{ ...commonStyle, border: '1px solid red' }}>This div is draggable!</div>
    </Draggable>
  </DndProvider>
);

export const withOnRenderChildren = () => (
  <DndProvider backend={Backend}>
    <Draggable
      index={0}
      onRenderChildren={isDragging => (
        <div style={{ ...commonStyle, border: `1px solid ${isDragging ? 'blue' : 'red'}` }}>
          {isDragging ? 'This div is being dragged!' : 'This div is draggable!'}
        </div>
      )}
      onMove={action('onMove')}
      onDragChange={action('onDragChange')}
      disableDrag={boolean('disableDrag', false)}
      hideDragPreview={boolean('hideDragPreview', false)}
    />
  </DndProvider>
);
