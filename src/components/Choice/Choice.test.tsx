import { shallow } from 'enzyme';
import React from 'react';
import { Choice } from '../Choice';

describe('Choice component', () => {
  it('renders its contents', () => {
    const choice = shallow(<Choice label="Label" />);
    expect(choice.find('.ui__choice')).toHaveLength(1);
  });

  it('snapshot renders default choice', () => {
    const choice = shallow(<Choice label="Label" />);
    expect(choice).toMatchSnapshot();
  });
});
