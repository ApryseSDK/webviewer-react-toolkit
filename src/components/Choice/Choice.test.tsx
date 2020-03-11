import { mount, shallow } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import { Choice } from '../Choice';

describe('Choice component', () => {
  it('renders its contents', () => {
    const choice = shallow(<Choice label="" />);
    expect(choice.find('.ui__choice')).toHaveLength(1);
  });

  it('snapshot renders default choice', () => {
    const choice = shallow(<Choice label="" />);
    expect(choice).toMatchSnapshot();
  });

  it('clicking choice triggers onClick prop', () => {
    const onChange = spy();
    shallow(<Choice onChange={onChange} label="" />).simulate('click');
    expect(onChange.callCount).toBe(1);
  });

  it('clicking disabled choice does not trigger onClick prop', () => {
    const onChange = spy();
    // full DOM mount so `choice` element will use disabled prop
    mount(<Choice onChange={onChange} disabled label="" />).simulate('click');
    expect(onChange.callCount).toBe(0);
  });
});
