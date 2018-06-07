import React from 'react'
import TextFormatter from './TextFormatter'
import {shallow} from 'enzyme'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('TextFormatter ', () => {
        it('should format value', () => {
          const wrapper = shallow(<TextFormatter value="TEST\nTEST"/>)
          expect(wrapper.find('span')).to.have.length(1)
          expect(wrapper.find('span')).to.have.style('white-space', 'pre-wrap')
        })
      })
    })
  })
})
