import React from 'react'
import {shallow} from 'enzyme'

import PhoneFormatter from './PhoneFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('PhoneFormatter ', () => {
        test('should format valid phone numbers', () => {
          const wrapper = shallow(<PhoneFormatter value="+41443886000"/>)
          expect(wrapper.text()).to.equal('+41 44 388 60 00')
        })

        test('should show original string if its not a valid phonenumber', () => {
          const invalidPhoneNumber = '+123 456'
          const wrapper = shallow(<PhoneFormatter value={invalidPhoneNumber}/>)
          expect(wrapper.text()).to.equal(invalidPhoneNumber)
        })
      })
    })
  })
})
