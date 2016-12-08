import React from 'react'
import DurationFormatter from './DurationFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('DurationFormatter ', function() {
      before(function() {
        require('intl/locale-data/jsonp/en.js')
        require('intl/locale-data/jsonp/de.js')
        const en = require('react-intl/locale-data/en')
        const de = require('react-intl/locale-data/de')
        addLocaleData([...en, ...de])
      })

      it('should format value', function() {
        const durationMilliseconds = 5401000

        const wrapper = mount(<IntlProvider locale="en"><DurationFormatter
          value={durationMilliseconds}/></IntlProvider>)
        expect(wrapper.text()).to.equal('01:30:01')
      })
    })
  })
})
