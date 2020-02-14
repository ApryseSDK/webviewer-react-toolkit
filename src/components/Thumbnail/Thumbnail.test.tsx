import { shallow } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import { createFile } from '../../storybook-helpers/data/files';
import { Thumbnail } from '../Thumbnail';

const testFile = createFile(0, { pending: true });

describe('Thumbnail component', () => {
  it('renders its contents', () => {
    const thumbnail = shallow(<Thumbnail file={testFile} />);
    expect(thumbnail.find('.ui__thumbnail')).toHaveLength(1);
  });

  it('snapshot renders default thumbnail', () => {
    const thumbnail = shallow(<Thumbnail file={testFile} />);
    expect(thumbnail).toMatchSnapshot();
  });

  it('clicking thumbnail triggers onClick prop', () => {
    const onClick = spy();
    shallow(<Thumbnail file={testFile} onClick={onClick} />).simulate('click');
    expect(onClick.callCount).toBe(1);
  });
});
