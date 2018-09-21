import React from 'react'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

import NumberFormatter from './NumberFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('NumberFormatter ', () => {
        beforeAll(() => {
          require('intl')
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })

        test('should format value', () => {
          const wrapper = mount(<IntlProvider locale="en"><NumberFormatter
            value={1337}/></IntlProvider>)
          expect(wrapper.text()).to.equal('1,337')
        })

        test('should format number 0', () => {
          const wrapper = mount(<IntlProvider locale="en"><NumberFormatter
            value={0}/></IntlProvider>)
          expect(wrapper.text()).to.equal('0')
        })

        test('should format value accorind to locale DE', () => {
          const wrapper = mount(<IntlProvider locale="de"><NumberFormatter
            value={1337}/></IntlProvider>)
          expect(wrapper.text()).to.equal('1.337')
        })

        test('should format value accorind to locale CH', () => {
          const wrapper = mount(<IntlProvider locale="de-CH"><NumberFormatter
            value={1337}/></IntlProvider>)
          expect(wrapper.text()).to.match(/1['’]337/)
        })
      })
    })
  })
})
