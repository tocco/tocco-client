import React from 'react'
import {mountWithIntl} from 'tocco-test-util/src/intlEnzyme/intlEnzyme'

import NumberEdit, {calculateMaxValue, isAllowedValue, calculateDecimalScale} from './NumberEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('NumberEdit ', () => {
        test('should render NumberEdit', () => {
          const wrapper = mountWithIntl(
            <NumberEdit value={1234567.89} options={{}} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find('input')).to.have.length(1)
        })

        test('should return number string in en', () => {
          const result = '1,234,567.89'
          const wrapper = mountWithIntl(
            <NumberEdit
              value={1234567.89}
              options={{
                prePointDigits: 30,
                postPointDigits: 3
              }}
              onChange={EMPTY_FUNC} />
          )
          expect(wrapper.html()).to.contains(result)
        })
      })

      describe('calculateMaxPointValue', () => {
        test('should return maxValue', () => {
          const prePointDigits = 5
          const postPointDigits = 3
          const result = 99999.999
          expect(calculateMaxValue(prePointDigits, postPointDigits)).to.be.eql(result)
        })
        test('should return maxValue on prePointDigits only', () => {
          const prePointDigits = 5
          const result = 99999
          expect(calculateMaxValue(prePointDigits)).to.be.eql(result)
        })
        test('should undefined if no parameters are set', () => {
          const result = undefined
          expect(calculateMaxValue()).to.be.eql(result)
        })
        test('should return maxValue on postPointDigits with maxValue', () => {
          const postPointDigits = 2
          const maxValue = 1000
          const result = 1000
          expect(calculateMaxValue(undefined, postPointDigits, maxValue)).to.be.eql(result)
        })
      })
      describe('isAllowedValue', () => {
        const prePointDigits = 8
        const postPointDigits = 2
        const minValue = 1
        const maxValue = 1000
        const valuesObject = {
          formattedValue: '123',
          floatValue: 123
        }
        test('should return true on no arguments called', () => {
          expect(isAllowedValue()(valuesObject)).to.be.eql(true)
        })
        test('should return true on empty string', () => {
          expect(isAllowedValue(prePointDigits, postPointDigits)(valuesObject)).to.be.eql(true)
        })
        test('should return true on valid value and only prePointDigits', () => {
          expect(isAllowedValue(prePointDigits)(valuesObject)).to.be.eql(true)
        })
        test('should return true on valid value and only minValue', () => {
          expect(isAllowedValue(undefined, undefined, minValue)(valuesObject)).to.be.eql(true)
        })
        test('should return true on valid value and minValue/maxValue', () => {
          expect(isAllowedValue(
            undefined,
            undefined,
            minValue,
            maxValue
          )(valuesObject)).to.be.eql(true)
        })
        test('should return true on valid value and pre- or postPointDigits and minValue', () => {
          expect(isAllowedValue(
            prePointDigits,
            postPointDigits,
            minValue
          )(valuesObject)).to.be.eql(true)
        })
        test('should return false on valid value and pre- or postPointDigits and maxValue', () => {
          expect(isAllowedValue(
            1,
            2,
            undefined,
            100
          )(valuesObject)).to.be.eql(false)
        })
      })
      describe('calculateDecimalScale ', () => {
        test('should return zero on zero input', () => {
          expect(calculateDecimalScale(0)).to.be.eql(0)
          expect(calculateDecimalScale(undefined, 0)).to.be.eql(0)
        })
        test('should set decimalScale', () => {
          expect(calculateDecimalScale(2)).to.be.eql(2)
          expect(calculateDecimalScale(undefined, 3)).to.be.eql(3)
        })
        test('should return undefined with no params', () => {
          expect(calculateDecimalScale()).to.be.undefined
        })
      })
    })
  })
})
