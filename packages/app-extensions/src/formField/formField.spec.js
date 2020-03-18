import {EditableValue, StatedValue} from 'tocco-ui'
import {intlEnzyme} from 'tocco-test-util'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import React from 'react'

import editableValueFactory from './editableValueFactory'
import {formFieldFactory} from './formField'

describe('app-extensions', () => {
  describe('formField', () => {
    describe('fieldFactory', () => {
      test('should return a StatedValue with correct EditableValue', () => {
        const mapping = {string: editableValueFactory('string')}

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
        const formField = formFieldFactory(mapping, mapping, formFieldData)

        const store = createStore(() => ({
          formData: {
            relationEntities: {data: {}},
            tooltips: {data: {}}
          },
          form: {
            detailForm: {}
          }
        }))

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            {formField}
          </Provider>
        )

        expect(wrapper.find(StatedValue)).to.have.length(1)
        expect(wrapper.find(EditableValue)).to.have.length(1)
      })
    })
  })
})
