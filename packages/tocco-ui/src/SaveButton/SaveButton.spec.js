import assert from 'assert'
import React from 'react'
import SaveButton from './SaveButton'
import {mount, render, shallow} from 'enzyme'

describe('merge-action', function () {
  describe('SaveButton Component', function () {
    it('handles click events', () => {
      const onButtonClick = sinon.spy();
      const wrapper = shallow(
        <SaveButton onClick={onButtonClick} />
      );
      wrapper.find('button').simulate('click');
      expect(onButtonClick).to.have.property('callCount', 1);
    });

  })
})
