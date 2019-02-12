import React from 'react'
import {shallow} from 'enzyme'

import SearchPanel from './SearchPanel'

const EMPTY_FUNC = () => {}

describe('resource-scheduler', () => {
  describe('components', () => {
    describe('SearchPanel', () => {
      it('should render', () => {
        const wrapper = shallow(
          <SearchPanel
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={EMPTY_FUNC}
            calendarTypes={[]}
          />
        )
        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
