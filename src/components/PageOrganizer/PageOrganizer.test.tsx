import { shallow } from 'enzyme';
import React from 'react';
import PageOrganizer from '../PageOrganizer';
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

describe('PageOrganizer component', () => {
  it('renders its contents', () => {
    const pageOrganizer = shallow(<PageOrganizer files={[testFile]} onRenderThumbnail={() => 'Thumbnail'} />);
    expect(pageOrganizer.find('.ui__pageOrganizer').length).toEqual(1);
  });

  it('snapshot renders default pageOrganizer', () => {
    const pageOrganizer = shallow(<PageOrganizer files={[testFile]} onRenderThumbnail={() => 'Thumbnail'} />);
    expect(pageOrganizer).toMatchSnapshot();
  });
});
