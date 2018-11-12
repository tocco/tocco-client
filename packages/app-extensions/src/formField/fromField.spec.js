import {mount} from 'enzyme'
import {FormField, EditableValue} from 'tocco-ui'
import {intlEnzyme} from 'tocco-test-util'

import editableValueFactory from './editableValueFactory'
import {formFieldFactory} from './formField'

describe('app-extensions', () => {
  describe('formField', () => {
    describe('fieldFactory', () => {
      test('should return a FormField with correct edit Field', () => {
        const mapping = {'string': editableValueFactory('string')}

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
        const formField = formFieldFactory(mapping, formFieldData)

        const wrapper = mount(formField)

        expect(wrapper.find(FormField)).to.have.length(1)
        expect(wrapper.find(EditableValue)).to.have.length(1)
      })

      test('should return a FormField with correct edit Field', () => {
        const mapping = {
          'range': {
            'date': editableValueFactory('date-range'),
            'birthdate': editableValueFactory('date-range')
          }}

        const formDefinitionField = {
          name: 'range',
          dataType: 'range',
          children: [],
          label: 'range'
        }

        const modelField = {
          type: 'date'
        }
        const formFieldData = {
          formDefinitionField,
          modelField
        }
        const formField = formFieldFactory(mapping, formFieldData)

        const wrapper = intlEnzyme.mountWithIntl(formField)

        expect(wrapper.find(FormField)).to.have.length(1)
        expect(wrapper.find(EditableValue)).to.have.length(1)
      })
    })
  })
})
