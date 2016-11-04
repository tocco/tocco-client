import React from 'react'
import DateFieldLabel from './DateFieldLabel'
import {shallow} from 'enzyme'

describe('merge', function() {
  describe('components', function() {
    describe('FieldLabel ', function() {
      describe('DateLabel ', function() {
        it('should format value', function() {
          const wrapper = shallow(<DateFieldLabel value="1976-03-16T12:00:00.000Z"/>)
          expect(wrapper.text()).to.equal('16. Mrz. 1976')
        })

        it('should format value accorind to locale', function() {
          const wrapper = shallow(<DateFieldLabel value="1976-03-16T12:00:00.000Z" locale="en"/>)
          expect(wrapper.text()).to.equal('Mar 16, 1976')
        })
      })
    })
  })
})
