import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import SearchPanel from './SearchPanel'

jest.mock('tocco-entity-list/src/main', () => () => <div data-testid="entity-list" />)

const EMPTY_FUNC = () => {}

const calendarTypes = [
  {
    name: 'participant',
    label: 'Teilnehmer',
    targetEntity: 'User',
    formBase: 'User_participant',
    color: '#9b59b6'
  }
]

describe('resource-scheduler', () => {
  describe('components', () => {
    describe('SearchPanel', () => {
      test('should render', () => {
        testingLibrary.renderWithIntl(
          <SearchPanel
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={EMPTY_FUNC}
            calendarTypes={calendarTypes}
          />
        )
        expect(screen.getByText('Teilnehmer')).to.exist
        expect(screen.getByTestId('entity-list')).to.exist
      })
    })
  })
})
