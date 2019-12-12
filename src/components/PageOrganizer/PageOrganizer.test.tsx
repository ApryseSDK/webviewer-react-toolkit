import { shallow } from 'enzyme';
import React from 'react';
import PageOrganizer from '../PageOrganizer';
import { File } from '../../hooks/useFile';

const file: File = {
  id: 'test',
  name: 'test_name',
  extension: 'pdf',
  originalName: 'original_name',
  thumbnail: undefined,
};

describe('PageOrganizer component', () => {
  it('renders its contents', () => {
    const pageOrganizer = shallow(<PageOrganizer files={[file]} onRenderThumbnail={() => 'Thumbnail'} />);
    expect(pageOrganizer.find('.ui__pageOrganizer').length).toEqual(1);
  });

  it('snapshot renders default pageOrganizer', () => {
    const pageOrganizer = shallow(<PageOrganizer files={[file]} onRenderThumbnail={() => 'Thumbnail'} />);
    expect(pageOrganizer).toMatchSnapshot();
  });
});
