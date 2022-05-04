import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {intlEnzyme} from 'tocco-test-util'
import {EditableValue, FormattedValue, StatedValue} from 'tocco-ui'

import FormField from './FormField'
import MultipleFieldsSeparator from './MultipleFieldsSeparator'

describe('app-extensions', () => {
  describe('formField', () => {
    describe('FormField', () => {
      const getStore = () =>
        createStore(() => ({
          formData: {
            relationEntities: {data: {}},
            tooltips: {data: {}}
          },
          form: {
            detailForm: {}
          }
        }))

      test('should return a StatedValue with correct EditableValue', () => {
        const formDefinitionField = {
          name: 'firstname',
          dataType: 'string',
          readonly: false,
          children: [],
          label: 'Vorname'
        }
        const formFieldData = {
          formDefinitionField
        }

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={getStore()}>
            <FormField fieldMappingType="editable" data={formFieldData} />
          </Provider>
        )

        expect(wrapper.find(StatedValue)).to.have.length(1)
        expect(wrapper.find(EditableValue)).to.have.length(1)
      })

      test('should return array with separator', () => {
        const formDefinitionField = {
          name: 'firstname',
          dataType: 'string',
          readonly: false,
          children: [],
          label: 'Vorname'
        }
        const formFieldData = {
          formDefinitionField,
          value: [
            {value: 'V1', type: 'string'},
            {value: 'V1', type: 'string'}
          ]
        }

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={getStore()}>
            <FormField fieldMappingType="editable" data={formFieldData} />
          </Provider>
        )
        expect(wrapper.find(FormattedValue)).to.have.length(2)
        expect(wrapper.find(MultipleFieldsSeparator)).to.have.length(1)
      })

      test('should handle empty array as value', () => {
        const formDefinitionField = {
          name: 'firstname',
          dataType: 'string',
          readonly: false,
          children: [],
          label: 'Vorname'
        }
        const formFieldData = {
          formDefinitionField,
          value: []
        }

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={getStore()}>
            <FormField fieldMappingType="editable" data={formFieldData} />
          </Provider>
        )

        expect(wrapper.find(FormattedValue)).to.have.length(0)
        expect(wrapper.find(MultipleFieldsSeparator)).to.have.length(0)
      })

      test('should not return separator with only one value', () => {
        const formDefinitionField = {
          name: 'firstname',
          dataType: 'string',
          readonly: false,
          children: [],
          label: 'Vorname'
        }
        const formFieldData = {
          formDefinitionField,
          value: [{value: 'V1', type: 'string'}]
        }

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={getStore()}>
            <FormField fieldMappingType="editable" data={formFieldData} />
          </Provider>
        )

        expect(wrapper.find(FormattedValue)).to.have.length(1)
        expect(wrapper.find(MultipleFieldsSeparator)).to.have.length(0)
      })
    })
  })
})
