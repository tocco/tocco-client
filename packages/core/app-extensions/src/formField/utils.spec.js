import {mount} from 'enzyme'

import MultipleFieldsSeparator from './MultipleFieldsSeparator'
import {enhanceMultipleFieldsWithSeparators, isMultipleFields} from './utils'

const DummyField = () => <div>Field</div>

describe('app-extensions', () => {
  describe('formField', () => {
    describe('utils', () => {
      describe('isMultipleFields', () => {
        test('should handle multi-value dataTypes as single field', () => {
          const dataType = 'multi-remote-field'
          const value = [{value: '1'}, {value: '2'}]

          const result = isMultipleFields(value, dataType)

          expect(result).to.be.false
        })

        test('should handle multi-value dataTypes with empty value as single field', () => {
          const dataType = 'multi-remote-field'
          const value = []

          const result = isMultipleFields(value, dataType)

          expect(result).to.be.false
        })

        test('should handle empty single values as multiple fields', () => {
          const dataType = 'text'
          const value = []

          const result = isMultipleFields(value, dataType)

          expect(result).to.be.true
        })

        test('should handle multiple single values as multiple fields', () => {
          const dataType = 'text'
          const value = ['V1', 'V2']

          const result = isMultipleFields(value, dataType)

          expect(result).to.be.true
        })
      })

      describe('enhanceMultipleFieldsWithSeparators', () => {
        test('should return array with separator', () => {
          const wrapper = mount(
            <>
              {enhanceMultipleFieldsWithSeparators([
                <DummyField key="1" />,
                <DummyField key="2" />,
                <DummyField key="3" />
              ])}
            </>
          )
          expect(wrapper.find(DummyField)).to.have.length(3)
          expect(wrapper.find(MultipleFieldsSeparator)).to.have.length(2)
        })

        test('should handle empty array as value', () => {
          const wrapper = mount(<>{enhanceMultipleFieldsWithSeparators([])}</>)
          expect(wrapper.find(DummyField)).to.have.length(0)
          expect(wrapper.find(MultipleFieldsSeparator)).to.have.length(0)
        })

        test('should not return separator with only one value', () => {
          const wrapper = mount(<>{enhanceMultipleFieldsWithSeparators([<DummyField key="1" />])}</>)
          expect(wrapper.find(DummyField)).to.have.length(1)
          expect(wrapper.find(MultipleFieldsSeparator)).to.have.length(0)
        })
      })
    })
  })
})
