import { mount } from 'enzyme';
import React from 'react';
import Draggable from '../Draggable';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

describe('Draggable component', () => {
  it('renders its contents', () => {
    const draggable = mount(
      <DndProvider backend={Backend}>
        <Draggable index={0}>child</Draggable>
      </DndProvider>,
    );
    expect(draggable.find('.ui__draggable').length).toEqual(1);
  });

  it('snapshot renders default draggable', () => {
    const draggable = mount(
      <DndProvider backend={Backend}>
        <Draggable index={0}>child</Draggable>
      </DndProvider>,
    );
    expect(draggable).toMatchSnapshot();
  });
});
