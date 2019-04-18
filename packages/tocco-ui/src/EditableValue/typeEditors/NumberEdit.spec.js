import React from 'react'
import {mountWithIntl} from 'tocco-test-util/src/intlEnzyme/intlEnzyme'

import NumberEdit,
{
  allowedValuesWithoutPropOptions,
  calculateMaxValue,
  limitValue,
  isAllowedIntegerValue
} from './NumberEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('NumberEdit ', () => {
        const options = {prePointDigits: 10, postPointDigits: 2}
        test('should render NumberEdit', () => {
          const wrapper = mountWithIntl(
            <NumberEdit value={1234567.89} options={options} onChange={EMPTY_FUNC} />
          )
          expect(wrapper.find('input')).to.have.length(1)
        })

        test('should return number string in en', () => {
          const result = '1,234,567.89'
          const wrapper = mountWithIntl(
            <NumberEdit value={1234567.89} options={options} onChange={EMPTY_FUNC} />
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
          expect(limitValue(maxValue)(valuesObject)).to.eql(false)
        })
        test('should return true on small enough input', () => {
          const maxValue = 12345678912344.56
          const valuesObject = {
            formattedValue: '1234567891234.56',
            floatValue: 1234567891234.56
          }
          expect(limitValue(maxValue)(valuesObject)).to.eql(true)
        })
      })
      describe('calculateMaxValue', () => {
        test('should return maxValue', () => {
          const prePointDigits = 5
          const postPointDigits = 3
          const result = 99999.999
          expect(calculateMaxValue(prePointDigits, postPointDigits)).to.eql(result)
        })
      })
      describe('isAllowedIntegerValue', () => {
        test('should return false on too large input', () => {
          const allowedIntegerObject = {minValue: 5, maxValue: 100}
          const valuesObject = {
            formattedValue: '123',
            floatValue: 123
          }
          expect(isAllowedIntegerValue(allowedIntegerObject)(valuesObject)).to.eql(false)
        })
        test('should return true on small enough input', () => {
          const allowedIntegerObject = {minValue: 2, maxValue: 10000}
          const valuesObject = {
            formattedValue: '1234',
            floatValue: 1234
          }
          expect(isAllowedIntegerValue(allowedIntegerObject)(valuesObject)).to.eql(true)
        })
      })

      describe('allowedValuesWithoutPropOptions', () => {
        test('should return true empty string', () => {
          const values = {formattedValue: '', floatValue: undefined}
          expect(allowedValuesWithoutPropOptions(values)).to.eql(true)
        })

        test('should return false too large value', () => {
          const values = {formattedValue: '1E22', floatValue: 1E22}
          expect(allowedValuesWithoutPropOptions(values)).to.eql(false)
        })

        test('should return true on valid value', () => {
          const values = {formattedValue: '100', floatValue: 100}
          expect(allowedValuesWithoutPropOptions(values)).to.eql(true)
        })
      })
    })
  })
})
