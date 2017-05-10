import formattedValueFactory from './formattedValueFactory'
import {FormattedValue} from 'tocco-ui'
import {mount} from 'enzyme'

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

        expect(wrapper).to.have.type(FormattedValue)
        expect(wrapper).to.have.prop('value', value)
      })

      it('should return a placeholder in case of undefined value', () => {
        const factory = formattedValueFactory('string')

        const value = undefined
        const props = {
          value
        }

        const editableValue = factory({}, {}, props, {}, {})

        const wrapper = mount(editableValue)

        expect(wrapper.text()).to.equal('-')
      })
    })
  })
})
