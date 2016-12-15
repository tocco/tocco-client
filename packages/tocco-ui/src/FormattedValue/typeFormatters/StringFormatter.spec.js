import React from 'react'
import StringFormatter from './StringFormatter'
import {mount} from 'enzyme'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('StringFormatter ', function() {
      it('should format value', function() {
        const wrapper = mount(<StringFormatter
          value="TEST TEST"/>)
        expect(wrapper.text()).to.equal('TEST TEST')
      })
    })
  })
})
