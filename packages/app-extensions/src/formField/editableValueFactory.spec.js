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

      test('should return coordinate value', () => {
        const factory = editableValueFactory('coordinate')
        const data = {value: {value: 0.8285692490653721}}
        const editableValue = factory({}, {}, 'formName', data, {}, {})

        const wrapper = mount(editableValue)

        const value = wrapper.prop('value')
        expect(value).to.eql(data.value)
      })

      describe('location', () => {
        test('should return location suggestions', () => {
          const factory = editableValueFactory('location')
          const suggestions = [
            {city: 'Zurich', plz: '8006', canton: 'ZH', district: 'Zurich', country: {display: 'CH', key: 'CH'}},
            {city: 'Bern', plz: '3000', district: 'Bern', country: {display: 'CH', key: 'CH'}}
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

      describe('valueOverwriter', () => {
        const formField = {
          locationMapping: {
            canton: 'canton_c',
            city: 'city_c',
            country: 'relCountry_c',
            district: 'district_c',
            street: 'address_c',
            zip: 'zip_c'
          }
        }

        const formName = 'detailForm'

        const props = {
          onChange: locationObject => {
            for (const key in formField.locationMapping) {
              utils.changeFieldValue(formName, formField.locationMapping[key], locationObject[key])
            }
          }
        }

        const utils = {
          changeFieldValue: sinon.spy(),
          formState: {
            values: {
              zip_c: '2306',
              address_c: 'Bahnhofstrasse 1',
              canton_c: 'ZH',
              city_c: 'Zurich',
              district_c: 'Zurich',
              relCountry_c: {display: 'CH', key: 'CH'}
            }
          }
        }

        const locationObject = {
          zip: '2306',
          street: 'Bahnhofstrasse 1',
          canton: 'ZH',
          city: 'Zurich',
          district: 'Zurich',
          country: {display: 'CH', key: 'CH'}
        }

        const factory = editableValueFactory('location')

        test('should call changeFieldValue with first key value pair', () => {
          const editableValue = factory(formField, {}, formName, props, {}, utils)
          const wrapper = mount(editableValue)

          wrapper.props().onChange(locationObject)
          const changeFielCallArgmuents = [ 'detailForm', 'canton_c', 'ZH' ]
          expect(utils.changeFieldValue.firstCall.args).to.eql(changeFielCallArgmuents)
        })

        test('should set location data as props value', () => {
          const editableValue = factory(formField, {}, formName, props, {}, utils)
          const wrapper = mount(editableValue)
          expect(wrapper.props().value).to.eql(locationObject)
        })
      })
    })
  })
})
