import React from 'react'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

import NumberFormatter from './NumberFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('NumberFormatter ', () => {
        beforeAll(() => {
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })

        test('should format value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <NumberFormatter value={1.3}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('1.30')
        })

        test('should format value accorind to locale', () => {
          const wrapper = mount(
            <IntlProvider locale="de">
              <NumberFormatter value={1.3}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('1,30')
        })
      })
    })
  })
})
