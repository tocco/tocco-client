import React from 'react'
import {shallow} from 'enzyme'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'

import SearchPanel from './SearchPanel'

const EMPTY_FUNC = () => {}

describe('resource-scheduler', () => {
  describe('components', () => {
    describe('SearchPanel', () => {
      test('should render', () => {
        const wrapper = shallow(
          <SearchPanel
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={EMPTY_FUNC}
            calendarTypes={[]}
          />
        )
        expect(wrapper.find(PanelGroup)).to.have.length(1)
      })
    })
  })
})
