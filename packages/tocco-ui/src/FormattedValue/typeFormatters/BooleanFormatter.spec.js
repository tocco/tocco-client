import React from 'react'
import {mount} from 'enzyme'
import BooleanFormatter from './BooleanFormatter'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('typeFormatters', () => {
      describe('BooleanFormatter ', function() {
        it('should format true value', function() {
          const wrapper = mount(
            <BooleanFormatter value/>
          )
          expect(wrapper.html()).to.contains('glyphicon-ok')
        })

        it('should format falsy value', function() {
          const wrapper = mount(
            <BooleanFormatter value={false}/>
          )
          expect(wrapper.html()).to.contains('glyphicon-remove')
        })
      })
    })
  })
})
