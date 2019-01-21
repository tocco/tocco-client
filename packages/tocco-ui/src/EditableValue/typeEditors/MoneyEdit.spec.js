import React from 'react'
import {mountWithIntl} from 'tocco-test-util/src/intlEnzyme/intlEnzyme'

import MoneyEdit from './MoneyEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('MoneyEdit ', () => {
        test('should render MoneyEdit', () => {
          const wrapper = mountWithIntl(
            <MoneyEdit value={1234567.89} options={{}} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find(MoneyEdit)).to.have.length(1)
        })
      })
    })
  })
})
