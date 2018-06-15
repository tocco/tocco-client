import React from 'react'
import DurationFormatter from './DurationFormatter'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('DurationFormatter ', () => {
        before(() => {
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })
      })

      const leftToRightMark = /\u200E/g // required for browser Edge

      it('should format value', () => {
        const durationMilliseconds = 83000
        const durationFormated = '00:01:23'

        const wrapper = mount(<IntlProvider locale="en"><DurationFormatter
          value={durationMilliseconds}/></IntlProvider>)
        expect(wrapper.find('time').prop('title')).to.equal(durationFormated)
        expect(wrapper.find('time').prop('dateTime')).to.equal(durationFormated)
        expect(wrapper.find('span').text().replace(leftToRightMark, '')).to.equal(durationFormated)
      })
    })
  })
})
