import {FormattedValue} from 'tocco-ui'
import {mount} from 'enzyme'

import formattedValueFactory from './formattedValueFactory'

describe('app-extensions', () => {
  describe('fomField', () => {
    describe('formattedValueFactory', () => {
      test('should return simple formattedValue', () => {
        const factory = formattedValueFactory('string')

        const value = 'test'
        const props = {
          value
        }

        const editableValue = factory({}, {}, 'formName', props, {}, {})

        const wrapper = mount(editableValue)

        expect(wrapper.find(FormattedValue)).to.have.length(1)
        expect(wrapper.find(FormattedValue)).to.have.prop('value', value)
      })
    })
  })
})
