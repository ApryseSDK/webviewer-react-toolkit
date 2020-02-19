import { mount, shallow } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import { Button } from '../Button';

describe('Button component', () => {
  it('renders its contents', () => {
    const button = shallow(<Button />);
    expect(button.find('.ui__button')).toHaveLength(1);
  });

  it('snapshot renders default button', () => {
    const button = shallow(<Button />);
    expect(button).toMatchSnapshot();
  });

  it('clicking button triggers onClick prop', () => {
    const onClick = spy();
    shallow(<Button onClick={onClick} />).simulate('click');
    expect(onClick.callCount).toBe(1);
  });

  it('clicking disabled button does not trigger onClick prop', () => {
    const onClick = spy();
    mount(<Button onClick={onClick} disabled />).simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
