import { shallow } from 'enzyme';
import React from 'react';
import { FilePicker } from '../FilePicker';

describe('FilePicker component', () => {
  it('renders its contents', () => {
    const filePicker = shallow(<FilePicker items={[]} />);
    expect(filePicker.find('.ui__filePicker')).toHaveLength(1);
  });

  it('snapshot renders default filePicker', () => {
    const filePicker = shallow(<FilePicker items={[]} />);
    expect(filePicker).toMatchSnapshot();
  });
});
