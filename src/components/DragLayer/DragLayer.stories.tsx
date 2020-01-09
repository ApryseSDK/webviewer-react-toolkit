import React, { CSSProperties } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import Draggable from '../Draggable';
import DragLayer from '../DragLayer';
import docs from './README.md';

export default { title: 'DragLayer', component: DragLayer, parameters: { info: docs } };

const WIDTH = 200;
const HEIGHT = 50;

const commonStyle: CSSProperties = {
  padding: 16,
  background: 'lightgray',
  width: WIDTH,
  height: HEIGHT,
  textAlign: 'center',
};

export const basic = () => (
  <DndProvider backend={Backend}>
    <Draggable index={0} hideDragPreview={true}>
      <div style={{ ...commonStyle, border: '1px solid red' }}>This div is draggable!</div>
    </Draggable>
    <DragLayer>
      <div style={{ ...commonStyle, border: '1px solid blue', opacity: 0.9 }}>Custom preview!</div>
    </DragLayer>
  </DndProvider>
);

export const withCustomTranslate = () => (
  <DndProvider backend={Backend}>
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
      <div style={{ ...commonStyle, border: '1px solid blue', opacity: 0.9 }}>Custom preview!</div>
    </DragLayer>
  </DndProvider>
);
