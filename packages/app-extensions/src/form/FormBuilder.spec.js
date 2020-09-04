import React from 'react'
import {shallow} from 'enzyme'
import {Layout} from 'tocco-ui'
import {Field} from 'redux-form'

import FormBuilder from './FormBuilder'

const testData = {
  entity: {
    key: '1',
    paths: {
      firstname: {
        type: 'field',
        value: {
          value: 'First Name',
          type: 'string',
          readable: true,
          writable: true
        }
      },
      lastname: {
        type: 'field',
        value: {
          value: 'Last Name',
          type: 'string',
          readable: true,
          writable: true
        }
      }
    }
  },
  model: {
    paths: {
      fistname: {
        fieldName: 'firstname',
        type: 'string'
      },
      lastname: {
        fieldName: 'lastname',
        type: 'string'
      }
    }
  },
  formName: 'detail',
  formValues: {
    firstname: 'Fist Name',
    lastname: 'Last Name'
  },
  formDefinition: {
    id: 'UserSearch_detail',
    readonly: false,
    children: [
      {
        id: 'box1',
        componentType: 'layout',
        layoutType: 'vertical-box',
        readonly: true,
        children: [
          {
            id: 'box1',
            componentType: 'layout',
            layoutType: 'horizontal-box',
            displayType: 'READONLY',
            children: [
              {
                id: 'user_information',
                componentType: 'layout',
                layoutType: 'vertical-box',
                readonly: true,
                children: [
                  {
                    id: 'firstname',
                    componentType: 'field-set',
                    label: 'Vorname',
                    scopes: ['create'],
                    hidden: false,
                    readonly: true,
                    children: [
                      {
                        id: 'firstname-field', // does not match path by intention (-> should use path to get data)
                        componentType: 'field',
                        path: 'firstname',
                        dataType: 'string',
                        label: null
                      }
                    ]
                  },
                  {
                    id: 'lastname',
                    componentType: 'field-set',
                    label: 'Nachname',
                    hidden: false,
                    readonly: true,
                    children: [
                      {
                        id: 'lastname',
                        componentType: 'field',
                        path: 'lastname',
                        dataType: 'string',
                        label: null
                      }
                    ]
                  }
                ]
              },
              {
                id: 'readonly-box',
                componentType: 'layout',
                layoutType: 'vertical-box',
                readonly: true,
                children: [
                  {
                    id: 'not-readonly-field-set',
                    componentType: 'field-set',
                    label: 'Not Readonly',
                    hidden: false,
                    readonly: false,
                    children: [
                      {
                        id: 'not-readonly-field',
                        componentType: 'field',
                        path: 'not-readonly-field',
                        dataType: 'string',
                        label: null
                      }
                    ]
                  }
                ]
              }
            ],
            label: null
          }
        ]
      }]
  }
}

describe('app-extensions', () => {
  describe('form', () => {
    describe('formBuilder', () => {
      test('should render layout boxes and Fields', () => {
        const {entity, model, formName, formDefinition, formValues} = testData
        const props = {entity, model, formName, formDefinition, formValues, formFieldMapping: {}}
        const wrapper = shallow(<FormBuilder {...props}/>)
        expect(wrapper.find(Layout.Box)).to.have.length(3)
        expect(wrapper.find(Field)).to.have.length(3)
      })

      test('should not render field if beforeRenderField returns false', () => {
        const {entity, model, formName, formDefinition, formValues} = testData

        const beforeRenderField = name => name !== 'lastname'

        const props = {entity, model, formName, formDefinition, formValues, beforeRenderField, formFieldMapping: {}}
        const wrapper = shallow(<FormBuilder {...props}/>)
        expect(wrapper.find(Layout.Box)).to.have.length(3)
        expect(wrapper.find(Field)).to.have.length(2)
      })

      test('should not render none readable fields', () => {
        const {entity, model, formName, formDefinition, formValues} = testData

        entity.paths.lastname = {
          type: 'field',
          value: {
            value: 'Last Name',
            type: 'string',
            readable: false,
            writable: true
          }
        }

        const props = {entity, model, formName, formDefinition, formValues, formFieldMapping: {}}
        const wrapper = shallow(<FormBuilder {...props}/>)

        expect(wrapper.find(Field)).to.have.length(2)
      })

      test(
        'should not require an entity (should not check readable flag in this case)',
        () => {
          const {model, formName, formDefinition, formValues} = testData
          const entity = null
          const props = {entity, model, formName, formDefinition, formValues, formFieldMapping: {}}
          const wrapper = shallow(<FormBuilder {...props}/>)
          expect(wrapper.find(Field)).to.have.length(3)
        }
      )

      test('should not render empty values in readonly form', () => {
        const {entity, model, formName, formDefinition} = testData
        const formDefinitionReadOnly = {...formDefinition, readonly: true}
        const formValues = {lastname: undefined}
        const props = {entity, model, formName, formValues, formFieldMapping: {}}
        const wrapper = shallow(<FormBuilder {...props} formDefinition={formDefinitionReadOnly}/>)
        expect(wrapper.find(Field)).to.have.length(0)
      })

      test('should render fields with matching scope', () => {
        const {model, formName, formDefinition, formValues} = testData
        const entity = null
        const props = {entity, model, formName, formDefinition, formValues, mode: 'create', formFieldMapping: {}}
        const wrapper = shallow(<FormBuilder {...props}/>)
        expect(wrapper.find(Field)).to.have.length(3)
      })

      test('should NOT render fields with unmatching scope', () => {
        const {model, formName, formDefinition, formValues} = testData
        const entity = null
        const props = {entity, model, formName, formDefinition, formValues, mode: 'update', formFieldMapping: {}}
        const wrapper = shallow(<FormBuilder {...props}/>)
        expect(wrapper.find(Field)).to.have.length(2)
      })

      test('should render children of readonly layouts to readonly', () => {
        const {model, formName, formDefinition, formValues} = testData
        const entity = null
        const props = {entity, model, formName, formDefinition, formValues, mode: 'update', formFieldMapping: {}}
        const wrapper = shallow(<FormBuilder {...props}/>)
        const field = wrapper.findWhere(e => e.props().id === 'input-detail-not-readonly-field')
        expect(field).to.have.length(1)
        expect(field.props().parentReadOnly).to.be.true
      })

      test('should read multi paths entity fields', () => {
        const entity = {
          paths: {
            relOrder: {
              type: 'entity',
              writable: false,
              value: {
                _links: null,
                key: '12556',
                model: 'Order',
                version: 4,
                paths: {
                  relOrder_debitor_status: {
                    type: 'entity',
                    writable: false,
                    value: {
                      _links: null,
                      key: '2',
                      model: 'Order_debitor_status',
                      version: 2,
                      paths: {}
                    }
                  }
                }
              }
            }
          }
        }

        const formDefinition = {
          id: 'UserSearch_detail',
          readonly: false,
          children: [
            {
              id: 'user_information',
              componentType: 'layout',
              layoutType: 'vertical-box',
              readonly: true,
              children: [
                {
                  id: 'Order_debitor_status',
                  componentType: 'field-set',
                  label: 'Status',
                  hidden: false,
                  readonly: true,
                  children: [
                    {
                      id: 'Order_debitor_status', // does not match path by intention (-> should use path to get data)
                      componentType: 'field',
                      path: 'relOrder.relOrder_debitor_status',
                      dataType: 'string',
                      label: null
                    }
                  ]
                }
              ]
            }
          ]
        }

        const {model, formName, formValues} = testData
        const props = {entity, model, formName, formDefinition, formValues, mode: 'update', formFieldMapping: {}}
        const wrapper = shallow(<FormBuilder {...props}/>)

        expect(wrapper.find(Field).first().props().entityField).to.equal(
          entity.paths.relOrder.value.paths.relOrder_debitor_status
        )
      })
    })
  })
})
