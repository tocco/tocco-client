import {mount} from 'enzyme'
import React from 'react'

import SomeOf from './SomeOf'

describe('tocco-ui', () => {
  describe('SomeOf', () => {
    test('should display values', () => {
      const wrapper = mount(<SomeOf some={12} of={345}/>)
      const text = wrapper.find('span').text()
      expect(text).to.include('12')
      expect(text).to.include('345')
      expect(text.length).to.be.at.least(6)
    })

    test('should have one defaultProps', () => {
      expect(SomeOf.defaultProps.some).to.equal(0)
    })
  })
})
