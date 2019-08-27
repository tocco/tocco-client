import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {Field} from 'redux-form'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {IntlStub, intlEnzyme} from 'tocco-test-util'

import DetailForm from './DetailForm'

const EMPTY_FUNC = () => {
}

describe('entity-detail', () => {
  describe('components', () => {
    describe('DetailForm', () => {
      test(
        'should display the right amount of fields according to form definition',
        () => {
          const formDefinition = {
            id: 'UserSearch_detail',
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
                    readonly: true,
                    children: [
                      {
                        id: 'user_information',
                        componentType: 'layout',
                        layoutType: 'horizontal-box',
                        displayType: 'READONLY',
                        children: [
                          {
                            id: 'firstname',
                            componentType: 'field-set',
                            label: 'Vorname',
                            scopes: [],
                            hidden: false,
                            children: [
                              {
                                id: 'firstname',
                                componentType: 'field',
                                dataType: 'string',
                                label: null
                              }
                            ]
                          },
                          {
                            id: 'lastname',
                            componentType: 'field-set',
                            label: 'Nachname',
                            scopes: [],
                            hidden: false,
                            children: [
                              {
                                id: 'lastname',
                                componentType: 'field',
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

          const entity = {
            key: 6,
            model: 'User',
            paths: {
              firstname: {
                type: 'field',
                value: {
                  value: 'Firstname 6',
                  type: 'string'
                }
              },
              lastname: {
                type: 'field',
                value: {
                  value: 'Lastname 997',
                  type: 'string'
                }
              }
            }
          }

          const store = createStore(() => ({
            formData: {
              relationEntities: {data: {}},
              tooltips: {data: {}}
            },
            form: {
              detailForm: {values: {}}
            }
          }))

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
                  loadRelationEntities={EMPTY_FUNC}
                  uploadDocument={EMPTY_FUNC}
                  openAdvancedSearch={EMPTY_FUNC}
                  changeFieldValue={EMPTY_FUNC}
                  relationEntities={{}}
                  form="detailForm"
                  intl={IntlStub}
                  touch={EMPTY_FUNC}
                  fireTouched={EMPTY_FUNC}
                  touchAllFields={EMPTY_FUNC}
                />
              </MemoryRouter>
            </Provider>
          )

          expect(wrapper.find('form')).to.have.length(1)
          expect(wrapper.find(Field)).to.have.length(2)
        }
      )
    })
  })
})
