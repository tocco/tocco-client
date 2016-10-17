import React from 'react'
import {FormattedMessage} from 'react-intl'
import {mount, render, shallow} from 'enzyme'
import FailureMessage from './FailureMessage'
import {messages, DEFAULT as DEFAULT_MESSAGE} from './messages'

describe('login', function() {
  describe('components', function() {
    describe('FailureMessage', function() {
      it('should render default message if no error code', () => {
        const wrapper = shallow(<FailureMessage/>)
        const expected = (
          <div className="FailureMessage text-danger">
            <FormattedMessage id={DEFAULT_MESSAGE}/>
          </div>
        )
        expect(wrapper.equals(expected)).to.equal(true)
      })

      it('should render default message if error code unknown', () => {
        const wrapper = shallow(<FailureMessage errorCode="UNKNOWN_CODE"/>)
        const expected = (
          <div className="FailureMessage text-danger">
            <FormattedMessage id={DEFAULT_MESSAGE}/>
          </div>
        )
        expect(wrapper.equals(expected)).to.equal(true)
      })

      it('should render specific message if error code known', () => {
        const wrapper = shallow(<FailureMessage errorCode="INVALID_CREDENTIALS"/>)
        const expected = (
          <div className="FailureMessage text-danger">
            <FormattedMessage id={messages['INVALID_CREDENTIALS']}/>
          </div>
        )
        expect(wrapper.equals(expected)).to.equal(true)
      })
    })
  })
})
