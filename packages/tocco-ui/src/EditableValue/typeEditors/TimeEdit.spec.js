import React from 'react'
import {mount} from 'enzyme'

import TimeEdit from './TimeEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('TimeEdit ', () => {
        const valueObject = {
          value: {hoursOfDay: 8, minutesOfHour: 45}}

        test('should render DurationEdit', () => {
          const wrapper = mount(
            <TimeEdit value={valueObject} onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find('DurationEdit')).to.have.length(1)
        })
      })
    })
  })
})
