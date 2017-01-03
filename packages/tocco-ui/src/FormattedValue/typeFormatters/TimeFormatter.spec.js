import React from 'react'
import TimeFormatter from './TimeFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('TimeFormatter ', function() {
      before(function() {
        require('intl/locale-data/jsonp/en.js')
        require('intl/locale-data/jsonp/de.js')
        const en = require('react-intl/locale-data/en')
        const de = require('react-intl/locale-data/de')
        addLocaleData([...en, ...de])
      })

      const leftToRightMark = /\u200E/g // required for browser Edge

      const timeValue = {
        value: {
          hourOfDay: 23,
          minuteOfHour: 15,
          secondOfMinute: 0,
          millisOfSecond: 0
        }
      }

      it('should format value', function() {
        const wrapper = mount(<IntlProvider locale="en"><TimeFormatter
          value={timeValue}/></IntlProvider>)
        expect(wrapper.text().replace(leftToRightMark, '')).to.equal('11:15 PM')
      })

      it('should format value accorind to locale', function() {
        const wrapper = mount(<IntlProvider locale="de"><TimeFormatter
          value={timeValue}/></IntlProvider>)
        expect(wrapper.text().replace(leftToRightMark, '')).to.equal('23:15')
      })
    })
  })
})
