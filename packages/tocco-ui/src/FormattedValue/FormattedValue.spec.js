import React from 'react'
import FormattedValue from './FormattedValue'
import {shallow} from 'enzyme'
import DateFormatter from './typeFormatters/DateFormatter'
import StringFormatter from './typeFormatters/StringFormatter'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    it('should render a string value', function() {
      const wrapper = shallow(<FormattedValue type="string" value="test"/>)
      expect(wrapper.find(StringFormatter)).to.have.length(1)
    })

    it('should render a date value', function() {
      const wrapper = shallow(<FormattedValue type="date" value="1976-03-16T12:00:00.000Z"/>)
      expect(wrapper.find(DateFormatter)).to.have.length(1)
    })
  })
})
