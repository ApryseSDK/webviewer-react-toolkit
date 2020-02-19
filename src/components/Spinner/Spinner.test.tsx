import { shallow } from 'enzyme';
import React from 'react';
import { Spinner } from '../Spinner';

describe('Spinner component', () => {
  it('renders its contents', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner.find('.ui__spinner')).toHaveLength(1);
  });

  it('snapshot renders default spinner', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner).toMatchSnapshot();
  });
});
