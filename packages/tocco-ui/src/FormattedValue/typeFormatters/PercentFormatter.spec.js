import React from 'react'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

import PercentFormatter from './PercentFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('PercentFormatter ', () => {
        beforeAll(() => {
          require('intl')
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })

        test('should format value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <PercentFormatter value={2.41}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('2.41%')
        })

        test('should format value accorind to locale', () => {
          const wrapper = mount(
            <IntlProvider locale="de">
              <PercentFormatter value={99.9}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('99,90%')
        })
      })
    })
  })
})
