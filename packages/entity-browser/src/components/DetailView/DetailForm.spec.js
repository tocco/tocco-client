import React from 'react'
import {DetailForm} from './DetailForm'
import {shallow} from 'enzyme'
import {Field} from 'redux-form'

const EMPTY_FUNC = () => {
}

describe('entity-browser', () => {
  describe('components', () => {
    describe('DetailForm', () => {
      it('should display the right amount of Fields according to form definition', () => {
        const formDefinition = {
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

        const entity = {
          'key': 6,
          'model': 'User',
          'paths': {
            'firstname': {
              'type': 'field',
              'value': {
                'value': 'Firstname 6',
                'type': 'string'
              }
            },
            'lastname': {
              'type': 'field',
              'value': {
                'value': 'Lastname 997',
                'type': 'string'
              }
            }
          }
        }

        const wrapper = shallow(
          <DetailForm
            submitting={false}
            submitForm={EMPTY_FUNC}
            formDefinition={formDefinition}
            entity={entity}
            stores={{}}
            entityModel={{}}
          />)

        expect(wrapper.find('form')).to.have.length(1)
        expect(wrapper.find(Field)).to.have.length(2)
      })
    })
  })
})

