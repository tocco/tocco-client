import fieldFactory from './fieldFactory'
import {shallow} from 'enzyme'

describe('entity-browser', () => {
  describe('components', () => {
    describe('FormField', () => {
      describe('fieldFactory', () => {
        it('should return a component with a valid type', () => {
          const formField = {
            type: 'ch.tocco.nice2.model.form.components.simple.TextField'
          }
          const field = fieldFactory(formField, {}, {}, {}, {})
          const wrapper = shallow(field)
          expect(wrapper).to.not.be.blank()
        })

        it('should return a component with a valid type', () => {
          const field = fieldFactory({}, {}, {}, {}, {})
          const wrapper = shallow(field)
          expect(wrapper).to.be.blank()
        })

        it('should return a component for RangeField depending on entity field type', () => {
          const formField = {
            type: 'ch.tocco.nice2.model.form.components.simple.RangeField'
          }

          const dateField = {type: 'date'}
          const rangeField = fieldFactory(formField, dateField, {}, {}, {})
          const rangeFieldWrapper = shallow(rangeField)
          expect(rangeFieldWrapper).to.not.be.blank()

          const unsupportedField = {type: 'unsupported_type'}
          const unsupportedRangeField = fieldFactory(formField, unsupportedField, {}, {}, {})
          const unsupportedFieldWrapper = shallow(unsupportedRangeField)
          expect(unsupportedFieldWrapper).to.be.blank()
        })
      })
    })
  })
})
