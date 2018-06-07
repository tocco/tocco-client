import React from 'react'
import TextFormatter from './TextFormatter'
import {mount} from 'enzyme'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('TextFormatter ', () => {
        it('should format value', () => {
          const wrapper = mount(<TextFormatter value={'Lorem\nipsum'}/>)
          expect(wrapper.find('p')).to.have.length(2)
        })
      })
    })
  })
})
