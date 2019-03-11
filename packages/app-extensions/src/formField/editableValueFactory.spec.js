import {EditableValue} from 'tocco-ui'
import {mount} from 'enzyme'

import editableValueFactory from './editableValueFactory'

describe('app-extensions', () => {
  describe('formField', () => {
    describe('editableValueFactory', () => {
      test('should return simple editableValue', () => {
        const factory = editableValueFactory('string')

        const props = {
          value: 'test'
        }

        const events = {
          onClick: () => {
          }
        }

        const editableValue = factory({}, {}, 'formName', props, events, {})

        const wrapper = mount(editableValue)

        expect(wrapper).to.have.type(EditableValue)
        expect(wrapper).to.have.prop('value', 'test')
        expect(wrapper).to.have.prop('events', events)
      })

      test('should format message to hours and minutes label', () => {
        const factory = editableValueFactory('duration')
        const util = {
          intl: {
            formatMessage: v => (v.id)
          }
        }

        const editableValue = factory({}, {}, 'formName', {}, {}, util)

        const wrapper = mount(editableValue)

        const options = wrapper.prop('options')

        expect(wrapper).to.have.type(EditableValue)
        expect(options.hoursLabel).to.eql('client.component.duration.hoursLabel')
        expect(options.minutesLabel).to.eql('client.component.duration.minutesLabel')
      })

      describe('location', () => {
        test('should return location suggestions', () => {
          const factory = editableValueFactory('location')
          const suggestions = [
            {city: 'Zurich', plz: '8006', canton: 'ZH', district: 'Zurich', country: 'CH'},
            {city: 'Bern', plz: '3000', district: 'Bern', country: 'CH'}
          ]
          const util = {
            locations: {
              location_c: {suggestions}
            }
          }
          const formField = {id: 'location_c'}

          const editableValue = factory(formField, {}, 'formName', {}, {}, util)
          const wrapper = mount(editableValue)

          const options = wrapper.prop('options')
          expect(wrapper).to.have.type(EditableValue)
          expect(options.suggestions).to.eql(suggestions)
        })

        test('should return location isLoading', () => {
          const factory = editableValueFactory('location')
          const util = {
            locations: {
              location_c: {isLoading: true}
            }
          }
          const formField = {id: 'location_c'}

          const editableValue = factory(formField, {}, 'formName', {}, {}, util)
          const wrapper = mount(editableValue)

          const options = wrapper.prop('options')
          expect(wrapper).to.have.type(EditableValue)
          expect(options.isLoading).to.eql(true)
        })

        test('should return location fetchSuggestions', () => {
          const factory = editableValueFactory('location')
          const util = {
            loadLocationsSuggestions: (id, searchTerm) => (
              {
                payload: {field: id, searchTerm: searchTerm},
                type: 'type: "formData/LOAD_LOCATION_SUGGESTIONS"'
              }
            )
          }

          const field = {id: 'location_c'}

          const editableValue = factory(field, {}, 'formName', {}, {}, util)
          const wrapper = mount(editableValue)

          const options = wrapper.prop('options')
          expect(wrapper).to.have.type(EditableValue)
          expect(options.fetchSuggestions('123')).to.eql(util.loadLocationsSuggestions(field.id, '123'))
        })
      })
    })
  })
})
