import { shallow } from 'enzyme';
import React from 'react';
import { Input } from '../Input';

describe('Input component', () => {
  it('renders its contents', () => {
    const input = shallow(<Input />);
    expect(input.find('.ui__input')).toHaveLength(1);
  });

  it('snapshot renders default input', () => {
    const input = shallow(<Input />);
    expect(input).toMatchSnapshot();
  });
});
