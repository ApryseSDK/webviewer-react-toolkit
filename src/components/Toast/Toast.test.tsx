import { shallow } from 'enzyme';
import React from 'react';
import { Toast } from '../Toast';

describe('Toast component', () => {
  it('renders its contents', () => {
    const toast = shallow(<Toast heading={''} />);
    expect(toast.find('.ui__toast').length).toEqual(1);
  });

  it('snapshot renders default toast', () => {
    const toast = shallow(<Toast heading={''} />);
    expect(toast).toMatchSnapshot();
  });
});
