import { mount } from 'enzyme';
import React from 'react';
import DraggableWrapper from '../DraggableWrapper';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

describe('DraggableWrapper component', () => {
  it('renders its contents', () => {
    const draggableWrapper = mount(
      <DndProvider backend={Backend}>
        <DraggableWrapper index={0}>child</DraggableWrapper>
      </DndProvider>,
    );
    expect(draggableWrapper.find('.ui__draggableWrapper').length).toEqual(1);
  });

  it('snapshot renders default draggableWrapper', () => {
    const draggableWrapper = mount(
      <DndProvider backend={Backend}>
        <DraggableWrapper index={0}>child</DraggableWrapper>
      </DndProvider>,
    );
    expect(draggableWrapper).toMatchSnapshot();
  });
});
