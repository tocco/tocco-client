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
            preselectedCalendars={{}}
          />
        )
        expect(wrapper.find(SearchPanel)).to.have.length(1)
        expect(wrapper.find(SchedulerAppContainer)).to.have.length(1)
      })
      test('should use preselected calendars', () => {
        const mockUpdateFunction = jest.fn(() => {})
        shallow(
          <ResourceScheduler
            initialize={EMPTY_FUNC}
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={mockUpdateFunction}
            setDateRange={EMPTY_FUNC}
            removeRequestedCalendar={EMPTY_FUNC}
            preselectedCalendars={{lecturer: ['1', '2'], room: ['3']}}
          />
        )
        expect(mockUpdateFunction.mock.calls[0][0]).to.eq('lecturer')
        expect(mockUpdateFunction.mock.calls[0][1]).to.deep.eq(['1', '2'])
        expect(mockUpdateFunction.mock.calls[1][0]).to.eq('room')
        expect(mockUpdateFunction.mock.calls[1][1]).to.deep.eq(['3'])
      })
    })
  })
})
