import React, { CSSProperties } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import Draggable from '../Draggable';
import DragLayer from '../DragLayer';
import docs from './README.md';

export default { title: 'DragLayer', parameters: { info: { text: docs, propTablesExclude: [Draggable] } } };

const commonStyle: CSSProperties = {
  padding: 16,
  background: 'lightgray',
  width: 200,
  height: 50,
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
