import React from 'react'
import PhoneFormatter from './PhoneFormatter'
import {shallow} from 'enzyme'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('PhoneFormatter ', () => {
      it('should format valid phone numbers', () => {
        const wrapper = shallow(<PhoneFormatter value="+41443886000"/>)
        expect(wrapper.text()).to.equal('+41 44 388 60 00')
      })

      it('should show original string if its not a valid phonenumber', () => {
        const invalidPhoneNumber = '+123 456'
        const wrapper = shallow(<PhoneFormatter value={invalidPhoneNumber}/>)
        expect(wrapper.text()).to.equal(invalidPhoneNumber)
      })
    })
  })
})
