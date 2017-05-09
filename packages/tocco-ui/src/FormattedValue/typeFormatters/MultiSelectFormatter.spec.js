import React from 'react'
import MultiSelectFormatter from './MultiSelectFormatter'
import {mount} from 'enzyme'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('MultiSelectFormatter ', function() {
      it('should format value', function() {
        const value = [{key: '3', display: 'Selected'}, {key: '4', display: 'Selected2'}]
        const wrapper = mount(<MultiSelectFormatter
          value={value}/>)
        expect(wrapper.text()).to.equal('Selected, Selected2')
      })
    })
  })
})
