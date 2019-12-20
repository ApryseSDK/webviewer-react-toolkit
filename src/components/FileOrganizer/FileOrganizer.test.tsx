import { shallow } from 'enzyme';
import React from 'react';
import FileOrganizer from '../FileOrganizer';

describe('FileOrganizer component', () => {
  it('renders its contents', () => {
    const fileOrganizer = shallow(<FileOrganizer files={[]} onRenderThumbnail={() => 'Thumbnail'} />);
    expect(fileOrganizer.find('.ui__fileOrganizer').length).toEqual(1);
  });

  it('snapshot renders default FileOrganizer', () => {
    const fileOrganizer = shallow(<FileOrganizer files={[]} onRenderThumbnail={() => 'Thumbnail'} />);
    expect(fileOrganizer).toMatchSnapshot();
  });
});
