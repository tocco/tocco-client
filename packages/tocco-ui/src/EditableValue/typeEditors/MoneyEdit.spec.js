import React from 'react'
import {mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

import NumberEdit from './NumberEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('MoneyEdit ', () => {
        test('should render NumberEdit', () => {
          const optionsObject = {intl: {...IntlStub, locale: 'en'}}
          const wrapper = mount(
            <NumberEdit value={1234567.89} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find(NumberEdit)).to.have.length(1)
        })
      })
    })
  })
})
