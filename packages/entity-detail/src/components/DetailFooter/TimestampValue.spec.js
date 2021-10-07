import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import TimestampValue from './TimestampValue'

describe('entity-detail', () => {
  describe('components', () => {
    describe('DetailFooter', () => {
      test(
        'should show relative time',
        () => {
          const now = new Date()
          const dateInPast = new Date(now.setFullYear(now.getFullYear() - 1))
          
          const wrapper = intlEnzyme.mountWithIntl(
           <TimestampValue value={dateInPast.toISOString()}/>
          )

          expect(wrapper.text()).to.include('1 year')
        }
      )
    })
  })
})
