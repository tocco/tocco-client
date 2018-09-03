import React from 'react'
import {shallow} from 'enzyme'

import Scheduler from './Scheduler'
import FullCalendar from '../FullCalendar'

describe('scheduler', () => {
  describe('components', () => {
    describe('Scheduler', () => {
      it('should render FullCalendar', () => {
        const wrapper = shallow(<Scheduler calendars={[]} />)
        expect(wrapper.find(FullCalendar)).to.have.length(1)
      })
    })
  })
})
