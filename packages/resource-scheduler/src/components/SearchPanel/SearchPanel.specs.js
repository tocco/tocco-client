import React from 'react'
import SearchPanel from './SearchPanel'
import {shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

describe('resource-scheduler', () => {
  describe('components', () => {
    describe('SearchPanel', () => {
      it('should render', () => {
        const wrapper = shallow(
          <SearchPanel
            addCalendarsOfType={EMPTY_FUNC}
            calendarTypes={[]}
          />
        )
        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
