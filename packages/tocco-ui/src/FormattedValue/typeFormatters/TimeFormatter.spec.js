import React from 'react'
import TimeFormatter from './TimeFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('TimeFormatter ', () => {
        before(() => {
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })

        const leftToRightMark = /\u200E/g // required for browser Edge

        const timeOutputIso = '23:15:00.000'
        const timeOutputEn = '11:15 PM'
        const timeOutputDe = '23:15'

        const timeValue = {
          value: {
            hourOfDay: 23,
            minuteOfHour: 15,
            secondOfMinute: 0,
            millisOfSecond: 0
          }
        }

        it('should format value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <TimeFormatter value={timeValue}/>
            </IntlProvider>
          )
          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(timeOutputEn)
          expect(wrapper.find('time').prop('title')).to.equal(timeOutputEn)
          expect(wrapper.find('time').prop('dateTime')).to.equal(timeOutputIso)
        })

        it('should format value accorind to locale', () => {
          const wrapper = mount(
            <IntlProvider locale="de">
              <TimeFormatter value={timeValue}/>
            </IntlProvider>
          )
          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(timeOutputDe)
          expect(wrapper.find('time').prop('title')).to.equal(timeOutputDe)
          expect(wrapper.find('time').prop('dateTime')).to.equal(timeOutputIso)
        })
      })
    })
  })
})
