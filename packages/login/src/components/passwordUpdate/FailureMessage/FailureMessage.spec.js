import React from 'react'
import {FormattedMessage} from 'react-intl'
import {shallow} from 'enzyme'

import FailureMessage from './FailureMessage'
import {messages, DEFAULT as DEFAULT_MESSAGE} from './messages'

describe('login', () => {
  describe('components', () => {
    describe('FailureMessage', () => {
      test('should render default message if no error code', () => {
        const wrapper = shallow(<FailureMessage/>)
        expect(wrapper.find(FormattedMessage).prop('id')).to.be.equal(DEFAULT_MESSAGE)
      })

      test('should render default message if error code unknown', () => {
        const wrapper = shallow(<FailureMessage errorCode="UNKNOWN_CODE"/>)
        expect(wrapper.find(FormattedMessage).prop('id')).to.be.equal(DEFAULT_MESSAGE)
      })

      test('should render specific message if error code known', () => {
        const wrapper = shallow(<FailureMessage errorCode="INVALID_CREDENTIALS"/>)
        expect(wrapper.find(FormattedMessage).prop('id')).to.be.equal(messages.INVALID_CREDENTIALS)
      })
    })
  })
})
