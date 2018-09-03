import React from 'react'
import {mount} from 'enzyme'

import TextFormatter from './TextFormatter'

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
