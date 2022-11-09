import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import FailureMessage from './FailureMessage'
import {messages, DEFAULT as DEFAULT_MESSAGE} from './messages'

describe('login', () => {
  describe('components', () => {
    describe('FailureMessage', () => {
      test('should render default message if no error code', () => {
        testingLibrary.renderWithIntl(<FailureMessage />)
        expect(screen.getByText(DEFAULT_MESSAGE)).exist
      })
      test('should render default message if error code unknown', () => {
        testingLibrary.renderWithIntl(<FailureMessage errorCode="UNKNOWN_CODE" />)
        expect(screen.getByText(DEFAULT_MESSAGE)).exist
      })
      test('should render specific message if error code known', () => {
        testingLibrary.renderWithIntl(<FailureMessage errorCode="INVALID_CREDENTIALS" />)
        expect(screen.getByText(messages.INVALID_CREDENTIALS)).exist
      })
    })
  })
})
