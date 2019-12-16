import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import Draggable from '../Draggable';
import docs from './README.md';

export default { title: 'Draggable', parameters: { info: docs } };

export const basic = () => (
  <DndProvider backend={Backend}>
    <Draggable index={0}>
      <div style={{ padding: 16, border: '1px solid red', background: 'lightgray' }}>This div is draggable</div>
    </Draggable>
  </DndProvider>
);
