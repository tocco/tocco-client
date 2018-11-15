import {mount} from 'enzyme'
import React from 'react'

import SomeOf from './SomeOf'

describe('tocco-ui', () => {
  describe('SomeOf', () => {
    test('should display values', () => {
      const wrapper = mount(<SomeOf some={12} of={345}/>)
      expect(wrapper.find('span').text()).to.equal('12 / 345')
    })

    test('should have one defaultProps', () => {
      expect(SomeOf.defaultProps.some).to.equal(0)
    })
  })
})
