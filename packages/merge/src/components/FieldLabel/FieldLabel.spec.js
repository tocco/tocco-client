import React from 'react'
import FieldLabel from './FieldLabel'
import {shallow} from 'enzyme'
import DateFieldLabel from './TypeLabels/DateFieldLabel'
import StringLabel from './TypeLabels/StringLabel'

describe('merge', function () {
  describe('components', function () {
    describe('FieldLabel ', function () {
      it('should render a string value', function () {
        var field = {type: 'string', value: 'Test123'}
        let wrapper = shallow(<FieldLabel field={field}/>)
        expect(wrapper.find(StringLabel)).to.have.length(1)
      })

      it('should render a date value', function () {
        var field = {type: 'date', value: '1976-03-15T23:00:00.000Z'}
        let wrapper = shallow(<FieldLabel field={field}/>)
        expect(wrapper.find(DateFieldLabel)).to.have.length(1)
      })
    })
  })
})
