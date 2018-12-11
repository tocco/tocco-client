import React from 'react'
import {mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

import MoneyEdit from './MoneyEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('MoneyEdit ', () => {
        test('should render MoneyEdit', () => {
          const optionsObject = {intl: {...IntlStub, locale: 'en'}}
          const wrapper = mount(
            <MoneyEdit value={1234567.89} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find(MoneyEdit)).to.have.length(1)
        })
      })
    })
  })
})
