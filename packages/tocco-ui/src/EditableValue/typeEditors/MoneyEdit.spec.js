import React from 'react'
import {mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

import DecimalEdit from './DecimalEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('MoneyEdit ', () => {
        test('should render DecimalEdit', () => {
          const optionsObject = {intl: {...IntlStub, locale: 'en'}}
          const wrapper = mount(
            <DecimalEdit value={1234567.89} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find(DecimalEdit)).to.have.length(1)
        })
      })
    })
  })
})
