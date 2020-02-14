import { shallow } from 'enzyme';
import React from 'react';
import { EditableText } from '../EditableText';

describe('EditableText component', () => {
  it('renders its contents', () => {
    const editableText = shallow(<EditableText />);
    expect(editableText.find('.ui__editableText')).toHaveLength(1);
  });

  it('snapshot renders default editableText', () => {
    const editableText = shallow(<EditableText />);
    expect(editableText).toMatchSnapshot();
  });
});
