import React from 'react'
import {shallow} from 'enzyme'

import FormattedValue from './FormattedValue'
import DateFormatter from './typeFormatters/DateFormatter'
import StringFormatter from './typeFormatters/StringFormatter'
import BooleanFormatter from './typeFormatters/BooleanFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    test('should render a string value', () => {
      const wrapper = shallow(<FormattedValue type="string" value="test"/>)
      expect(wrapper.find(StringFormatter)).to.have.length(1)
    })

    test('should render a date value', () => {
      const wrapper = shallow(<FormattedValue type="date" value="1976-03-16"/>)
      expect(wrapper.find(DateFormatter)).to.have.length(1)
    })

    test('should return an empty span on a undefined input', () => {
      const wrapper = shallow(<FormattedValue type="string" value={undefined}/>)
      expect(wrapper.html()).to.eql('<span></span>')
    })

    test('should return an empty span on empty input', () => {
      const wrapper = shallow(<FormattedValue type="date" value=""/>)
      expect(wrapper.html()).to.eql('<span></span>')
    })

    test('should return an empty span on input "null"', () => {
      const wrapper = shallow(<FormattedValue type="string" value={null}/>)
      expect(wrapper.html()).to.eql('<span></span>')
    })

    test('should not return an empty span on input false', () => {
      const wrapper = shallow(<FormattedValue type="boolean" value={false}/>)
      expect(wrapper.find(BooleanFormatter)).to.have.length(1)
    })
  })
})
