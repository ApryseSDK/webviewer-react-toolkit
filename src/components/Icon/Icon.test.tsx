import { shallow } from 'enzyme';
import React from 'react';
import { Icon } from '../Icon';

describe('Icon component', () => {
  it('renders its contents', () => {
    const icon = shallow(<Icon icon="Close" />);
    expect(icon.find('.ui__icon')).toHaveLength(1);
  });

  it('snapshot renders default icon', () => {
    const icon = shallow(<Icon icon="Close" />);
    expect(icon).toMatchSnapshot();
  });
});
