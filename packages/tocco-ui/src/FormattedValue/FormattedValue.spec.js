import React from 'react'
import {shallow} from 'enzyme'

import FormattedValue from './FormattedValue'
import DateFormatter from './typeFormatters/DateFormatter'
import StringFormatter from './typeFormatters/StringFormatter'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    it('should render a string value', function() {
      const wrapper = shallow(<FormattedValue type="string" value="test"/>)
      expect(wrapper.find(StringFormatter)).to.have.length(1)
    })

    it('should render a date value', function() {
      const wrapper = shallow(<FormattedValue type="date" value="1976-03-16"/>)
      expect(wrapper.find(DateFormatter)).to.have.length(1)
    })

    it('should return an empty span on a undefined input', function() {
      const wrapper = shallow(<FormattedValue type="string" value={undefined}/>)
      expect(wrapper.html()).to.eql('<span></span>')
    })

    it('should return an empty span on empty input', function() {
      const wrapper = shallow(<FormattedValue type="date" value=""/>)
      expect(wrapper.html()).to.eql('<span></span>')
    })

    it('should return an empty span on input "null"', function() {
      const wrapper = shallow(<FormattedValue type="string" value={null}/>)
      expect(wrapper.html()).to.eql('<span></span>')
    })

    it('should not return an empty span on input false', function() {
      const wrapper = shallow(<FormattedValue type="boolean" value={false}/>)
      expect(wrapper.html()).to.not.eql('<span></span>')
    })
  })
})
