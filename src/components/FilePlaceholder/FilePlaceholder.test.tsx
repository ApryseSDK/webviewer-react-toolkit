import { shallow } from 'enzyme';
import React from 'react';
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
});
