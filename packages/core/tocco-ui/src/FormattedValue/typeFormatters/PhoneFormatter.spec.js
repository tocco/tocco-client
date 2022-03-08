import {mount} from 'enzyme'
import React from 'react'

import PhoneFormatter from './PhoneFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('PhoneFormatter ', () => {
        test('should format valid phone numbers', () => {
          const wrapper = mount(<PhoneFormatter value="+41443886000" />)
          return wrapper
            .instance()
            .importLibPhoneNumber()
            .then(() => expect(wrapper.text()).to.equal('+41 44 388 60 00'))
        })

        test('should show original string if its not a valid phone number', () => {
          const invalidPhoneNumber = '+41 4438860011111110'
          const wrapper = mount(<PhoneFormatter value={invalidPhoneNumber} />)
          return wrapper
            .instance()
            .importLibPhoneNumber()
            .then(() => expect(wrapper.text()).to.equal(invalidPhoneNumber))
        })
      })
    })
  })
})
