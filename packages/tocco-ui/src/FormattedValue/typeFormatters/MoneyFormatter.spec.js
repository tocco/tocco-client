import React from 'react'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

import MoneyFormatter from './MoneyFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('MoneyFormatter ', () => {
        before(() => {
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de-CH.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })

        it('should format a money amount', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <MoneyFormatter value={1245.50}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('1,245.50')
        })

        it('should format a money amount regarding locale', () => {
          const wrapper = mount(
            <IntlProvider locale="de-CH">
              <MoneyFormatter value={1245.50}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.match(/1['’]245.50/)
        })
      })
    })
  })
})
