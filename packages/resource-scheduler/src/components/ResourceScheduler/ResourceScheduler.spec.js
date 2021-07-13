import React from 'react'
import {shallow} from 'enzyme'

import ResourceScheduler from './ResourceScheduler'
import SearchPanel from '../SearchPanel/SearchPanel'
import SchedulerAppContainer from '../../containers/SchedulerAppContainer'

const EMPTY_FUNC = () => {}

describe('resource-scheduler', () => {
  describe('components', () => {
    describe('ResourceScheduler', () => {
      test('should render SearchPanel and SchedulerApp ', () => {
        const wrapper = shallow(
          <ResourceScheduler
            initialize={EMPTY_FUNC}
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={EMPTY_FUNC}
            setDateRange={EMPTY_FUNC}
            removeRequestedCalendar={EMPTY_FUNC}
            selection={null}
            actionProperties={{}}
            emitAction={EMPTY_FUNC}
            handleNotifications={false}
          />
        )
        expect(wrapper.find(SearchPanel)).to.have.length(1)
        expect(wrapper.find(SchedulerAppContainer)).to.have.length(1)
      })

      test('should not use preselected calendars without selection', () => {
        const mockUpdateFunction = jest.fn(() => {})
        shallow(
          <ResourceScheduler
            initialize={EMPTY_FUNC}
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={mockUpdateFunction}
            setDateRange={EMPTY_FUNC}
            removeRequestedCalendar={EMPTY_FUNC}
            selection={null}
            actionProperties={{calendarType: 'lecturer'}}
            emitAction={EMPTY_FUNC}
            handleNotifications={false}
          />
        )
        expect(mockUpdateFunction.mock.calls.length).to.eq(0)
      })

      test('should not use preselected calendars without ids', () => {
        const mockUpdateFunction = jest.fn(() => {})
        shallow(
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
            emitAction={EMPTY_FUNC}
            actionProperties={{calendarType: 'lecturer'}}
            handleNotifications={false}
          />
        )
        expect(mockUpdateFunction.mock.calls.length).to.eq(0)
      })

      test('should not use preselected calendars without calendarType', () => {
        const mockUpdateFunction = jest.fn(() => {})
        shallow(
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
            emitAction={EMPTY_FUNC}
            handleNotifications={false}
          />
        )
        expect(mockUpdateFunction.mock.calls.length).to.eq(0)
      })
    })
  })
})
