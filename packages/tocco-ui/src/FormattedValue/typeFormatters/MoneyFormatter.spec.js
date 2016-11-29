import React from 'react'
import MoneyFormatter from './MoneyFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('MoneyFormatter ', function() {
      before(function() {
        require('intl/locale-data/jsonp/en.js')
        require('intl/locale-data/jsonp/de-CH.js')
        const en = require('react-intl/locale-data/en')
        const de = require('react-intl/locale-data/de')
        addLocaleData([...en, ...de])
      })

      it('should format a money', function() {
        const wrapper = mount(
          <IntlProvider locale="en">
            <MoneyFormatter
              value={1245.50}
            />
          </IntlProvider>
        )
        expect(wrapper.text()).to.equal('1,245.50')
      })

      it('should format a money', function() {
        const wrapper = mount(
          <IntlProvider locale="de-CH">
            <MoneyFormatter
              value={1245.50}
            />
          </IntlProvider>
        )
        expect(wrapper.text()).to.equal('1\'245.50')
      })
    })
  })
})
