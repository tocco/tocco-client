import React from 'react'
import FailureMessage from './FailureMessage'
import {mount, render, shallow} from 'enzyme'
import {messages, DEFAULT as DEFAULT_MESSAGE} from './messages'

describe('password-update', function() {
  describe('components', function() {
    describe('FailureMessage', function() {
      it('should render default message if no error code', () => {
        const wrapper = shallow(<FailureMessage/>)
        expect(wrapper.text()).to.equal(DEFAULT_MESSAGE)
      })

      it('should render default message if error code unknown', () => {
        const wrapper = shallow(<FailureMessage errorCode="UNKNOWN_CODE"/>)
        expect(wrapper.text()).to.equal(DEFAULT_MESSAGE)
      })

      it('should render specific message if error code known', () => {
        const wrapper = shallow(<FailureMessage errorCode="INVALID_CREDENTIALS"/>)
        expect(wrapper.text()).to.equal(messages['INVALID_CREDENTIALS'])
      })

      it('should add class names', () => {
        const wrapper = shallow(<FailureMessage/>)
        expect(wrapper.hasClass('FailureMessage text-danger')).to.equal(true)
      })
    })
  })
})
