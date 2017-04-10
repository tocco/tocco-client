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
      })
    })
  })
})
