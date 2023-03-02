import { boolean } from '@storybook/addon-knobs';
import React, { CSSProperties } from 'react';
import { action } from '../../storybook-helpers/action/action';
import { DndMultiProvider } from '../DndMultiProvider';
import { Draggable } from '../Draggable';
import readme from './README.md';

export default { title: 'Components/Draggable', component: Draggable, parameters: { readme } };

const commonStyle: CSSProperties = {
  padding: 16,
  background: 'lightgray',
  color: 'black',
  width: 200,
  height: 50,
  textAlign: 'center',
};

export const Basic = () => (
  <DndMultiProvider>
    <Draggable
      index={0}
      onDragChange={action('onDragChange')}
      disableDrag={boolean('disableDrag', false)}
      hideDragPreview={boolean('hideDragPreview', false)}
    >
      <div style={{ ...commonStyle, border: '1px solid red' }}>This div is draggable!</div>
    </Draggable>
  </DndMultiProvider>
);

export const WithOnRenderChildren = () => (
  <DndMultiProvider>
    <Draggable
      index={0}
      onRenderChildren={isDragging => (
        <div style={{ ...commonStyle, border: `1px solid ${isDragging ? 'blue' : 'red'}` }}>
          {isDragging ? 'This div is being dragged!' : 'This div is draggable!'}
        </div>
      )}
      onDragChange={action('onDragChange')}
      disableDrag={boolean('disableDrag', false)}
      hideDragPreview={boolean('hideDragPreview', false)}
    />
  </DndMultiProvider>
);
