import { shallow } from 'enzyme';
import React from 'react';
import { Modal } from '../Modal';

describe('Modal component', () => {
  it('renders its contents when open', () => {
    const modal = shallow(
      <Modal heading="" open>
        children
      </Modal>,
    );
    expect(modal.find('.ui__modal')).toHaveLength(1);
  });

  it('hides its contents when closed', () => {
    const modal = shallow(<Modal heading="">children</Modal>);
    expect(modal.find('.ui__modal')).toHaveLength(0);
  });

  it('snapshot renders default modal', () => {
    const modal = shallow(<Modal heading="">children</Modal>);
    expect(modal).toMatchSnapshot();
  });
});
