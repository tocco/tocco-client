import React from 'react'
import {mount} from 'enzyme'
import {addLocaleData, IntlProvider} from 'react-intl'

import DurationFormatter from './DurationFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('DurationFormatter ', () => {
        beforeAll(() => {
          require('intl/locale-data/jsonp/en.js')
          require('intl/locale-data/jsonp/de.js')
          const en = require('react-intl/locale-data/en')
          const de = require('react-intl/locale-data/de')
          addLocaleData([...en, ...de])
        })
      })

      const leftToRightMark = /\u200E/g // required for browser Edge

      test('should format value', () => {
        const durationMilliseconds = 83000

        const durationFormatedS = '00:01:23'
        const durationFormatedMs = '00:01:23.000'

        const wrapper = mount(<IntlProvider locale="en"><DurationFormatter
          value={durationMilliseconds}/></IntlProvider>)
        expect(wrapper.find('time').prop('title')).to.equal(durationFormatedS)
        expect(wrapper.find('time').prop('dateTime')).to.equal(durationFormatedMs)
        expect(wrapper.find('span').text().replace(leftToRightMark, '')).to.equal(durationFormatedS)
      })
    })
  })
})
