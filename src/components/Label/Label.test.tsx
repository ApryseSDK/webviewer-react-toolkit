import { shallow } from 'enzyme';
import React from 'react';
import { Label } from '../Label';

describe('Label component', () => {
  it('renders its contents', () => {
    const label = shallow(<Label label="" />);
    expect(label.find('.ui__label')).toHaveLength(1);
  });

  it('snapshot renders default label', () => {
    const label = shallow(<Label label="" />);
    expect(label).toMatchSnapshot();
  });
});
