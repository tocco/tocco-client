import React from 'react'
import SingleSelectFormatter from './SingleSelectFormatter'
import {mount} from 'enzyme'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('SingleSelectFormatter ', function() {
      it('should format value', function() {
        const value = {key: '3', display: 'Selected'}
        const wrapper = mount(<SingleSelectFormatter
          value={value}/>)
        expect(wrapper.text()).to.equal('Selected')
      })
    })
  })
})
