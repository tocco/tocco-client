import fetchMock from 'fetch-mock'

import * as formDefinition from './formDefinition'

const testField1 = {
  id: 'firstname-field', // does not match path by intention (-> should use path for getUsedPaths)
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
  defaultValue: 'SomeLastname',
  readonly: true
}

const testField3 = {
  id: 'create_xyz',
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
  readonly: false,
  ignoreCopy: false,
  children: [
    {
      componentType: 'layout',
      layoutType: 'vertical-box',
      id: 'box 1',
      readonly: false,
      children: [
        {
          componentType: 'layout',
          layoutType: 'horizontal-box',
          id: 'box 2',
          readonly: false,
          ignoreCopy: false,
          children: [
            {
              readonly: false,
              ignoreCopy: true,
              children: [testField1]
            },
            {
              readonly: true,
              ignoreCopy: false,
              children: [testField2]
            },
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
          expect(fields).to.eql([
            {
              ...testField1,
              readonly: false,
              ignoreCopy: true
            },
            {
              ...testField2,
              readonly: true,
              ignoreCopy: false
            },
            {
              ...testDisplay,
              readonly: false,
              ignoreCopy: false
            },
            {
              ...testField3,
              readonly: false,
              ignoreCopy: false
            }
          ])
        })

        test('should return an empty array in case of no fields', () => {
          const fields = formDefinition.getFieldDefinitions({
            id: 'fromX',
            children: []
          })
          expect(fields).to.eql([])
        })

        test('should return readonly attribute', () => {
          const fields = formDefinition.getFieldDefinitions({
            id: 'fromX',
            children: []
          })
          expect(fields).to.eql([])
        })
      })

      describe('getUsedPaths', () => {
        test('should return a list of all paths that are used in the form and ignore display-expressions', () => {
          const fields = formDefinition.getFieldDefinitions(testFormDefinition)
          const fieldNames = formDefinition.getUsedPaths(fields)
          expect(fieldNames).to.eql([testField1.path, testField2.path, testField3.path])
        })

        test('should return location mappings in paths', () => {
          const fieldNames = formDefinition.getUsedPaths([{
            dataType: 'location',
            componentType: 'field',
            locationMapping: {
              city: 'city_c',
              country: 'relCountry_c'
            }
          }])
          expect(fieldNames).to.eql(['city_c', 'relCountry_c'])
        })

        test('should return no douplettes in result', () => {
          const fieldNames = formDefinition.getUsedPaths([{
            dataType: 'string',
            componentType: 'field',
            path: 'firstname'
          }, {
            dataType: 'string',
            componentType: 'field',
            path: 'firstname'
          }])
          expect(fieldNames).to.eql(['firstname'])
        })
      })

      describe('getDefaultValues', () => {
        test('should return all default values', () => {
          const fields = formDefinition.getFieldDefinitions(testFormDefinition)
          const fieldNames = formDefinition.getDefaultValues(fields)
          expect(fieldNames).to.eql({
            [testField2.path]: testField2.defaultValue,
            [testField3.path]: testField3.defaultValue
          })
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
