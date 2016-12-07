import React from 'react'
import DateTimeFormatter from './DateTimeFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('DateTimeFormatter ', function() {
      before(function() {
        require('intl/locale-data/jsonp/en.js')
        require('intl/locale-data/jsonp/de.js')
        const en = require('react-intl/locale-data/en')
        const de = require('react-intl/locale-data/de')
        addLocaleData([...en, ...de])
      })

      it('should format value', function() {
        const wrapper = mount(<IntlProvider locale="en"><DateTimeFormatter
          value="1976-03-16T12:00:00.000Z"/></IntlProvider>)
        expect(wrapper.text()).to.equal('3/16/1976, 1:00 PM')
      })

      it('should format value accorind to locale', function() {
        const wrapper = mount(<IntlProvider locale="de"><DateTimeFormatter
          value="1976-03-16T12:00:00.000Z"/></IntlProvider>)
        expect(wrapper.text()).to.equal('16.3.1976, 13:00')
      })

      it('should not format unvalid date', function() {
        const wrapper = mount(<IntlProvider locale="de"><DateTimeFormatter
          value="abc123"/></IntlProvider>)
        expect(wrapper.html()).to.equal('<span></span>')
      })
    })
  })
})
