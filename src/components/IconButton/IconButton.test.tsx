import { mount, shallow } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import { IconButton } from '../IconButton';

describe('IconButton component', () => {
  it('renders its contents', () => {
    const iconButton = shallow(<IconButton />);
    expect(iconButton.find('.ui__iconButton')).toHaveLength(1);
  });

  it('snapshot renders default iconButton', () => {
    const iconButton = shallow(<IconButton />);
    expect(iconButton).toMatchSnapshot();
  });

  it('clicking iconButton triggers onClick prop', () => {
    const onClick = spy();
    shallow(<IconButton onClick={onClick} />).simulate('click');
    expect(onClick.callCount).toBe(1);
  });

  it('clicking disabled iconButton does not trigger onClick prop', () => {
    const onClick = spy();
    // full DOM mount so `iconButton` element will use disabled prop
    mount(<IconButton onClick={onClick} disabled />).simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
