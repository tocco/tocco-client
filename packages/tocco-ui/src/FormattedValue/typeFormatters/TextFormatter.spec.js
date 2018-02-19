import React from 'react'
import TextFormatter from './TextFormatter'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('TextFormatter ', function() {
      it('should format value', function() {
        const wrapper = shallow(<TextFormatter value="TEST\nTEST"/>)
        expect(wrapper.find('span')).to.have.length(1)
        expect(wrapper.find('span')).to.have.style('white-space', 'pre-wrap')
      })
    })
  })
})
