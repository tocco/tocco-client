import createFromBuilder from './formBuilder'
import React from 'react'
import {shallow} from 'enzyme'
import {LayoutBox} from 'tocco-ui'
import {Field} from 'redux-form'

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
    fistname: {
      fieldName: 'firstname',
      type: 'string'
    },
    lastname: {
      fieldName: 'lastname',
      type: 'string'
    }
  },
  formName: 'detail',
  formValues: {
    firstname: 'Fist Name',
    lastname: 'Last Name'
  },

  formFieldUtils: {},
  formDefinition: {
    'id': 'UserSearch_detail',
    'readonly': true,
    'children': [
      {
        'id': 'box1',
        'componentType': 'layout',
        'layoutType': 'vertical-box',
        'readonly': true,
        'children': [
          {
            'id': 'box1',
            'componentType': 'layout',
            'layoutType': 'horizontal-box',
            'displayType': 'READONLY',
            'children': [
              {
                'id': 'user_information',
                'componentType': 'layout',
                'layoutType': 'vertical-box',
                'readonly': true,
                'children': [
                  {
                    'id': 'firstname',
                    'componentType': 'field-set',
                    'label': 'Vorname',
                    'scopes': ['create'],
                    'hidden': false,
                    'readonly': true,
                    'children': [
                      {
                        'id': 'firstname',
                        'componentType': 'field',
                        'dataType': 'string',
                        'label': null
                      }
                    ]
                  },
                  {
                    'id': 'lastname',
                    'componentType': 'field-set',
                    'label': 'Nachname',
                    'hidden': false,
                    'readonly': true,
                    'children': [
                      {
                        'id': 'lastname',
                        'componentType': 'field',
                        'dataType': 'string',
                        'label': null
                      }
                    ]
                  }
                ]
              }
            ],
            'label': null
          }
        ]
      }]
  }
}

describe('tocco-util', () => {
  describe('form', () => {
    describe('formBuilder', () => {
      it('should render LayoutBoxes and Fields', () => {
        const {entity, model, formName, formDefinition, formValues, formFieldUtils} = testData

        const formBuilder = createFromBuilder(entity, model, formName, formDefinition, formValues, formFieldUtils)

        const wrapper = shallow(<form>{formBuilder()}</form>)
        expect(wrapper.find(LayoutBox)).to.have.length(3)
        expect(wrapper.find(Field)).to.have.length(2)
      })

      it('should not render field if beforeRenderField returns false', () => {
        const {entity, model, formName, formDefinition, formValues, formFieldUtils} = testData

        const beforeRenderField = name => name !== 'lastname'

        const formBuilder = createFromBuilder(
          entity, model, formName, formDefinition, formValues, formFieldUtils, {}, {}, beforeRenderField
        )

        const wrapper = shallow(<form>{formBuilder()}</form>)
        expect(wrapper.find(LayoutBox)).to.have.length(3)
        expect(wrapper.find(Field)).to.have.length(1)
      })

      it('should not render none readable fields', () => {
        const {entity, model, formName, formDefinition, formValues, formFieldUtils} = testData

        entity.paths['lastname'] = {
          type: 'field',
          value: {
            value: 'Last Name',
            type: 'string',
            readable: false,
            writable: true
          }
        }

        const formBuilder = createFromBuilder(entity, model, formName, formDefinition, formValues, formFieldUtils)

        const wrapper = shallow(<form>{formBuilder()}</form>)

        expect(wrapper.find(Field)).to.have.length(1)
      })

      it('should not require an entity (should not check readable flag in this case)', () => {
        const {model, formName, formDefinition, formValues, formFieldUtils} = testData

        const entity = null

        const formBuilder = createFromBuilder(entity, model, formName, formDefinition, formValues, formFieldUtils)

        const wrapper = shallow(<form>{formBuilder()}</form>)

        expect(wrapper.find(Field)).to.have.length(2)
      })

      it('should not render empty values in readonly form', () => {
        const {entity, model, formName, formDefinition, formFieldUtils} = testData

        const formValues = testData.lastname = ''

        const formBuilder = createFromBuilder(entity, model, formName, formDefinition, formValues, formFieldUtils)

        const wrapper = shallow(<form>{formBuilder()}</form>)

        expect(wrapper.find(Field)).to.have.length(1)
      })

      it('should render fields with matching scope', () => {
        const {model, formName, formDefinition, formFieldUtils, formValues} = testData
        const entity = null

        const formBuilder = createFromBuilder(
          entity, model, formName, formDefinition, formValues, formFieldUtils, undefined, undefined, undefined, 'create'
        )

        const wrapper = shallow(<form>{formBuilder()}</form>)

        expect(wrapper.find(Field)).to.have.length(2)
      })

      it('should NOT render fields with unmatching scope', () => {
        const {model, formName, formDefinition, formFieldUtils, formValues} = testData
        const entity = null
        const formBuilder = createFromBuilder(
          entity, model, formName, formDefinition, formValues, formFieldUtils, undefined, undefined, undefined, 'update'
        )

        const wrapper = shallow(<form>{formBuilder()}</form>)

        expect(wrapper.find(Field)).to.have.length(1)
      })
    })
  })
})
