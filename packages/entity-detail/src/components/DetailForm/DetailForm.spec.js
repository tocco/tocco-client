import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {Field} from 'redux-form'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import DetailForm from './DetailForm'

import {IntlStub, intlEnzyme} from 'tocco-test-util'

const EMPTY_FUNC = () => {
}

describe('entity-detail', () => {
  describe('components', () => {
    describe('DetailForm', () => {
      it('should display the right amount of Fields according to form definition', () => {
        const formDefinition = {
          'name': 'UserSearch_detail',
          'type': 'ch.tocco.nice2.model.form.components.Form',
          'displayType': 'EDITABLE',
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

        const store = createStore(() => {
        })

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <MemoryRouter>
              <DetailForm
                submitting={false}
                submitForm={EMPTY_FUNC}
                formDefinition={formDefinition}
                entity={entity}
                entityModel={{}}
                logError={EMPTY_FUNC}
                loadRelationEntity={EMPTY_FUNC}
                loadRemoteEntity={EMPTY_FUNC}
                remoteEntities={{}}
                loadRelationEntities={EMPTY_FUNC}
                relationEntities={{}}
                form="detailForm"
                intl={IntlStub}
                touch={EMPTY_FUNC}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find('form')).to.have.length(1)
        expect(wrapper.find(Field)).to.have.length(2)
      })
    })
  })
})
