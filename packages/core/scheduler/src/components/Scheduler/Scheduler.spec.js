import {shallow} from 'enzyme'
import React from 'react'

import FullCalendar from '../FullCalendar'
import Scheduler from './Scheduler'

describe('scheduler', () => {
  describe('components', () => {
    describe('Scheduler', () => {
      test('should render FullCalendar', () => {
        const wrapper = shallow(<Scheduler calendars={[]} />)
        expect(wrapper.find(FullCalendar)).to.have.length(1)
      })
    })
  })
})
