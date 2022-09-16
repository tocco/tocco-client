import {screen} from '@testing-library/react'
import {appFactory} from 'tocco-app-extensions'
import {testingLibrary} from 'tocco-test-util'

import reducers, {sagas} from '../../modules/reducers'
import ResourceScheduler from './ResourceScheduler'

jest.mock('tocco-scheduler/src/main', () => () => <div data-testid="scheduler" />)
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
    describe('ResourceScheduler', () => {
      test('should render SearchPanel and SchedulerApp ', () => {
        const store = appFactory.createStore(reducers, sagas, {navigationStrategy: {}})

        testingLibrary.renderWithStore(
          <ResourceScheduler
            initialize={EMPTY_FUNC}
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={EMPTY_FUNC}
            setDateRange={EMPTY_FUNC}
            removeRequestedCalendar={EMPTY_FUNC}
            emitAction={EMPTY_FUNC}
            selection={null}
            handleNotifications={false}
            actionProperties={{}}
            calendarTypes={calendarTypes}
          />,
          {store}
        )

        expect(screen.queryAllByText('Teilnehmer')).to.have.length(1)
        expect(screen.getByTestId('scheduler')).to.exist
      })

      test('should not use preselected calendars without selection', () => {
        const mockUpdateFunction = jest.fn(() => {})
        const store = appFactory.createStore(reducers, sagas, {navigationStrategy: {}})

        testingLibrary.renderWithStore(
          <ResourceScheduler
            initialize={EMPTY_FUNC}
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={mockUpdateFunction}
            setDateRange={EMPTY_FUNC}
            removeRequestedCalendar={EMPTY_FUNC}
            selection={null}
            actionProperties={{calendarType: 'lecturer'}}
            calendarTypes={calendarTypes}
          />,
          {store}
        )
        expect(mockUpdateFunction.mock.calls.length).to.eq(0)
      })

      test('should not use preselected calendars without ids', () => {
        const mockUpdateFunction = jest.fn(() => {})
        const store = appFactory.createStore(reducers, sagas, {navigationStrategy: {}})
        testingLibrary.renderWithStore(
          <ResourceScheduler
            initialize={EMPTY_FUNC}
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={mockUpdateFunction}
            setDateRange={EMPTY_FUNC}
            removeRequestedCalendar={EMPTY_FUNC}
            selection={{
              entityName: 'User',
              type: 'QUERY'
            }}
            actionProperties={{calendarType: 'lecturer'}}
            calendarTypes={calendarTypes}
          />,
          {store}
        )
        expect(mockUpdateFunction.mock.calls.length).to.eq(0)
      })

      test('should not use preselected calendars without calendarType', () => {
        const mockUpdateFunction = jest.fn(() => {})
        const store = appFactory.createStore(reducers, sagas, {navigationStrategy: {}})
        testingLibrary.renderWithStore(
          <ResourceScheduler
            initialize={EMPTY_FUNC}
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={mockUpdateFunction}
            setDateRange={EMPTY_FUNC}
            removeRequestedCalendar={EMPTY_FUNC}
            selection={{
              entityName: 'User',
              ids: ['1', '2'],
              type: 'ID'
            }}
            actionProperties={{}}
            calendarTypes={calendarTypes}
          />,
          {store}
        )
        expect(mockUpdateFunction.mock.calls.length).to.eq(0)
      })
    })
  })
})
