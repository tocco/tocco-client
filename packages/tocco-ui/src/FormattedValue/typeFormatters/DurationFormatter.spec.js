import React from 'react'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import DurationFormatter from './DurationFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('DurationFormatter ', () => {
        const leftToRightMark = /\u200E/g // required for browser Edge

        test('should format value', () => {
          const durationMilliseconds = 83000

          const durationFormatedS = '00:01:23'

          const wrapper = mount(<IntlProvider locale="de"><DurationFormatter
            value={durationMilliseconds} /></IntlProvider>)

          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(durationFormatedS)
        })
      })
    })
  })
})
