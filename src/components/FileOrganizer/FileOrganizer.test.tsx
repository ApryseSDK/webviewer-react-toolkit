import { shallow } from 'enzyme';
import React from 'react';
import FileOrganizer from '../FileOrganizer';
import { File } from '../../hooks/useFile';

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

describe('FileOrganizer component', () => {
  it('renders its contents', () => {
    const fileOrganizer = shallow(<FileOrganizer files={[testFile]} onRenderThumbnail={() => 'Thumbnail'} />);
    expect(fileOrganizer.find('.ui__fileOrganizer').length).toEqual(1);
  });

  it('snapshot renders default FileOrganizer', () => {
    const fileOrganizer = shallow(<FileOrganizer files={[testFile]} onRenderThumbnail={() => 'Thumbnail'} />);
    expect(fileOrganizer).toMatchSnapshot();
  });
});
