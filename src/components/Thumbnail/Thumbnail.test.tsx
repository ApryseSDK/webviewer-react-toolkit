import { mount, shallow } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import Thumbnail from '../Thumbnail';

describe('Thumbnail component', () => {
  it('renders its contents', () => {
    const thumbnail = shallow(<Thumbnail />);
    expect(thumbnail.find('.ui__thumbnail').length).toEqual(1);
  });

  it('snapshot renders default thumbnail', () => {
    const thumbnail = shallow(<Thumbnail />);
    expect(thumbnail).toMatchSnapshot();
  });

  it('clicking thumbnail triggers onClick prop', () => {
    const onClick = spy();
    shallow(<Thumbnail onClick={onClick} />).simulate('click');
    expect(onClick.callCount).toBe(1);
  });

  it('clicking disabled thumbnail does not trigger onClick prop', () => {
    const onClick = spy();
    // full DOM mount so `thumbnail` element will use disabled prop
    mount(<Thumbnail onClick={onClick} disabled />).simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
