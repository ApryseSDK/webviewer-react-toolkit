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
  mutateDocumentObj: () => console.log('test'),
  mutateFileObj: () => console.log('test'),
  setDocumentObj: async () => console.log('test'),
  setFileObj: async () => console.log('test'),
  setName: async () => console.log('test'),
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
    mount(<Thumbnail file={testFile} onClick={onClick} />).simulate('click');
    expect(onClick.callCount).toBe(1);
  });

  it('clicking disabled thumbnail does not trigger onClick prop', () => {
    const onClick = spy();
    mount(<Thumbnail file={testFile} onClick={onClick} disabled />).simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
