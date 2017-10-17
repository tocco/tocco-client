import React from 'react'
import ResourceScheduler from './ResourceScheduler'
import {shallow} from 'enzyme'
import SearchPanel from '../SearchPanel/SearchPanel'
import SchedulerApp from 'tocco-scheduler/src/main'

const EMPTY_FUNC = () => {}

describe('resource-scheduler', () => {
  describe('components', () => {
    describe('ResourceScheduler', () => {
      it('should render SearchPanel and SchedulerApp ', () => {
        const wrapper = shallow(
          <ResourceScheduler
            initialize={EMPTY_FUNC}
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={EMPTY_FUNC}
            setDateRange={EMPTY_FUNC}
            removeRequestedCalendar={EMPTY_FUNC}
          />
        )
        expect(wrapper.find(SearchPanel)).to.have.length(1)
        expect(wrapper.find(SchedulerApp)).to.have.length(1)
      })
    })
  })
})
