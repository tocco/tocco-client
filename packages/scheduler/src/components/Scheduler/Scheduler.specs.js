import React from 'react'
import Scheduler from './Scheduler'
import FullCalendar from '../FullCalendar'
import {shallow} from 'enzyme'

describe('scheduler', () => {
  describe('components', () => {
    describe('Scheduler', () => {
      it('should render FullCalendar', () => {
        const wrapper = shallow(<Scheduler/>)
        expect(wrapper.find(FullCalendar)).to.have.length(1)
      })
    })
  })
})
