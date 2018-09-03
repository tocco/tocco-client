import React from 'react'
import {mount} from 'enzyme'

import SingleSelectFormatter from './SingleSelectFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('SingleSelectFormatter ', () => {
        it('should format value', () => {
          const value = {key: '3', display: 'Selected'}
          const wrapper = mount(<SingleSelectFormatter
            value={value}/>)
          expect(wrapper.text()).to.equal('Selected')
        })
      })
    })
  })
})
