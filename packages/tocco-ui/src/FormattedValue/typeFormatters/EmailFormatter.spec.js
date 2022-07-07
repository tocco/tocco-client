import {mount} from 'enzyme'
import React from 'react'

import EmailFormatter from './EmailFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('EmailFormatter ', () => {
        test('should format value', () => {
          const wrapper = mount(<EmailFormatter value="support@tocco.ch" />)
          expect(wrapper.text()).to.equal('support@tocco.ch')
        })
      })
    })
  })
})
