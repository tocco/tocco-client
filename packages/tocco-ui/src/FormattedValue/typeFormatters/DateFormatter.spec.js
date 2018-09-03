import React from 'react'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

import DateFormatter from './DateFormatter'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('typeFormatters', () => {
      describe('DateFormatter ', function() {
        before(function() {
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })

        const leftToRightMark = /\u200E/g // required for browser Edge
        const dateInput = '1976-11-16'
        const dateOutputIso = '1976-11-16'
        const dateOutputEn = '11/16/1976'
        const dateOutputDe = '16.11.1976'

        it('should format value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateFormatter value={dateInput}/>
            </IntlProvider>
          )
          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(dateOutputEn)
          expect(wrapper.find('time').prop('title').replace(leftToRightMark, '')).to.equal(dateOutputEn)
          expect(wrapper.find('time').prop('dateTime').replace(leftToRightMark, '')).to.equal(dateOutputIso)
        })

        it('should format value according to locale', () => {
          const wrapper = mount(
            <IntlProvider locale="de">
              <DateFormatter value={dateInput}/>
            </IntlProvider>
          )
          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(dateOutputDe)
          expect(wrapper.find('time').prop('title').replace(leftToRightMark, '')).to.equal(dateOutputDe)
          expect(wrapper.find('time').prop('dateTime').replace(leftToRightMark, '')).to.equal(dateOutputIso)
        })
      })
    })
  })
})
