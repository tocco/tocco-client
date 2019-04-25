import {EditableValue} from 'tocco-ui'
import {intlEnzyme} from 'tocco-test-util'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import React from 'react'

import editableValueFactory from './editableValueFactory'

describe('app-extensions', () => {
  describe('formField', () => {
    describe('editableValueFactory', () => {
      const store = createStore(() => ({
        formData: {
          relationEntities: {
            data: {
              relUser: [{key: 1}, {key: 3}],
              relUser2: [{key: 33}]
            }
          },
          tooltips: {data: {}}

        },
        form: {
          detailForm: {
            values: {
              canton_c: 'ZH',
              city_c: 'Zurich',
              postcode: '8000'
            }
          }
        }
      }))

      test('should return simple editableValue', () => {
        const factory = editableValueFactory('string')

        const formField = {}
        const modelField = {}
        const formName = 'detailForm'
        const value = 'test'
        const info = {mandatory: false, readOnly: false}
        const onChangeSpy = sinon.spy()
        const events = {onChange: onChangeSpy}

        const editableValue = factory(formField, modelField, formName, value, info, events)

        const wrapper = intlEnzyme.mountWithIntl(<Provider store={store}>{editableValue}</Provider>)

        expect(wrapper.find(EditableValue)).to.have.length(1)
        expect(wrapper.find(EditableValue).props()).to.have.property('value', 'test')
      })

      test('should return coordinate value', () => {
        const factory = editableValueFactory('coordinate')

        const formField = {}
        const modelField = {}
        const formName = 'detailForm'
        const inputValue = {value: 0.8285692490653721}
        const info = {mandatory: false, readOnly: false}
        const onChangeSpy = sinon.spy()
        const events = {onChange: onChangeSpy}

        const editableValue = factory(formField, modelField, formName, inputValue, info, events)

        const wrapper = intlEnzyme.mountWithIntl(<Provider store={store}>{editableValue}</Provider>)

        const value = wrapper.find(EditableValue).prop('value')

        expect(value).to.eql(inputValue.value)
      })
    })
  })
})
