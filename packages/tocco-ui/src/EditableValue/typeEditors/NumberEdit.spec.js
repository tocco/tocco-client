import React from 'react'
import {mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

import NumberEdit, {limitValue, calculateMaxValue, isAllowedIntegerValue} from './NumberEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('NumberEdit ', () => {
        test('should render NumberEdit', () => {
          const optionsObject = {intl: {...IntlStub, locale: 'en'}}
          const wrapper = mount(
            <NumberEdit value={1234567.89} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find('input')).to.have.length(1)
        })

        test('should return number string in en', () => {
          const result = '1,234,567.89'
          const optionsObject = {intl: {...IntlStub, locale: 'en'}}
          const wrapper = mount(
            <NumberEdit value={1234567.89} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.html()).to.contains(result)
        })
        test('should return number string in fr', () => {
          const result = '1&nbsp;234&nbsp;567,89'
          const optionsObject = {intl: {...IntlStub, locale: 'fr'}}
          const wrapper = mount(
            <NumberEdit value={1234567.89} options={optionsObject} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.html()).to.contains(result)
        })
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
      describe('calculateMaxValue', () => {
        test('should return maxValue', () => {
          const prePointDigits = 5
          const postPointDigits = 3
          const result = 99999.999
          expect(calculateMaxValue(prePointDigits, postPointDigits)).to.be.eql(result)
        })
      })
      describe('isAllowedIntegerValue', () => {
        test('should return false on too large input', () => {
          const allowedIntegerObject = {minValue: 5, maxValue: 100}
          const valuesObject = {
            formattedValue: '123',
            floatValue: 123
          }
          expect(isAllowedIntegerValue(allowedIntegerObject)(valuesObject)).to.be.eql(false)
        })
        test('should return true on small enough input', () => {
          const allowedIntegerObject = {minValue: 2, maxValue: 10000}
          const valuesObject = {
            formattedValue: '1234',
            floatValue: 1234
          }
          expect(isAllowedIntegerValue(allowedIntegerObject)(valuesObject)).to.be.eql(true)
        })
      })
    })
  })
})
