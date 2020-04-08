import { shallow } from 'enzyme';
import React from 'react';
import { Image } from '../Image';

describe('Image component', () => {
  it('snapshot renders default image', () => {
    const image = shallow(<Image />);
    expect(image).toMatchSnapshot();
  });
});
