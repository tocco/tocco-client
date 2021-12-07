import React from 'react'
import {enzymeUtil} from 'tocco-test-util'

import DateEdit from './DateEdit'
import LazyDatePicker from './LazyDatePicker'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateEdit ', () => {
        test('should render an instance of DatePicker', () => {
          const wrapper = enzymeUtil.mountEmbedded(<DateEdit onChange={EMPTY_FUNC} />)

          const datePicker = wrapper.find(LazyDatePicker)
          expect(datePicker).to.have.length(1)
        })
      })
    })
  })
})
