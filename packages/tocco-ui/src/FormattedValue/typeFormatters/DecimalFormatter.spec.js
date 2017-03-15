import React from 'react'
import DecimalFormatter from './DecimalFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('DecimalFormatter ', function() {
      before(function() {
        require('intl/locale-data/jsonp/en.js')
        require('intl/locale-data/jsonp/de.js')
        const en = require('react-intl/locale-data/en')
        const de = require('react-intl/locale-data/de')
        addLocaleData([...en, ...de])
      })

      it('should format value', function() {
        const wrapper = mount(
          <IntlProvider locale="en">
            <DecimalFormatter value={1.3}/>
          </IntlProvider>
        )
        expect(wrapper.text()).to.equal('1.30')
      })

      it('should format value accorind to locale', function() {
        const wrapper = mount(
          <IntlProvider locale="de">
            <DecimalFormatter value={1.3}/>
          </IntlProvider>
        )
        expect(wrapper.text()).to.equal('1,30')
      })
    })
  })
})
