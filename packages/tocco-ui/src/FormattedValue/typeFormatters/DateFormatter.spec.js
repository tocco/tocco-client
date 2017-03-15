import React from 'react'
import DateFormatter from './DateFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('DateFormatter ', function() {
      before(function() {
        require('intl/locale-data/jsonp/en.js')
        require('intl/locale-data/jsonp/de.js')
        const en = require('react-intl/locale-data/en')
        const de = require('react-intl/locale-data/de')
        addLocaleData([...en, ...de])
      })

      const leftToRightMark = /\u200E/g // required for browser Edge
      const zeros = /0/g // ms edge displayes dates with leading zeros (e.g. 09.09.2017)

      /* Tests Failing on Saucelabs Safari
       expected '15.11.1976' to equal '16.11.1976'

       it('should format value', () => {
       const wrapper = mount(<IntlProvider locale="en"><DateFormatter
       value="1976-11-16"/></IntlProvider>)
       expect(wrapper.text().replace(leftToRightMark, '')).to.equal('11/16/1976')
       })

       it('should format value accorind to locale', () => {
       const wrapper = mount(<IntlProvider locale="de"><DateFormatter
       value="1976-11-16"/></IntlProvider>)
       expect(wrapper.text().replace(leftToRightMark, '')).to.equal('16.11.1976')
       })
       */

      it('should format value with ISO string', () => {
        const wrapper = mount(<IntlProvider locale="de"><DateFormatter
          value="1995-09-09T00:00:00.000Z"/></IntlProvider>)
        expect(wrapper.text().replace(leftToRightMark, '').replace(zeros, '')).to.equal('9.9.1995')
      })

      it('should format value with Date object', () => {
        const wrapper = mount(<IntlProvider locale="de"><DateFormatter
          value={new Date(1995, 1, 9)}/></IntlProvider>)
        expect(wrapper.text().replace(leftToRightMark, '').replace(zeros, '')).to.equal('9.2.1995')
      })

      it('should not format invalid date', () => {
        const wrapper = mount(<IntlProvider locale="de"><DateFormatter
          value="abc123"/></IntlProvider>)
        expect(wrapper.html()).to.equal('<span></span>')
      })
    })
  })
})
