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
    'name': 'UserSearch_detail',
    'type': 'ch.tocco.nice2.model.form.components.Form',
    'displayType': 'READONLY',
    'children': [
      {
        'name': 'box1',
        'type': 'ch.tocco.nice2.model.form.components.layout.VerticalBox',
        'displayType': 'READONLY',
        'children': [
          {
            'name': 'box1',
            'type': 'ch.tocco.nice2.model.form.components.layout.HorizontalBox',
            'displayType': 'READONLY',
            'children': [
              {
                'name': 'user_information',
                'type': 'ch.tocco.nice2.model.form.components.layout.VerticalBox',
                'displayType': 'READONLY',
                'children': [
                  {
                    'name': 'firstname',
                    'type': 'ch.tocco.nice2.model.form.components.simple.TextField',
                    'displayType': 'READONLY',
                    'children': [],
                    'label': 'Vorname',
                    'useLabel': 'YES'
                  },
                  {
                    'name': 'lastname',
                    'type': 'ch.tocco.nice2.model.form.components.simple.TextField',
                    'displayType': 'READONLY',
                    'children': [],
                    'label': 'Nachname',
                    'useLabel': 'YES'
                  }
                ]
              }
            ],
            'label': '##forms.UserSearch_detail:de_CH:nice2.optional.usersearch',
            'useLabel': 'YES'
          }
        ]
      }]
  }
}

describe('entity-browser', () => {
  describe('components', () => {
    describe('DetailForm', () => {
      it('should render LayoutBoxes and Fields', () => {
        const {entity, model, formName, formDefinition, formValues, formFieldUtils} = testData

        const formBuilder = createFromBuilder(entity, model, formName, formDefinition, formValues, formFieldUtils)

        const wrapper = shallow(<form>{formBuilder()}</form>)
        expect(wrapper.find(LayoutBox)).to.have.length(3)
        expect(wrapper.find(Field)).to.have.length(2)
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

      it('should not render empty values in readonly form', () => {
        const {entity, model, formName, formDefinition, formFieldUtils} = testData

        const formValues = testData.lastname = ''

        const formBuilder = createFromBuilder(entity, model, formName, formDefinition, formValues, formFieldUtils)

        const wrapper = shallow(<form>{formBuilder()}</form>)

        expect(wrapper.find(Field)).to.have.length(1)
      })
    })
  })
})
