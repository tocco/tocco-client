import React from 'react'
import {mountWithIntl} from 'tocco-test-util/src/intlEnzyme/intlEnzyme'

import NumberEdit, {calculateMaxValue, isAllowedValue} from './NumberEdit'

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

        test('should add suffix and prefix', () => {
          const result = 'pre0post'
          const wrapper = mountWithIntl(
            <NumberEdit
              value={0}
              options={{
                prePointDigits: 1,
                postPointDigits: 0,
                prefix: 'pre',
                suffix: 'post'
              }}
              onChange={EMPTY_FUNC} />
          )
          expect(wrapper.html()).to.contains(result)
        })

        test('fill in postPointDigit zeros on fixedDecimalScale', () => {
          const result = '1,234,567.800'
          const wrapper = mountWithIntl(
            <NumberEdit
              value={1234567.8}
              options={{
                prePointDigits: 30,
                postPointDigits: 3,
                fixedDecimalScale: true
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
        const minValue = 1
        const maxValue = 1000
        const valuesObject = {
          formattedValue: '123',
          floatValue: 123
        }
        test('should return true on no arguments called', () => {
          expect(isAllowedValue()(valuesObject)).to.be.eql(true)
        })
        test('should return true on valid value and only minValue', () => {
          expect(isAllowedValue(minValue)(valuesObject)).to.be.eql(true)
        })
        test('should return true on valid value and minValue/maxValue', () => {
          expect(isAllowedValue(
            minValue,
            maxValue
          )(valuesObject)).to.be.eql(true)
        })
        test('should return true on valid value and minValue', () => {
          expect(isAllowedValue(
            minValue
          )(valuesObject)).to.be.eql(true)
        })
        test('should return false on invalid value because of maxValue', () => {
          expect(isAllowedValue(
            undefined,
            100
          )(valuesObject)).to.be.eql(false)
        })
        test('should return true on too short invalid value', () => {
          expect(isAllowedValue(
            1234,
            5000
          )(valuesObject)).to.be.eql(true)
        })
        test('should return false on negative number with minValue 0', () => {
          expect(isAllowedValue(
            0
          )({
            formattedValue: '-1',
            floatValue: -1
          })).to.be.eql(false)
        })
        test('should return false on positive number with maxValue 0', () => {
          expect(isAllowedValue(
            undefined,
            0
          )({
            formattedValue: '1',
            floatValue: 1
          })).to.be.eql(false)
        })

        const zeroObject = {
          formattedValue: '0',
          floatValue: 0
        }
        test('should return false on 0 with minValue', () => {
          expect(isAllowedValue(
            1
          )(zeroObject)).to.be.eql(false)
        })
        test('should return false on 0 with maxValue', () => {
          expect(isAllowedValue(
            undefined,
            -1
          )(zeroObject)).to.be.eql(false)
        })
        test('should return true on 0 when in range', () => {
          expect(isAllowedValue(
            -10,
            10
          )(zeroObject)).to.be.eql(true)
        })

        const nullObject = {
          formattedValue: null,
          floatValue: null
        }
        test('should return true on null', () => {
          expect(isAllowedValue()(nullObject)).to.be.eql(true)
        })
        test('should return true on null with minValue and maxValue', () => {
          expect(isAllowedValue(
            minValue,
            maxValue
          )(nullObject)).to.be.eql(true)
        })

        const undefinedObject = {
        }
        test('should return true on undefined', () => {
          expect(isAllowedValue()(undefinedObject)).to.be.eql(true)
        })
        test('should return true on undefined with minValue and maxValue', () => {
          expect(isAllowedValue(
            minValue,
            maxValue
          )(undefinedObject)).to.be.eql(true)
        })
      })
    })
  })
})
