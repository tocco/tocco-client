import React from 'react'
import PercentFormatter from './PercentFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('PercentFormatter ', () => {
        before(() => {
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })

        it('should format value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <PercentFormatter value={2.41}/>
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('2.41%')
        })

        it('should format value accorind to locale', () => {
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
