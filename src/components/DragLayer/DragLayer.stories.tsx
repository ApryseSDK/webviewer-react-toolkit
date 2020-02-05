import React, { CSSProperties } from 'react';
import { DndMultiProvider } from '../DndMultiProvider';
import { Draggable } from '../Draggable';
import { DragLayer } from '../DragLayer';
import info from './README.md';

export default { title: 'Components/DragLayer', component: DragLayer, parameters: { info } };

const WIDTH = 200;
const HEIGHT = 50;

const commonStyle: CSSProperties = {
  padding: 16,
  background: 'lightgray',
  color: 'black',
  width: WIDTH,
  height: HEIGHT,
  textAlign: 'center',
};

export const Basic = () => (
  <DndMultiProvider>
    <Draggable index={0} hideDragPreview={true}>
      <div style={{ ...commonStyle, border: '1px solid red' }}>This div is draggable!</div>
    </Draggable>
    <DragLayer>
      <div style={{ ...commonStyle, border: '1px solid blue', opacity: 0.9, boxShadow: '0 0 26px 0 rgba(0,0,0,0.2)' }}>
        Custom preview!
      </div>
    </DragLayer>
  </DndMultiProvider>
);

export const WithCustomTranslate = () => (
  <DndMultiProvider>
    <Draggable index={0} hideDragPreview={true}>
      <div style={{ ...commonStyle, border: '1px solid red' }}>This div is draggable!</div>
    </Draggable>
    <DragLayer
      customTranslate={({ mousePosition }) => {
        const x = mousePosition.x - WIDTH / 2;
        const y = mousePosition.y - HEIGHT / 2;
        return { x, y };
      }}
    >
      <div style={{ ...commonStyle, border: '1px solid blue', opacity: 0.9, boxShadow: '0 0 26px 0 rgba(0,0,0,0.2)' }}>
        Custom preview!
      </div>
    </DragLayer>
  </DndMultiProvider>
);
