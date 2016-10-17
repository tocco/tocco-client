import assert from 'assert'
import React from 'react'
import Button from './Button'
import {mount, render, shallow} from 'enzyme'

describe('merge-action', function () {
  describe('Button Component', function () {
    it('handles click events', () => {
      const onButtonClick = sinon.spy();
      const wrapper = shallow(
        <Button onClick={onButtonClick} />
      );
      wrapper.find('button').simulate('click');
      expect(onButtonClick).to.have.property('callCount', 1);
    });


    // it('can be disabled', () => {
    //   let wrapper = shallow(
    //     <Button/>
    //   )
    //   expect(wrapper.find('button')).to.not.have.property('disabled')
    //
    //   wrapper = shallow(
    //     <Button disabled={false}/>
    //   )
    //   expect(wrapper.find('button')).to.not.have.property('disabled')
    //
    //   wrapper = shallow(
    //     <Button disabled={true}/>
    //   )
    //
    //  expect(wrapper.find('button')).to.have.attr('disabled', true)
    // })
  })
})
