import React from 'react'
import {mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

import IntegerEdit from './IntegerEdit'
import NumberEdit from './NumberEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('IntegerEdit ', () => {
        test('should render NumberEdit', () => {
          const optionsObject = {intl: {...IntlStub, locale: 'en'}}
          const wrapper = mount(
            <IntegerEdit value={1234567} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find(NumberEdit)).to.have.length(1)
        })

        test('should render NumberEdit with correct value', () => {
          const optionsObject = {intl: {...IntlStub, locale: 'en'}}
          const wrapper = mount(
            <IntegerEdit value={1234567} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find(NumberEdit).props().value).to.be.eql(1234567)
        })
      })
    })
  })
})
