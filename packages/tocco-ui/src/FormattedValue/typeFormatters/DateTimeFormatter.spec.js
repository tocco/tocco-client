import React from 'react'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

import DateTimeFormatter from './DateTimeFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('DateTimeFormatter ', () => {
        beforeAll(function() {
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })

        test('should format value', () => {
          const wrapper = mount(<IntlProvider locale="en">
            <DateTimeFormatter
              value="1976-03-16T12:00:00.000Z"/>
          </IntlProvider>)
          // Does not work on travis due to different time zone. Open issue could solve the problem
          // https://github.com/yahoo/react-intl/issues/702
          // expect(wrapper.text()).to.equal('3/16/1976,1:00 PM')

          expect(wrapper.text()).to.not.equal('')
          expect(wrapper.find('time').prop('title')).to.not.equal('')
          expect(wrapper.find('time').prop('dateTime')).to.not.equal('')
        })

        test('should format value according to locale', () => {
          const wrapper = mount(<IntlProvider locale="de">
            <DateTimeFormatter
              value="1976-03-16T12:00:00.000Z"/>
          </IntlProvider>)
          // See above
          // expect(wrapper.text()).to.equal('16.3.1976,13:00')
          expect(wrapper.text()).to.not.equal('')
          expect(wrapper.find('time').prop('title')).to.not.equal('')
          expect(wrapper.find('time').prop('dateTime')).to.not.equal('')
        })

        test('should recognize alternative datetime formats', () => {
          const wrapper = mount(<IntlProvider locale="de">
            <DateTimeFormatter
              value={1594562400000}/>
          </IntlProvider>)

          // See above
          // expect(wrapper.text()).to.equal('12.07.2020,16:00')
          expect(wrapper.text()).to.not.equal('')
          expect(wrapper.find('time').prop('title')).to.not.equal('')
          expect(wrapper.find('time').prop('dateTime')).to.not.equal('')
        })
      })
    })
  })
})
