import fetchMock from 'fetch-mock'

import * as formDefinition from './formDefinition'
import rest from '../rest'

import {call} from 'redux-saga/effects'

const testField1 = {
  id: 'firstname-field', // does not match path by intention (-> should use path for getFieldNames)
  componentType: 'field',
  path: 'firstname',
  dataType: 'string',
  defaultValue: undefined
}
const testField2 = {
  id: 'lastname',
  componentType: 'field',
  path: 'lastname',
  dataType: 'string',
  defaultValue: 'SomeLastname'
}

const testField3 = {
  id: 'xyz',
  componentType: 'field',
  path: 'xyz',
  dataType: 'something',
  defaultValue: {key: '9', display: 'Display'}
}

const testDisplay = {
  id: 'displayxy',
  componentType: 'display'
}

const testFormDefinition = {
  id: 'fromX',
  children: [
    {
      componentType: 'layout',
      layoutType: 'vertical-box',
      id: 'box 1',
      children: [
        {
          componentType: 'layout',
          layoutType: 'horizontal-box',
          id: 'box 2',
          children: [
            testField1,
            testField2,
            testDisplay,
            {
              name: 'relAffiliation',
              component: 'sub-table'
            }
          ]
        }
      ]
    },
    testField3
  ]
}

describe('app-extensions', () => {
  describe('form', () => {
    describe('formDefinition', () => {
      beforeEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      describe('getFieldDefinitions', () => {
        test('should return an array of fields', () => {
          const fields = formDefinition.getFieldDefinitions(testFormDefinition)
          expect(fields).to.eql([testField1, testField2, testDisplay, testField3])
        })

        test('should return an empty array in case of no fields', () => {
          const fields = formDefinition.getFieldDefinitions({id: 'fromX', children: []})
          expect(fields).to.eql([])
        })
      })

      describe('getFieldNames', () => {
        test('should return a list of all field names', () => {
          const fields = formDefinition.getFieldDefinitions(testFormDefinition)
          const fieldNames = formDefinition.getFieldNames(fields)
          expect(fieldNames).to.eql([testField1.path, testField2.path, testDisplay.id, testField3.path])
        })
      })

      describe('getDefaultValues', () => {
        test('should return all default values', () => {
          const fields = formDefinition.getFieldDefinitions(testFormDefinition)
          const fieldNames = formDefinition.getDefaultValues(fields)
          expect(fieldNames).to.eql({
            [testField2.id]: testField2.defaultValue,
            [testField3.id]: testField3.defaultValue
          })
        })
      })

      describe('fetchForm', () => {
        test('should call request saga and transform response', () => {
          const gen = formDefinition.fetchForm('User_search')

          expect(gen.next().value).to.eql(call(rest.requestSaga, 'forms/User_search'))

          const resp = {
            body: {
              form: {
                children: [{
                  name: 'firstname',
                  type: 'ch.tocco.nice2.model.form.components.simple.TextArea'
                }]
              }
            }
          }

          expect(gen.next(resp).value).to.eql(call(formDefinition.defaultFormTransformer, resp.body))

          const next = gen.next(resp.body.form)

          expect(next.value).to.eql(resp.body.form)
          expect(next.done).to.be.true
        })
      })

      describe('defaultFormTransformer', () => {
        test('should return form without table overhead', () => {
          const form = {
            id: 'fromX',
            children: [
              {}
            ]
          }
          const result = formDefinition.defaultFormTransformer({form})
          expect(result).to.eql(form)
        })
      })

      describe('getFieldId', () => {
        test('should return a string containing formName and fieldName', () => {
          const formName = 'User_detail'
          const fieldName = 'firstname'
          const result = formDefinition.getFieldId(formName, fieldName)
          expect(result).to.have.string(formName)
          expect(result).to.have.string(fieldName)
        })
      })
    })
  })
})
