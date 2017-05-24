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

      it('should format value', () => {
        const wrapper = mount(
          <IntlProvider locale="en">
            <DateFormatter value="1976-11-16"/>
          </IntlProvider>
        )

        expect(wrapper.text().replace(leftToRightMark, '')).to.equal('11/16/1976')
      })

      it('should format value according to locale', () => {
        const wrapper = mount(
          <IntlProvider locale="de">
            <DateFormatter value="1976-11-16"/>
          </IntlProvider>
        )
        expect(wrapper.text().replace(leftToRightMark, '')).to.equal('16.11.1976')
      })
    })
  })
})
