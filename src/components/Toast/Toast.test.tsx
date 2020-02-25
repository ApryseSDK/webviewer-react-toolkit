import { shallow } from 'enzyme';
import React from 'react';
import { Toast } from '../Toast';

jest.mock('../../utils', () => ({ getStringId: (prefix: string) => `${prefix}_1234` }));

describe('Toast component', () => {
  it('renders its contents', () => {
    const toast = shallow(<Toast heading={''} />);
    expect(toast.find('.ui__toast')).toHaveLength(1);
  });

  it('snapshot renders default toast', () => {
    const toast = shallow(<Toast heading={''} />);
    expect(toast).toMatchSnapshot();
  });
});
