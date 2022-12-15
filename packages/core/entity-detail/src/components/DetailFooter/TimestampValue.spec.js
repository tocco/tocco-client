import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import TimestampValue from './TimestampValue'

describe('entity-detail', () => {
  describe('components', () => {
    describe('DetailFooter', () => {
      test('should show relative time', () => {
        const now = new Date()
        const dateInPast = new Date(now.setFullYear(now.getFullYear() - 1))

        testingLibrary.renderWithIntl(<TimestampValue value={dateInPast.toISOString()} />)
        expect(screen.queryByText('(1 year ago)')).to.exist
      })
    })
  })
})
