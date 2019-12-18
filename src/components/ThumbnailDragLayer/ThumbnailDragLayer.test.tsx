import { shallow } from 'enzyme';
import React from 'react';
import ThumbnailDragLayer from '../ThumbnailDragLayer';

describe('ThumbnailDragLayer component', () => {
  it('renders its contents', () => {
    const thumbnailDragLayer = shallow(<ThumbnailDragLayer />);
    expect(thumbnailDragLayer.find('.ui__thumbnailDragLayer').length).toEqual(1);
  });

  it('snapshot renders default thumbnailDragLayer', () => {
    const thumbnailDragLayer = shallow(<ThumbnailDragLayer />);
    expect(thumbnailDragLayer).toMatchSnapshot();
  });
});
