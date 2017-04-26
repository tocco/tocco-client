import {formFieldFactory} from './formField'
import editableValueFactory from './editableValueFactory'
import {mount} from 'enzyme'
import {FormField, EditableValue} from 'tocco-ui'

import {intlEnzyme} from 'tocco-test-util'

describe('tocco-util', () => {
  describe('formField', () => {
    describe('fieldFactory', () => {
      it('should return a FormField with correct edit Field', () => {
        const mapping = {'ch.tocco.nice2.model.form.components.simple.TextField': editableValueFactory('string')}

        const formDefinitionField = {
          name: 'firstname',
          type: 'ch.tocco.nice2.model.form.components.simple.TextField',
          displayType: 'EDITABLE',
          children: [],
          label: 'Vorname',
          useLabel: 'YES'
        }
        const formFieldData = {
          formDefinitionField
        }
        const formField = formFieldFactory(mapping, formFieldData)

        const wrapper = mount(formField)

        expect(wrapper.find(FormField)).to.have.length(1)
        expect(wrapper.find(EditableValue)).to.have.length(1)
      })

      it('should return a FormField with correct edit Field', () => {
        const mapping = {
          'ch.tocco.nice2.model.form.components.simple.RangeField': {
            'date': editableValueFactory('date-range'),
            'birthdate': editableValueFactory('date-range')
          }}

        const formDefinitionField = {
          name: 'range',
          type: 'ch.tocco.nice2.model.form.components.simple.RangeField',
          displayType: 'EDITABLE',
          children: [],
          label: 'range',
          useLabel: 'YES'
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
