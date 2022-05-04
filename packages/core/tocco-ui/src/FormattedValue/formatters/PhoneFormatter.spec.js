import {mount} from 'enzyme'

import LibPhoneFormatter from './LibPhoneFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('formatters', () => {
      describe('PhoneFormatter ', () => {
        test('should format valid phone numbers', () => {
          const wrapper = mount(<LibPhoneFormatter value="+41443886000" />)
          const correctFormat = '+41 44 388 60 00'
          expect(wrapper.text()).to.equal(correctFormat)
        })

        test('should show original string if its not a valid phone number', () => {
          const invalidPhoneNumber = '+41 4438860011111110'
          const wrapper = mount(<LibPhoneFormatter value={invalidPhoneNumber} />)
          expect(wrapper.text()).to.equal(invalidPhoneNumber)
        })
      })
    })
  })
})
