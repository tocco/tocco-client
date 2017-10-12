import React from 'react'
import FullCalendar from './FullCalendar'
import {shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

describe('scheduler', () => {
  describe('components', () => {
    describe('Fullcalendar', () => {
      it('should render', () => {
        const wrapper = shallow(
          <FullCalendar
            dateRangeChange={EMPTY_FUNC}
            removeResource={EMPTY_FUNC}

          />)
        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
