import React from 'react'
import SingleSelectFormatter from './SingleSelectFormatter'
import {mount} from 'enzyme'

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
