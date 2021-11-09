import React from 'react'
import {enzymeUtil} from 'tocco-test-util'

import DateTimeEdit from './DateTimeEdit'
import LazyDatePicker from './LazyDatePicker'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateTimeEdit ', () => {
        test('should render an instance of DatePicker', () => {
          const wrapper = enzymeUtil.mountEmbedded(
            <DateTimeEdit onChange={EMPTY_FUNC}/>
          )

          const datePicker = wrapper.find(LazyDatePicker)
          expect(datePicker).to.have.length(1)
        })
      })
    })
  })
})
