import React from 'react'
import {mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

import DecimalEdit, {limitValue} from './DecimalEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DecimalEdit ', () => {
        test('should render DecimalEdit', () => {
          const optionsObject = {intl: {...IntlStub, locale: 'en'}}
          const wrapper = mount(
            <DecimalEdit value={1234567.89} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find('input')).to.have.length(1)
        })

        test('should return number string in en', () => {
          const result = '1,234,567.89'
          const optionsObject = {intl: {...IntlStub, locale: 'en'}}
          const wrapper = mount(
            <DecimalEdit value={1234567.89} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.html()).to.contains(result)
        })
        test('should return number string in fr', () => {
          const result = '1&nbsp;234&nbsp;567,89'
          const optionsObject = {intl: {...IntlStub, locale: 'fr'}}
          const wrapper = mount(
            <DecimalEdit value={1234567.89} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.html()).to.contains(result)
        })
        describe('limitValue', () => {
          test('should return false on too large input', () => {
            const maxValue = 1234567891234.56
            const valuesObject = {
              formattedValue: '12345678912344.56',
              floatValue: 12345678912344.56
            }
            expect(limitValue(maxValue)(valuesObject)).to.be.eql(false)
          })
          test('should return true on small enough input', () => {
            const maxValue = 12345678912344.56
            const valuesObject = {
              formattedValue: '1234567891234.56',
              floatValue: 1234567891234.56
            }
            expect(limitValue(maxValue)(valuesObject)).to.be.eql(true)
          })
        })
      })
    })
  })
})
