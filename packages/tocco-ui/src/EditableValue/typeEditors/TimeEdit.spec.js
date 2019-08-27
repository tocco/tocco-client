import React from 'react'
import {mount} from 'enzyme'

import TimeEdit from './TimeEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('TimeEdit ', () => {
        const valueObject = {value: {hourOfDay: 8, minuteOfHour: 45}}

        test('should render input', () => {
          const wrapper = mount(
            <TimeEdit value={valueObject} onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find('input')).to.have.length(1)
        })

        test('should return correct time string on undefined input', () => {
          const valueObject = {value: {hourOfDay: undefined, minuteOfHour: undefined}}
          const wrapper = mount(
            <TimeEdit value={valueObject} onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find('input').props().value).to.be.eql('--:--')
        })

        test('should clear input', () => {
          const valueObject = {value: {hourOfDay: 6, minuteOfHour: 56}}
          const wrapper = mount(
            <TimeEdit value={valueObject} onChange={EMPTY_FUNC}/>
          )
          wrapper.find('button').simulate('click')
          expect(wrapper.find('input').props().value).to.be.eql('--:--')
        })
      })
    })
  })
})
