import React from 'react'
import NumberFormatter from './NumberFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('NumberFormatter ', function() {
      before(function() {
        require('intl/locale-data/jsonp/en.js')
        require('intl/locale-data/jsonp/de.js')
        const en = require('react-intl/locale-data/en')
        const de = require('react-intl/locale-data/de')
        addLocaleData([...en, ...de])
      })

      it('should format value', function() {
        const wrapper = mount(<IntlProvider locale="en"><NumberFormatter
          value={1337}/></IntlProvider>)
        expect(wrapper.text()).to.equal('1,337')
      })

      it('should format number 0', function() {
        const wrapper = mount(<IntlProvider locale="en"><NumberFormatter
          value={0}/></IntlProvider>)
        expect(wrapper.text()).to.equal('0')
      })

      it('should format value accorind to locale DE', function() {
        const wrapper = mount(<IntlProvider locale="de"><NumberFormatter
          value={1337}/></IntlProvider>)
        expect(wrapper.text()).to.equal('1.337')
      })

      it('should format value accorind to locale CH', function() {
        const wrapper = mount(<IntlProvider locale="de-CH"><NumberFormatter
          value={1337}/></IntlProvider>)
        expect(wrapper.text()).to.equal('1\'337')
      })
    })
  })
})
