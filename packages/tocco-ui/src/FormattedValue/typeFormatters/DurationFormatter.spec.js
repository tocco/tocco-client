import React from 'react'
import {mount} from 'enzyme'

import DurationFormatter from './DurationFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('DurationFormatter ', () => {
        const leftToRightMark = /\u200E/g // required for browser Edge

        test('should format value', () => {
          const durationMilliseconds = 83000

          const durationFormatted = '00:01:23'

          const wrapper = mount(<DurationFormatter value={durationMilliseconds}/>)

          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(durationFormatted)
        })

        test('should handle 24 hour overflow', () => {
          const durationMilliseconds = 90083000

          const durationFormatted = '25:01:23'

          const wrapper = mount(<DurationFormatter value={durationMilliseconds}/>)

          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(durationFormatted)
        })
      })
    })
  })
})
