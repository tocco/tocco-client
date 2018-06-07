import React from 'react'
import LongitudeFormatter from './LongitudeFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('LongitudeFormatter ', () => {
        before(() => {
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })

        it('should format value', () => {
          const value = {value: 0.82710405122667465, minimum: false, maximum: false}
          const wrapper = mount(<IntlProvider locale="en"><LongitudeFormatter
            value={value}/></IntlProvider>)
          expect(wrapper.text()).to.equal('0.827104051226675')
        })

        it('should format value accorind to locale', () => {
          const value = {value: 0.82710405122667465, minimum: false, maximum: false}
          const wrapper = mount(<IntlProvider locale="de"><LongitudeFormatter
            value={value}/></IntlProvider>)
          expect(wrapper.text()).to.equal('0,827104051226675')
        })
      })
    })
  })
})
