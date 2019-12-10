import { mount, shallow } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import { File } from '../../hooks/useFile';
import Thumbnail from '../Thumbnail';

const testFile: File = {
  id: 'test',
  name: 'Test name',
  extension: 'pdf',
  originalName: 'Test original name',
};

describe('Thumbnail component', () => {
  it('renders its contents', () => {
    const thumbnail = shallow(<Thumbnail file={testFile} />);
    expect(thumbnail.find('.ui__thumbnail').length).toEqual(1);
  });

  it('snapshot renders default thumbnail', () => {
    const thumbnail = shallow(<Thumbnail file={testFile} />);
    expect(thumbnail).toMatchSnapshot();
  });

  it('clicking thumbnail triggers onClick prop', () => {
    const onClick = spy();
    shallow(<Thumbnail file={testFile} onClick={onClick} />).simulate('click');
    expect(onClick.callCount).toBe(1);
  });

  it('clicking disabled thumbnail does not trigger onClick prop', () => {
    const onClick = spy();
    // full DOM mount so `thumbnail` element will use disabled prop
    mount(<Thumbnail file={testFile} onClick={onClick} disabled />).simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
