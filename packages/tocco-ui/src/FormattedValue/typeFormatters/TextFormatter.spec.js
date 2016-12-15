import React from 'react'
import TextFormatter from './TextFormatter'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('TextFormatter ', function() {
      it('should format value', function() {
        const wrapper = shallow(<TextFormatter
          value="TEST\nTEST"/>)
        expect(wrapper.html()).to.equal('<span><div>TEST</div><div>TEST</div></span>')
      })
    })
  })
})
