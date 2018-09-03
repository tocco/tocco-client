import {FormattedValue} from 'tocco-ui'
import {mount} from 'enzyme'

import formattedValueFactory from './formattedValueFactory'

describe('tocco-util', () => {
  describe('fomField', () => {
    describe('formattedValueFactory', () => {
      it('should return simple formattedValue', () => {
        const factory = formattedValueFactory('string')

        const value = 'test'
        const props = {
          value
        }

        const editableValue = factory({}, {}, props, {}, {})

        const wrapper = mount(editableValue)

        expect(wrapper.find(FormattedValue)).to.have.length(1)
        expect(wrapper.find(FormattedValue)).to.have.prop('value', value)
      })
    })
  })
})
