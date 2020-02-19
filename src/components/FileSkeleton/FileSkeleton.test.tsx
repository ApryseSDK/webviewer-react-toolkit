import { shallow } from 'enzyme';
import React from 'react';
import { FileSkeleton } from '../FileSkeleton';

describe('FileSkeleton component', () => {
  it('renders its contents', () => {
    const fileSkeleton = shallow(<FileSkeleton />);
    expect(fileSkeleton.find('.ui__fileSkeleton')).toHaveLength(1);
  });

  it('snapshot renders default fileSkeleton', () => {
    const fileSkeleton = shallow(<FileSkeleton />);
    expect(fileSkeleton).toMatchSnapshot();
  });
});
