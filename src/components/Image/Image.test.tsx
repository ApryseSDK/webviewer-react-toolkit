import { shallow } from 'enzyme';
import React from 'react';
import Image from '../Image';

describe('Image component', () => {
  it('renders its contents', () => {
    const image = shallow(<Image />);
    expect(image.find('.ui__image').length).toEqual(1);
  });

  it('snapshot renders default image', () => {
    const image = shallow(<Image />);
    expect(image).toMatchSnapshot();
  });
});
