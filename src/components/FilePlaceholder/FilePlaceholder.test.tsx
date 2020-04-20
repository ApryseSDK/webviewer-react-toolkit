import { mount, shallow } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import { FilePlaceholder } from '../FilePlaceholder';

describe('FilePlaceholder component', () => {
  it('renders its contents', () => {
    const filePlaceholder = shallow(<FilePlaceholder />);
    expect(filePlaceholder.find('.ui__filePlaceholder')).toHaveLength(1);
  });

  it('snapshot renders default filePlaceholder', () => {
    const filePlaceholder = shallow(<FilePlaceholder />);
    expect(filePlaceholder).toMatchSnapshot();
  });

  it('clicking filePlaceholder triggers onClick prop', () => {
    const onClick = spy();
    shallow(<FilePlaceholder onClick={onClick} />).simulate('click');
    expect(onClick.callCount).toBe(1);
  });

  it('clicking disabled filePlaceholder does not trigger onClick prop', () => {
    const onClick = spy();
    // full DOM mount so `filePlaceholder` element will use disabled prop
    mount(<FilePlaceholder onClick={onClick} disabled />).simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
