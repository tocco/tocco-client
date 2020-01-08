import React from 'react'
import {mount} from 'enzyme'

import TextFormatter from './TextFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('TextFormatter ', () => {
        test('should format value', () => {
          const wrapper = mount(<TextFormatter breakWords={true} value={'Lorem\nipsum'}/>)
          expect(wrapper.find('p')).to.have.length(2)
        })
      })
    })
  })
})
